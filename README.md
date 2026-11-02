# InventorySync

A one-month frontend project exploring multi-store inventory visibility and
low-stock alerts for small retail chains.

## Project status

This repository is at an early stage. The first-month work has focused on
understanding the problem, defining the product scope, and planning the demo.
The working application and JavaScript flows are still to be implemented.

## Problem

Small retail chains may track each store's stock separately. A manager who runs
out of a product may not know that another store has extra stock, while the
buyer may place an unnecessary supplier order.

## Proposed solution

InventorySync is a planned browser-based dashboard for store managers and
inventory buyers. The one-month demo is intended to use sample data for three
stores and show stock levels, low-stock alerts, checkout, and transfer requests.

## User discovery

We spoke with 4–5 multi-store owners in Bengaluru, including people connected
with businesses ranging from approximately 6 to 36 stores. These conversations
helped us understand how inventory is handled across stores and what problems
owners face.

Add a short summary of the feedback here. Do not include names or private
business details without permission.

## Planned demo scope

- View sample stock across stores
- Highlight products at or below their reorder level
- Demonstrate a checkout that cannot reduce stock below zero
- Request and approve an inter-store stock transfer
- Show sample data in a responsive browser dashboard

## Planned implementation

- HTML, CSS, Bootstrap 5, and vanilla JavaScript
- Sample inventory data loaded from JSON
- Browser storage for demo persistence
- Cross-tab updates within the same browser

This is a learning prototype. It will not provide real-time sync between
different computers, real user authentication, billing, or supplier ordering.

## How to run

The app is not implemented yet. Once the initial files are added, update this
section with the local run instructions.

## Progress and next steps

- [x] Define the one-month product scope
- [x] Speak with multi-store owners
- [ ] Create the initial HTML and Bootstrap layout
- [ ] Add sample inventory data
- [ ] Implement stock display and low-stock status
- [ ] Implement checkout and transfer flows
- [ ] Capture phone and laptop screenshots
- [ ] Run through the demo checklist
