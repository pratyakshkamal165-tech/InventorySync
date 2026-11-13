
function statusOf(qty, level) {
  if (qty === 0) {
    return "Out";
  }
  if (level === undefined || level === null || level === "") {
    return "Not set";
  }
  if (qty <= Number(level)) {
    return "Low";
  }
  return "OK";
}

// Return HTML badge for status
function renderStatusBadge(status) {
  if (status === "Out") {
    return '<span class="badge badge-out">Out</span>';
  }
  if (status === "Low") {
    return '<span class="badge badge-low">Low</span>';
  }
  if (status === "Not set") {
    return '<span class="badge badge-notset">Not set</span>';
  }
  return '<span class="badge badge-ok">OK</span>';
}

// Get all Low and Out items across all stores
function getLowStockAlerts(stores, products, stock, levels) {
  let alerts = [];
  for (let s = 0; s < stores.length; s++) {
    let st = stores[s];
    for (let p = 0; p < products.length; p++) {
      let prod = products[p];
      let qty = (stock[st.id] && stock[st.id][prod.sku] !== undefined) ? stock[st.id][prod.sku] : 0;
      let lvl = levels[st.id] ? levels[st.id][prod.sku] : null;
      let status = statusOf(qty, lvl);

      if (status === "Low" || status === "Out") {
        alerts.push({
          storeId: st.id,
          storeName: st.name,
          sku: prod.sku,
          productName: prod.name,
          qty: qty,
          level: lvl,
          status: status
        });
      }
    }
  }
  return alerts;
}