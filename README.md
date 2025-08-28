# Claire & Lucas Wedding Site

A simple, elegant, vintage–spring themed website with RSVP that saves to Google Sheets via Google Apps Script.

## Quick Start
1. Download this folder and open `index.html` in your browser.
2. Update text, photos, and registry links directly in `index.html`.
3. Wire up RSVP to a Google Sheet by following **RSVP → Google Sheets Setup** below.
4. Deploy to the web with Netlify (drag-and-drop) or GitHub Pages.

## RSVP → Google Sheets Setup (Free)
This site uses a tiny Google Apps Script web app to accept RSVP submissions and write them into a Google Sheet.

### Create the Google Sheet
1. In Google Drive, create a new Google Sheet: `Claire & Lucas RSVPs`.
2. In row 1, create headers:
   - `timestamp`, `guestName`, `email`, `phone`, `attendance`, `partySize`, `meal`, `notes`
3. Keep the sheet open.

### Create the Apps Script
1. In the Sheet, click **Extensions → Apps Script**.
2. Delete any code and paste the following in `Code.gs`:

```js
/** RSVP Web App → Writes JSON body to the first sheet */
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];
    const data = JSON.parse(e.postData.contents);

    // Basic validation
    if (!data.guestName || !data.email) {
      return ContentService.createTextOutput('Missing fields').setMimeType(ContentService.MimeType.TEXT);
    }

    sheet.appendRow([
      new Date(),
      data.guestName,
      data.email,
      data.phone || '',
      data.attendance || '',
      data.partySize || '',
      data.meal || '',
      data.notes || ''
    ]);

    const out = ContentService.createTextOutput(JSON.stringify({ ok: true }));
    out.setMimeType(ContentService.MimeType.JSON);
    return out;
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok:false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Deploy → Test deployments** and run a test if prompted.
4. Click **Deploy → Manage deployments → New deployment**.
   - **Deployment type:** Web app
   - **Description:** RSVP endpoint
   - **Execute as:** Me (your account)
   - **Who has access:** Anyone
5. Click **Deploy**, authorize as needed, and copy the **Web app URL**.

### Connect the Form
Open `script.js` and replace:
```js
const SCRIPT_URL = window.RSVP_SCRIPT_URL || 'YOUR_APPS_SCRIPT_WEB_APP_URL';
```
with your copied Web app URL, e.g.:
```js
const SCRIPT_URL = 'https://script.google.com/macros/s/XXXX/exec';
```

> Tip: You can also set it at runtime without editing files by adding this inline script in `index.html` before `script.js`:
```html
<script>window.RSVP_SCRIPT_URL = 'https://script.google.com/macros/s/XXXX/exec';</script>
```

### Test It
Open `index.html`, fill the RSVP, and submit. Check the Google Sheet for a new row.

## Customize
- **Colors & fonts:** Tweak CSS variables in `styles.css`.
- **Photos:** Replace `assets/vintage-florals.svg` with your images and update the `<img>` tag.
- **Sections:** Edit or remove sections in `index.html` as you wish.

## Deploy Options
- **Netlify:** Drag this folder onto the Netlify app, or connect a Git repo.
- **GitHub Pages:** Push to a repo, enable Pages for the `main` branch, and set root to `/`.
- **Your domain:** Point your domain to your host and you’re live.

## Accessibility & Privacy
- Semantic HTML, labeled form inputs, and reduced motion-friendly design.
- Spam protection via a hidden honeypot field.
- No tracking by default. Add analytics only if you want.

— Congrats and best wishes! 💐
