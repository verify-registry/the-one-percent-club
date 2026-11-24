# THE 1% CLUB — Phase D.1 Persistence & Visual Acceptance

- **Audit mode:** Strict read-only QA
- **Audited application checkpoint:** `e06705e0ea6fe83ceab5f1d91022a1efaffc1d4d`
- **Viewport used for persistence tests:** 390×844
- **Browser context:** Disposable Playwright context, reported closed and discarded after testing
- **Source changes:** None reported

## Executive result

Profile and Account Information persistence both passed a full page reload test in a disposable browser context using synthetic test values.

The separate screenshot visual-inspection group was **NOT TESTED**. The QA report confirms that zero of the 30 captured screenshots were opened and visually inspected. Pixel-level visual acceptance therefore remains outstanding.

## A. Profile persistence — PASS

The test used synthetic values:

- Name: `QA SOVEREIGN TESTER`
- Quote: `Precision endures across every reload.`
- Location: `GENEVA QA`

Reported sequence:

1. Opened Edit Profile and entered the synthetic values.
2. Confirmed that `localStorage["profileDraft"]` was populated while editing.
3. Clicked `#saveEditProfileBtn`.
4. Confirmed the success toast and modal closure.
5. Confirmed that the updated profile was written to `localStorage["profile_0001"]`.
6. Confirmed that `profileDraft` was removed after successful save.
7. Reloaded the page in the same disposable browser context.
8. Confirmed that the values remained in `profile_0001` and were reflected in the Membership and Profile UI.

The report notes that `AppState` is not exposed on `window`; restoration was therefore verified through persisted storage and re-hydrated UI rather than direct external access to the state object.

## B. Account Information persistence — PASS

The test used synthetic values:

- Email: `qa.ephemeral.test@example.invalid`
- Phone: `+41 00 000 0099`
- Password field: left blank; no password was tested or stored.

Reported sequence:

1. Opened Account Information and entered synthetic email and phone values.
2. Clicked `#saveAccountInfoBtn`.
3. Confirmed the success toast and modal closure.
4. Confirmed the values were stored in `localStorage["profile_0001"]`.
5. Reloaded the page in the same disposable context.
6. Reopened Account Information and confirmed the email and phone were restored.
7. Confirmed the password input remained empty.

## C. Screenshot visual inspection — NOT TESTED

The Phase D screenshot set contains 30 reported PNGs under:

`/.aistudio/artifacts/brain/9c7f8bcc-e730-4f59-9920-d88104e63043/qa_phase_d/`

The QA environment could not access this path through its workspace-only file viewer. No screenshots were copied into the project, and no image was opened for inspection.

Accordingly:

- Screenshots captured: 30 (reported)
- Screenshots opened and visually inspected: 0
- Pixel-level visual defects: NOT TESTED
- DOM/runtime viewport checks: PASS as recorded in Phase D

The capture of a screenshot is not equivalent to inspecting it. A separate human visual review remains required for final visual sign-off.

## D. Viewport coverage

Runtime/DOM/computed-style coverage was reported for:

- 360×800
- 390×844
- 430×932

Both Obsidian Dark and Imperial Light were tested. No pixel-level screenshot inspection was completed at any viewport.

## E. Source integrity

The Phase D.1 report states that the disposable Playwright context was closed, the temporary runner script was removed, and source files were byte-identical before and after QA.

The following SHA-256 values are reproduced **as reported by the QA run**; they have not been independently recomputed by this documentation commit:

| File | Reported SHA-256 |
|---|---|
| `style.css` | `9f0d6612a39e701e9595a58b9233fc3227f4a6bb6a39c3348985b57c194785cf` |
| `index.html` | `8d12f6378a9c556ffcc56115c20f9197b75faf946561e16f8ff2c1007d48b324` |
| `app.js` | `70b89fa3d9ce04097c5a009010c2acd5b38444dbf8a12e557e2496d877218e6e` |
| `translations.js` | `f03b4a521497ee08aca8bc6f1f5c962b70de3b7ccd6bf710520acb487e9a3c37` |
| `package.json` | `5abc20027d423d4766b8de8661cff9073b540442c25860ddd69253fb078ac422` |
| `bun.lock` | `1232b5a33bc2beeee8c149bcfd2fcad46733c5e8a76f67fff5513404e7078594` |

## Acceptance status

- Profile persistence across reload: **PASS**
- Account Information persistence across reload: **PASS**
- Disposable context cleanup: **PASS (reported)**
- Source immutability during QA: **PASS (reported)**
- Human screenshot inspection: **NOT TESTED**
- Final pixel-level visual sign-off: **PENDING**

This record documents browser-local persistence only. It does not establish cross-device synchronization, server-side persistence, production authentication, or production data security.
