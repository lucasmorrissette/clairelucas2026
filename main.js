const SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

// Tab switching
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(btn => btn.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // RSVP form handling
  const form = document.getElementById('rsvp-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const messageEl = document.getElementById('form-message');
      messageEl.textContent = 'Sending...';

      const data = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        attendance: document.querySelector('input[name="attendance"]:checked').value,
        guests: document.getElementById('guests').value,
        meal: document.getElementById('meal').value,
        song: document.getElementById('song').value,
      };

      try {
        const res = await fetch(SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.result === 'success') {
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
  }
});
