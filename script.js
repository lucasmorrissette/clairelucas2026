// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Countdown to June 13, 2026 in America/Chicago
(function(){
  const el = document.getElementById('countdown');
  if (!el) return;
  const target = new Date('2026-06-13T16:00:00-05:00').getTime();
  function tick(){
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0){ el.textContent = 'It’s wedding day!'; return; }
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff%86400000)/3600000);
    const m = Math.floor((diff%3600000)/60000);
    el.textContent = `${d} days, ${h} hours, ${m} minutes`;
  }
  tick(); setInterval(tick, 60000);
})();

// RSVP form handling
(function(){
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  const attendance = form.querySelector('#attendance');
  const partySizeWrap = document.getElementById('partySizeWrap');

  attendance.addEventListener('change', () => {
    const going = attendance.value === 'Yes';
    partySizeWrap.hidden = !going;
    const partyInput = form.querySelector('#partySize');
    if (going) { partyInput.setAttribute('required',''); }
    else { partyInput.removeAttribute('required'); }
  });

  function setError(id, msg){
    const small = form.querySelector(`.error[data-for="${id}"]`);
    if (small){ small.textContent = msg || ''; }
  }

  function validate(){
    let ok = true;
    // Name
    const name = form.guestName.value.trim();
    if (!name){ ok=false; setError('guestName','Please enter your full name.'); }
    else setError('guestName','');

    // Email
    const email = form.email.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk){ ok=false; setError('email','Please enter a valid email.'); }
    else setError('email','');

    // Attendance
    if (!form.attendance.value){ ok=false; setError('attendance','Please choose one.'); }
    else setError('attendance','');

    // Honeypot
    if (form.website.value){ ok=false; }

    return ok;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('rsvp-status');
    status.textContent = '';

    if (!validate()){ status.textContent = 'Please fix the highlighted fields.'; return; }

    // Build payload
    const data = {
      guestName: form.guestName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      attendance: form.attendance.value,
      partySize: form.partySize?.value || '',
      meal: form.meal.value,
      notes: form.notes.value.trim(),
      timestamp: new Date().toISOString(),
    };

    // Replace this with your Apps Script Web App URL
    const SCRIPT_URL = window.RSVP_SCRIPT_URL || 'YOUR_APPS_SCRIPT_WEB_APP_URL';

    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Network error');
      status.textContent = 'Thanks! Your RSVP was received.';
      status.classList.add('ok');
      form.reset();
      document.getElementById('partySizeWrap').hidden = true;
      // Persist a simple flag in localStorage
      try { localStorage.setItem('claire-lucas-rsvp', JSON.stringify(data)); } catch {}
    } catch (err){
      console.error(err);
      status.textContent = 'Sorry—there was a problem sending your RSVP. Please try again later.';
      status.classList.remove('ok');
    }
  });
})();
