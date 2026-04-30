


/* ---- CUSTOM CURSOR ---- */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

let mx = 0, my = 0;
let rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;

  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  ring.style.left   = rx + 'px';
  ring.style.top    = ry + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();


/* ---- CURSOR HOVER EFFECTS ---- */
document.querySelectorAll('a, button, .project-card, .skill-pill').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '16px';
    cursor.style.height = '16px';
    ring.style.width    = '50px';
    ring.style.height   = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    ring.style.width    = '36px';
    ring.style.height   = '36px';
  });
});


/* ---- MOBILE HAMBURGER MENU ---- */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ---- PROJECT CARD STAGGER ---- */
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.transitionDelay = (index * 0.08) + 's';
  revealObserver.observe(card);
});


/* ---- CONTACT FORM ---- */
function handleSend(btn) {
  const name    = document.getElementById('from_name').value.trim();
  const email   = document.getElementById('from_email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Don't send if any field is empty
  if (!name || !email || !message) {
    btn.textContent      = 'Fill all fields!';
    btn.style.background = '#ff5f57';
    btn.style.color      = 'var(--bg)';
    setTimeout(() => {
      btn.textContent      = 'Send Message';
      btn.style.background = '';
      btn.style.color      = '';
    }, 2000);
    return;
  }

  // Show loading state
  btn.textContent      = 'Sending...';
  btn.style.background = 'var(--muted)';
  btn.style.color      = 'var(--text)';
  btn.disabled         = true;

  // Send via EmailJS
  emailjs.send(
    'service_ho517zd',      // Your Service ID
    'template_sienwpa',       // Your Template ID
    {
      from_name:  name,
      from_email: email,
      message:    message,
    }
  )
  .then(() => {
    // Success
    btn.textContent      = 'Sent ✓';
    btn.style.background = 'var(--green)';
    btn.style.color      = 'var(--bg)';
    btn.disabled         = false;

    // Clear fields
    document.getElementById('from_name').value  = '';
    document.getElementById('from_email').value = '';
    document.getElementById('message').value    = '';

    setTimeout(() => {
      btn.textContent      = 'Send Message';
      btn.style.background = '';
      btn.style.color      = '';
    }, 3000);
  })
  .catch((error) => {
    // Failed
    console.error('EmailJS error:', error);
    btn.textContent      = 'Failed — Try Again';
    btn.style.background = '#ff5f57';
    btn.style.color      = 'var(--bg)';
    btn.disabled         = false;

    setTimeout(() => {
      btn.textContent      = 'Send Message';
      btn.style.background = '';
      btn.style.color      = '';
    }, 3000);
  });
}
