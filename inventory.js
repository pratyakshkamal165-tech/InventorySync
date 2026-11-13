function addStock(storeId, sku, qty) {
  let stock = getLS("is_stock", {});
  if (!stock[storeId]) {
    stock[storeId] = {};
  }
  stock[storeId][sku] = (stock[storeId][sku] || 0) + qty;
  setLS("is_stock", stock);

  let movements = getLS("is_movements", []);
  movements.unshift({
    id: "M" + (movements.length + 1),
    time: new Date().toISOString(),
    type: "receive",
    storeId: storeId,
    sku: sku,
    delta: qty,
    role: "manager"
  });
  setLS("is_movements", movements);
}

// TODO: Next milestone - All-or-nothing multi-item checkout validation
function checkoutSale() {
  return { ok: false, msg: "Checkout logic is currently in progress." };
}

// TODO: Next milestone - Transfer request & buyer approval flow
function requestTransfer() {
  return { ok: false, msg: "Transfer request logic is under development." };
}