---
name: Local brand assets
description: Preview-proxy behavior affecting external favicon and brand image requests.
---

Use local copies for small brand icons used in the portfolio UI instead of relying on direct cross-origin favicon requests.

**Why:** The Replit preview proxy can block remote favicon responses with a same-origin policy error even when the image URL works in a normal browser.

**How to apply:** Download the approved public brand asset into the app's public assets and reference it through the Vite base URL.