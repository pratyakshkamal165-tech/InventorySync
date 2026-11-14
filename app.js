// Basic UI navigation and role toggle (Data & localStorage logic in progress)
let roleSelect = document.getElementById("roleSelect");
let storeSelect = document.getElementById("storeSelect");
let msgBox = document.getElementById("msgBox");

function showMessage(text) {
  msgBox.innerHTML = '<div class="alert alert-warning py-2 mb-0">' + text + '</div>';
  setTimeout(function () {
    msgBox.innerHTML = "";
  }, 3000);
}

// Switch between S1 to S6 sections
document.getElementById("screenTabs").addEventListener("click", function (e) {
  let btn = e.target.closest("[data-screen]");
  if (!btn) return;

  let targetScreen = btn.getAttribute("data-screen");
  let sections = document.querySelectorAll(".screen-section");

  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = (sections[i].id === targetScreen) ? "block" : "none";
  }

  let allTabs = document.querySelectorAll("#screenTabs .nav-link");
  for (let i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove("active");
  }
  btn.classList.add("active");
});

// Switch visible tabs based on Role (Manager vs Buyer)
roleSelect.addEventListener("change", function () {
  let isManager = roleSelect.value === "manager";
  document.getElementById("tabCheckout").style.display = isManager ? "block" : "none";
  document.getElementById("tabProducts").style.display = isManager ? "none" : "block";
});

// Update store name labels when store dropdown changes
storeSelect.addEventListener("change", function () {
  let labels = document.querySelectorAll(".active-store-label");
  for (let i = 0; i < labels.length; i++) {
    labels[i].textContent = storeSelect.value;
  }
});

// Show WIP alert on action buttons
let wipButtons = document.querySelectorAll(".wip-btn");
for (let i = 0; i < wipButtons.length; i++) {
  wipButtons[i].addEventListener("click", function () {
    showMessage("This action is part of our next JS milestone (localStorage & stock logic in progress).");
  });
}