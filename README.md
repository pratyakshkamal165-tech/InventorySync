InventorySync

A multi-store retail inventory sync and low-stock alert web dashboard built as a 4-week OJT project (Track: PST_PD_042)

Overview

Small retail chains often track stock separately across branches, leading to empty shelves in one store while another store has surplus inventory. InventorySync is a browser-based dashboard designed for Store Managers and Inventory Buyers across three Pune branches (Kothrud, Baner, and Hadapsar) to view live stock levels, prevent overselling at checkout, and manage inter-store stock transfers in under 30 seconds.

Planned Features & User Flows

-> Role & Store Switcher: Per-tab role toggle ("Store Manager" / "Inventory Buyer") and store selector ("Kothrud", "Baner", "Hadapsar") managed via "sessionStorage" so multiple browser tabs can simulate different store counters.
-> Dashboard (S1): KPI summary cards (low-stock items, out-of-stock items, pending transfers, sales today), low-stock alerts, and a full Product × Store stock matrix.
-> Store Stock (S2): Searchable and filterable inventory table showing "OK", "Low", "Out", and "Not set" badges, quick receive/transfer actions, and CSV export.
-> Checkout (S3): Cart-based billing simulation with steppers capped at available stock and all-or-nothing validation so stock never drops below zero.
-> Transfers (S4): Inter-store stock transfer requests created by Store Managers and approved/rejected by the Inventory Buyer.
-> Products & Reorder Levels (S5): Buyer-only view to add new SKUs and configure store-specific reorder thresholds.
-> Activity Log (S6): Chronological ledger of every stock movement ("opening", "sale", "receive", "transfer_out", "transfer_in").
Cross-Tab Sync: Real-time updates across tabs in the same browser using "localStorage" and the "storage" event.