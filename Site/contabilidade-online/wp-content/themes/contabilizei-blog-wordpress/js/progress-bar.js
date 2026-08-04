const isMobile = window.innerWidth <= 992;

if (!isMobile) {
  const progressBar = document.createElement('div');
  const navBar = document.getElementById('TheHeader');
  progressBar.classList.add('progress-bar');
  progressBar.style.position = 'absolute';
  progressBar.style.bottom = '-6px';
  progressBar.style.left = 0;
  progressBar.style.height = '6px';
  progressBar.style.backgroundColor = 'rgb(4, 247, 247)';
  progressBar.style.zIndex = 10;

  navBar.appendChild(progressBar);

  const postWrapper = document.getElementsByClassName("post-wrapper")[0];
  const breadcrumbs = document.getElementById("breadcrumbs");
  const header = document.getElementsByClassName("header")[0];

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const elementoHeight = postWrapper.offsetHeight + breadcrumbs.offsetHeight + header.offsetHeight + 92 + remToPx(2.5);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;

    const progress = Math.min(Math.max((scrollTop) / (elementoHeight - windowHeight), 0), 1) * 100;
    progressBar.style.width = `${progress}%`;

    if (progress === 100) {
      progressBar.style.opacity = .5;
    } else {
      progressBar.style.opacity = 1;
    }
  });
}

function remToPx(rem) {
  const fontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
  return rem * fontSize;
}
