function getLS(key, fallback) {
  try {
    let raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage write failed", e);
  }
}

function getSession() {
  let raw = sessionStorage.getItem("is_session");
  if (raw) {
    return JSON.parse(raw);
  }
  let defaultSession = { role: "manager", storeId: "KOTH" };
  sessionStorage.setItem("is_session", JSON.stringify(defaultSession));
  return defaultSession;
}

function setSession(role, storeId) {
  sessionStorage.setItem("is_session", JSON.stringify({ role: role, storeId: storeId }));
}

async function initStore() {
  if (localStorage.getItem("is_seeded") === "true") {
    return;
  }

  let response = await fetch("sample-data.json");
  let data = await response.json();

  setLS("is_stores", data.stores);
  setLS("is_products", data.products);
  setLS("is_stock", data.stock);
  setLS("is_levels", data.levels);
  setLS("is_transfers", []);

  let movements = [];
  let moveCounter = 1;
  let now = new Date().toISOString();

  for (let s = 0; s < data.stores.length; s++) {
    let storeId = data.stores[s].id;
    for (let p = 0; p < data.products.length; p++) {
      let sku = data.products[p].sku;
      let qty = data.stock[storeId][sku] || 0;
      movements.push({
        id: "M" + String(moveCounter++).padStart(4, "0"),
        time: now,
        type: "opening",
        storeId: storeId,
        sku: sku,
        delta: qty,
        role: "system"
      });
    }
  }

  setLS("is_movements", movements);
  localStorage.setItem("is_seeded", "true");
}

function resetSampleData() {
  localStorage.removeItem("is_seeded");
  localStorage.removeItem("is_stores");
  localStorage.removeItem("is_products");
  localStorage.removeItem("is_stock");
  localStorage.removeItem("is_levels");
  localStorage.removeItem("is_transfers");
  localStorage.removeItem("is_movements");
  location.reload();
}