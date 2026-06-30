(function(){
  "use strict";

  /* Anno corrente nel footer */
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  /* Header: ombra al scroll */
  var header = document.getElementById('header');
  function onScroll(){
    if(window.scrollY > 16){
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });

  /* Menu mobile toggle */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('main-nav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', function(){
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
    });

    mainNav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Reveal on scroll (IntersectionObserver) */
  var revealEls = document.querySelectorAll('.fade-up, .flavor-card');
  if('IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold:0.15, rootMargin:'0px 0px -40px 0px' });

    revealEls.forEach(function(el){ observer.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

})();
