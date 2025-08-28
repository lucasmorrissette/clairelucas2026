const SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE";
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvp-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageEl = document.getElementById('form-message');
    messageEl.textContent = 'Sending...';
    const data = {
      fullname: document.getElementById('fullname').value.trim(),
      email: document.getElementById('email').value.trim(),
      attendance: document.querySelector('input[name="attendance"]:checked').value,
      guests: document.getElementById('guests').value,
      meal: document.getElementById('meal').value,
      song: document.getElementById('song').value
    };
    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.result === "success") {
        messageEl.textContent = 'Thank you — your RSVP was received!';
        form.reset();
      } else {
        messageEl.textContent = 'Could not send RSVP. Please email us.';
      }
    } catch (err) {
      console.error(err);
      messageEl.textContent = 'Error sending RSVP. Please email us.';
    }
  });
});