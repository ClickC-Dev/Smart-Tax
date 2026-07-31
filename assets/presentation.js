(function () {
  function scaleFrames() {
    document.querySelectorAll('.card-frame').forEach(function (frame) {
      var iframe = frame.querySelector('iframe');
      if (!iframe) return;
      var vw = parseInt(frame.dataset.vw, 10);
      var vh = parseInt(frame.dataset.vh, 10);
      var displayW = frame.clientWidth;
      var scale = displayW / vw;
      iframe.style.width = vw + 'px';
      iframe.style.height = vh + 'px';
      iframe.style.transform = 'scale(' + scale + ')';
      frame.style.height = Math.round(vh * scale) + 'px';
    });
  }

  window.addEventListener('resize', debounce(scaleFrames, 120));
  window.addEventListener('load', scaleFrames);
  document.addEventListener('DOMContentLoaded', scaleFrames);

  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }

  // mobile nav toggle
  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.topnav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        links.classList.toggle('open');
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { links.classList.remove('open'); });
      });
    }

    // scrollspy for active nav link
    var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.topnav-links a'));
    if ('IntersectionObserver' in window && sections.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (a) {
              a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
            });
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
      sections.forEach(function (s) { observer.observe(s); });
    }
  });
})();
