/* =============================================
   nav.js — shared navigation & footer
   Edit the links array to add/remove pages.
   The active link is highlighted automatically.
   ============================================= */

const NAV_LINKS = [
  { label: 'Home',   href: 'index.html' },
  { label: 'Lecture Series', href: 'pages/series.html' },
  { label: 'Workshop',   href: 'pages/workshop.html' },
];

(function () {
  /* ── Resolve root-relative paths ── */
  const isSubpage = window.location.pathname.includes('/pages/');
  const root = isSubpage ? '../' : '';

  function resolveHref(href) {
    // Links already starting with '../' are fine for subpages
    if (isSubpage && !href.startsWith('http')) {
      return '../' + href;
    }
    return href;
  }

  /* ── Detect active page ── */
  function isActive(href) {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    return href.split('/').pop() === page;
  }

  /* ── Build nav HTML ── */
  const linksHTML = NAV_LINKS.map(link => {
    const active = isActive(link.href) ? ' class="active"' : '';
    return `<li><a href="${resolveHref(link.href)}"${active}>${link.label}</a></li>`;
  }).join('\n          ');

  const headerHTML = `
<header class="site-header">
  <div class="inner">
    <a href="${root}index.html" class="site-logo">
      <span class="institution">Yonsei</span>
      <span class="series-name">Mind and Memory</span>
    </a>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav-wrapper">
      <ul class="site-nav" style="list-style:none">
        ${linksHTML}
      </ul>
    </nav>
  </div>
</header>`;

  const footerHTML = `
<footer class="site-footer">
  <p>
    <span class="gold">Organized</span> by <a href="${root}pages/about.html">André Sant'Anna &amp; Nikolaj Jang Lee Linding Pedersen</a> ·
    Yonsei University
  </p>
</footer>`;

  /* ── Inject ── */
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  /* ── Hamburger toggle ── */
  const toggle = document.querySelector('.nav-toggle');
  const navWrapper = document.querySelector('.site-nav-wrapper');

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    navWrapper.classList.toggle('open', !open);
  });

  /* ── Close menu when a link is clicked ── */
  navWrapper.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      navWrapper.classList.remove('open');
    });
  });
})();
