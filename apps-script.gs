/**
 * PAPAYA WAITLIST — Google Apps Script
 *
 * SETUP INSTRUCTIONS (one time only):
 * 1. Go to https://script.google.com and click "New project"
 * 2. Delete any existing code and paste the entire contents of this file
 * 3. Click "Deploy" → "New deployment"
 * 4. Choose type: "Web app"
 * 5. Set "Execute as": Me
 * 6. Set "Who has access": Anyone
 * 7. Click "Deploy" and copy the Web App URL
 * 8. Open index.html, find the line:
 *      const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
 *    and replace 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' with the URL you copied.
 *
 * Your Google Sheet will be automatically populated with:
 *   Column A: Timestamp
 *   Column B: Email address
 *   Column C: Queue position
 *
 * HOW POSITION IS CALCULATED:
 *   Position = number of rows already in the sheet + 501
 *   So the very first signup gets position 501, second gets 502, etc.
 *   Duplicate emails get their original position back (no new row added).
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (!e || !e.postData || !e.postData.contents) {
      return respond({ error: 'Missing request body' });
    }
    const data = JSON.parse(e.postData.contents);
    const email = (data.email || '').trim().toLowerCase();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return respond({ error: 'Invalid email' });
    }

    // Check for duplicate email — return existing position
    const existing = sheet.getDataRange().getValues();
    for (let i = 0; i < existing.length; i++) {
      if ((existing[i][1] || '').toLowerCase() === email) {
        return respond({ position: existing[i][2] });
      }
    }

    // Assign next position: count only rows with an email — immune to accidental header rows
    const dataRows = existing.filter(function(r) { return r[1] !== ''; }).length;
    const position = dataRows + 501;

    sheet.appendRow([new Date().toISOString(), email, position]);

    return respond({ position: position });

  } catch (err) {
    Logger.log('Error: ' + err.message);
    return respond({ error: 'Server error', message: err.message });
  }
}

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
