// Inicializa o lazy loading para vídeos do YouTube
function initializeLazyLoadVideos() {
  const embeds = document.querySelectorAll('.wp-block-embed-youtube');

  if (!embeds.length) {
    return;
  }

  const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });

  embeds.forEach(figure => {
    const iframe = figure.querySelector('iframe');
    if (iframe) {
      iframe.dataset.src = iframe.getAttribute('src');
      iframe.src = '';
      observer.observe(figure);
    }
  });
}

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const figure = entry.target;
      const iframe = figure.querySelector('iframe');

      if (iframe && iframe.dataset.src) {
        const videoId = extractYoutubeVideoId(iframe.dataset.src.trim());
        if (videoId) {
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
          observer.unobserve(figure);
        }
      }
    }
  });
}

function extractYoutubeVideoId(url) {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

initializeLazyLoadVideos();
