(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  function setMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  }

  burger.addEventListener('click', function () {
    setMenu(burger.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 860) setMenu(false);
  });

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Filtro gusti (solo pagina menu)
  var filter = document.querySelector('.filter');
  var flavors = document.querySelectorAll('#flavors li');
  if (filter && flavors.length) {
    filter.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip');
      if (!btn) return;
      var cat = btn.getAttribute('data-filter');
      filter.querySelectorAll('.chip').forEach(function (c) {
        var on = c === btn;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
      });
      flavors.forEach(function (li) {
        li.hidden = !(cat === 'all' || li.getAttribute('data-cat') === cat);
      });
    });
  }
})();
