'use strict';
(function () {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !expanded);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    }));
  }
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  const search = document.getElementById('publication-search');
  const filter = document.getElementById('publication-year');
  if (search && filter) {
    const items = Array.from(document.querySelectorAll('#publication-list .pub-entry'));
    const count = document.getElementById('publication-count');
    const empty = document.getElementById('publication-empty');
    function refresh() {
      const query = search.value.trim().toLowerCase();
      const selected = filter.value;
      let visible = 0;
      items.forEach(item => {
        const match = item.dataset.search.includes(query) && (selected === 'all' || item.dataset.year === selected);
        item.hidden = !match;
        if (match) visible++;
      });
      count.textContent = String(visible);
      empty.hidden = visible !== 0;
    }
    search.addEventListener('input', refresh);
    filter.addEventListener('change', refresh);
  }
})();
