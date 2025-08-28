# Claire & Lucas Wedding Website

This is a simple two-page wedding website for **Claire Shroba & Lucas Morrissette**, June 13, 2026 at The Stone House of St. Charles.

## Files
- `index.html` — Main page with wedding details and photo
- `rsvp.html` — RSVP form page
- `styles.css` — Styling (vintage floral inspired)
- `main.js` — JavaScript to send RSVP data to Google Sheets
- `Code.gs` — Google Apps Script for handling RSVP submissions
- `hero.jpg` — (add your photo of Claire & Lucas)
- `floral-top.png` — (optional decorative floral border)

## Setup Instructions

### 1. Google Sheet + Apps Script
1. Create a new Google Sheet in your Google Drive (name it e.g. *Claire & Lucas RSVPs*).
2. Go to **Extensions → Apps Script**.
3. Replace the default code with the contents of `Code.gs`.
4. Save the project (e.g. call it *RSVP Receiver*).
5. Deploy as a Web App:
   - Click **Deploy → New Deployment**.
   - Deployment type: **Web app**.
   - Execute as: **Me**.
   - Who has access: **Anyone**.
   - Click **Deploy** and authorize if prompted.
6. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

### 2. Update Website
1. Open `main.js`.
2. Replace `PASTE_YOUR_WEB_APP_URL_HERE` with your actual Web App URL from step 1.

### 3. Hosting
- Upload the files to a static host like **Netlify**, **Vercel**, or **GitHub Pages**.
- Be sure to include your `hero.jpg` and optional `floral-top.png`.

### 4. Testing
- Open `rsvp.html` in your browser.
- Submit a test RSVP.
- Confirm it appears in the *RSVPs* sheet.

## Optional Enhancements
- Add email confirmations (modify `Code.gs` to use `MailApp.sendEmail`).
- Add a password-protected RSVP page.
- Customize colors in `styles.css`.
- Add extra sections (registry, hotels, travel info).

---

✨ Congratulations Claire & Lucas! ✨
