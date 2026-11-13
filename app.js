let roleSelect = document.getElementById("roleSelect");
let storeSelect = document.getElementById("storeSelect");
let toastBox = document.getElementById("toastBox");

function showToast(msg, type) {
  toastBox.innerHTML = '<div class="alert alert-' + type + ' py-2 mb-0">' + msg + '</div>';
  setTimeout(function () {
    toastBox.innerHTML = "";
  }, 3000);
}

function getStoreName(id) {
  let stores = getLS("is_stores", []);
  for (let i = 0; i < stores.length; i++) {
    if (stores[i].id === id) return stores[i].name;
  }
  return id;
}

function getProductName(sku) {
  let products = getLS("is_products", []);
  for (let i = 0; i < products.length; i++) {
    if (products[i].sku === sku) return products[i].name;
  }
  return sku;
}

// Switch between S1-S6 screens
function switchScreen(screenId) {
  let sections = document.querySelectorAll(".screen-section");
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = (sections[i].id === screenId) ? "block" : "none";
  }

  let links = document.querySelectorAll("#screenTabs .nav-link");
  for (let i = 0; i < links.length; i++) {
    links[i].classList.toggle("active", links[i].getAttribute("data-screen") === screenId);
  }
  renderBasicViews();
}

// Render Dashboard (S1), Store Stock (S2), and Activity Log (S6)
function renderBasicViews() {
  let session = getSession();
  let stores = getLS("is_stores", []);
  let products = getLS("is_products", []);
  let stock = getLS("is_stock", {});
  let levels = getLS("is_levels", {});
  let movements = getLS("is_movements", []);

  // 1. Dashboard KPIs & Alerts
  let alerts = getLowStockAlerts(stores, products, stock, levels);
  let outCount = 0;
  let lowCount = 0;
  for (let i = 0; i < alerts.length; i++) {
    if (alerts[i].status === "Out") outCount++;
    else lowCount++;
  }

  document.getElementById("kpiLow").textContent = lowCount;
  document.getElementById("kpiOut").textContent = outCount;
  document.getElementById("kpiTransfers").textContent = "0";
  document.getElementById("kpiSales").textContent = "0";

  let alertHtml = '<ul class="list-group">';
  for (let i = 0; i < alerts.length; i++) {
    let a = alerts[i];
    alertHtml += '<li class="list-group-item d-flex justify-content-between">' +
      '<span><b>' + a.productName + '</b> (' + a.storeName + '): ' + a.qty + ' left</span>' +
      renderStatusBadge(a.status) + '</li>';
  }
  alertHtml += '</ul>';
  document.getElementById("alertList").innerHTML = alertHtml;

  // 2. Dashboard Stock Matrix
  let mHtml = "";
  for (let i = 0; i < products.length; i++) {
    let p = products[i];
    mHtml += "<tr><td>" + p.name + "</td>" +
      "<td class='num-col'>" + (stock.KOTH[p.sku] || 0) + "</td>" +
      "<td class='num-col'>" + (stock.BANR[p.sku] || 0) + "</td>" +
      "<td class='num-col'>" + (stock.HADP[p.sku] || 0) + "</td></tr>";
  }
  document.getElementById("matrixBody").innerHTML = mHtml;

  // 3. Store Stock Table (S2)
  document.getElementById("s2StoreName").textContent = getStoreName(session.storeId);
  let s2Html = "";
  for (let i = 0; i < products.length; i++) {
    let p = products[i];
    let qty = (stock[session.storeId] && stock[session.storeId][p.sku]) || 0;
    let lvl = levels[session.storeId] ? levels[session.storeId][p.sku] : null;
    let st = statusOf(qty, lvl);

    s2Html += "<tr><td>" + p.name + "</td><td>" + p.category + "</td>" +
      "<td class='num-col'>" + qty + "</td><td class='num-col'>" + (lvl || "-") + "</td>" +
      "<td>" + renderStatusBadge(st) + "</td><td><small class='text-muted'>WIP</small></td></tr>";
  }
  document.getElementById("s2TableBody").innerHTML = s2Html;

  // 4. Activity Log (S6)
  let logHtml = "";
  for (let i = 0; i < movements.length && i < 15; i++) {
    let m = movements[i];
    logHtml += "<tr><td>" + new Date(m.time).toLocaleTimeString() + "</td>" +
      "<td>" + getStoreName(m.storeId) + "</td><td>" + getProductName(m.sku) + "</td>" +
      "<td>" + m.type + "</td><td class='num-col'>" + m.delta + "</td><td>" + m.role + "</td></tr>";
  }
  document.getElementById("s6LogBody").innerHTML = logHtml;
}

// Basic Event Listeners
document.getElementById("screenTabs").addEventListener("click", function (e) {
  let btn = e.target.closest("[data-screen]");
  if (btn) switchScreen(btn.getAttribute("data-screen"));
});

roleSelect.addEventListener("change", function () {
  setSession(roleSelect.value, storeSelect.value);
  let isManager = roleSelect.value === "manager";
  document.getElementById("tabCheckout").style.display = isManager ? "block" : "none";
  document.getElementById("tabProducts").style.display = isManager ? "none" : "block";
});

storeSelect.addEventListener("change", function () {
  setSession(roleSelect.value, storeSelect.value);
  renderBasicViews();
});

document.getElementById("completeSaleBtn").addEventListener("click", function () {
  let res = checkoutSale();
  showToast(res.msg, "warning");
});

document.getElementById("sendTransferBtn").addEventListener("click", function () {
  let res = requestTransfer();
  showToast(res.msg, "warning");
});

document.getElementById("resetDemoBtn").addEventListener("click", resetSampleData);

// Start App
initStore().then(function () {
  let s = getSession();
  roleSelect.value = s.role;
  storeSelect.value = s.storeId;
  renderBasicViews();
});