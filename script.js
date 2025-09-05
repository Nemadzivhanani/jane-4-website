// Basic behavior: menu toggle, scroll header change, auto-close nav links
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinksSelector = '.mobile-nav .nav-link, .mobile-nav a';
  const cartCount = document.getElementById('cart-count');

  // initial header state
  if (!header.classList.contains('transparent') && window.scrollY < 60) {
    header.classList.add('transparent');
  }

  // toggle menu
  function toggleMenu() {
    const open = mobileNav.style.display === 'flex';
    if (open) {
      mobileNav.style.display = 'none';
      mobileNav.setAttribute('aria-hidden', 'true');
    } else {
      mobileNav.style.display = 'flex';
      mobileNav.style.flexDirection = 'column';
      mobileNav.setAttribute('aria-hidden', 'false');
    }
  }
  window.toggleMenu = toggleMenu; // for inline onclick if used
  hamburger.addEventListener('click', toggleMenu);

  // auto-close when a nav link is clicked
  mobileNav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      mobileNav.style.display = 'none';
      mobileNav.setAttribute('aria-hidden','true');
    }
  });

  // header switch on scroll
  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.remove('transparent');
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
      header.classList.add('transparent');
    }
  }
  window.addEventListener('scroll', updateHeader);
  updateHeader();

  // sample cart count placeholder — replace with real cart logic later
  if (cartCount) cartCount.textContent = '0';
});
