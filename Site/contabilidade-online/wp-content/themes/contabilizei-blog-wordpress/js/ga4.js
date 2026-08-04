function dataLayerExists() {
  return typeof dataLayer !== 'undefined';
}

function awaitDataLayer() {
  return new Promise((resolve) => {
    if (dataLayerExists()) {
      resolve(dataLayer);
      return;
    }

    const intervalId = setInterval(() => {
      if (dataLayerExists()) {
        clearInterval(intervalId);
        resolve(dataLayer);
      }
    }, 100);
  });
}

function isPage(path) {
  return window.location.pathname.includes(path)
}

const trilha = '/trilha-de-conhecimento/'

function slugify(string) {
  return string
    .normalize("NFD")
    .replace(/[/]/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-+/g, "-")
    .toLowerCase();
}

const isTestEmail = (email) => {
  const atList = ['@contabilizei', '@getnada', '@teste'];
  return (atList.some((domain) => email.includes(domain)));
}

function href(path, hasComplement = true) {
  if(path === null || path.includes('javascript')) {
    return false
  }
  if(path.includes('app.contabilizei')) {
    return 'checkout'
  }
  if (path.includes('http://') || path.includes('https://')) {
    return path;
  }
  let domain = 'https://www.contabilizei.com.br';

  if (hasComplement) {
    domain = `${domain}/contabilidade-online`;
  }

  const url = path[0] === '/' ? path : `/${path}`;

  return domain + url;
}

const dispatchGa4 = (params) => {
  if (!params) {
    return
  }

  const data = {
    ...(params.event && { event: params.event }),
    ...(params.secao_pagina && { secao_pagina: params.secao_pagina }),
    ...(params.click_text && { click_text: params.click_text }),
    ...(params.nome_modal && { nome_modal: params.nome_modal }),
    ...(params.is_test && { is_test: isTestEmail(params.is_test) }),
    ...(params.click_page_redirect && { click_page_redirect: params.click_page_redirect }),
    ...(params.conteudo_impressao && { conteudo_impressao: params.conteudo_impressao }),
  };

  const promise = awaitDataLayer();
  promise.then((dataLayer) => dataLayer.push(data));
}

const dispatchGa4V2 = (params) => {
  if (!params) {
    return;
  }

  if (!window.ga4Config || !window.ga4Config.enabled) {
    return;
  }

  const {
    event,
    ...extraParams
  } = params;

  if (!event) {
    return;
  }

  const data = {
    event,
    ...extraParams,
  };

  awaitDataLayer().then((dl) => dl.push(data));
};

const getCf7FormTitle = (form, event) => {
  const hiddenTitle = form.querySelector('input[name="ctbz_form_title"]');
  if (hiddenTitle && hiddenTitle.value) {
    return hiddenTitle.value;
  }

  const inputs = Array.isArray(event?.detail?.inputs) ? event.detail.inputs : [];
  const titleInput = inputs.find((input) => input.name === 'ctbz_form_title');

  return titleInput ? titleInput.value : '';
};

const getDynamicRedirectUrl = (el) => {
  const rawHref = el.getAttribute('href');

  if (!rawHref || rawHref.startsWith('#')) {
    return undefined;
  }

  return href(rawHref);
};

const getPromotionBannerElement = (el) => {
  return el.closest('#banner-ads');
};

const addEventGa4 = (params) => {
  const { event = 'page_click', el, clickText, clickPageRedirect, secaoPagina } = params;

  if (el) {
    el.addEventListener(
      'click',
      () => {
        dispatchGa4({
          "event": event,
          "click_text": clickText,
          "click_page_redirect": clickPageRedirect,
          "secao_pagina": secaoPagina,
        });
      },
    );
  }
}

function arrayIncludes(array, item) {
  return array.some((element) => element.clickText === item);
}

function addDropdownEventListener(dropdownText) {
  const itemsArray = [];
  document.querySelectorAll(`.links-menu-blog-${dropdownText}`).forEach((el) => {
    const clickText = slugify(el.innerText);
    const clickPageRedirect = href(el.getAttribute('href'), false);
    if (!arrayIncludes(itemsArray, clickText)) {
      itemsArray.push({ clickText, clickPageRedirect });
      if (clickText !== 'recomendados') {
        addEventGa4({
          el,
          clickText: `${dropdownText}:${clickText}`,
          clickPageRedirect,
          secaoPagina: "menu-blog"
        })
      } else {
        addDropdownEventListener(clickText)
      }
    }
  });
}

const findElement = (payload, withoutRedirect = false) => {
    document.querySelectorAll(payload.element).forEach((el) => {
      const clickText = payload.clickText(el);

      const clickPageRedirect = withoutRedirect ? false : payload.clickPageRedirect(el);
      addEventGa4({
        el,
        clickText,
        clickPageRedirect,
        secaoPagina: payload.secaoPagina
      })
    });
}

function LinkMenu () {
  document.querySelectorAll('.menu-item .nav-link').forEach((el) => {
    const dropdownText = slugify(el.innerText);
    if (
      dropdownText === 'planos' ||
      dropdownText === 'abrir-empresa' ||
      dropdownText === 'trocar-de-contador'
    ) {
      const clickPageRedirect = href(el.getAttribute('href'), false);
      addEventGa4({
        el,
        clickText: dropdownText,
        clickPageRedirect,
        secaoPagina: "menu-blog"
      });
    } else {
      addDropdownEventListener(dropdownText);
    }
  });
}

// Âncoras laterais
(function () {
  if(isPage(trilha)) {
    const sectionPage = slugify(
      document.querySelector(
        '.chapter-selector__header h1 .font-weight-bold'
        ).innerText
      )
    findElement({
      element: '.ga-cta-link-artigos',
      clickText: (el) => slugify(el.querySelector('h3').innerText),
      clickPageRedirect: (el) => href(el.getAttribute('href'), false),
      secaoPagina: sectionPage
    }, true);
    } else{
  findElement({
    element: '.ga-cta-link-artigos',
    clickText: (el) => slugify(el.innerText),
    clickPageRedirect: (el) => href(el.getAttribute('href'), false),
    secaoPagina: "ancora-artigos-blog"
  });
  }
})();

// Cards Trilha
(function () {
  findElement({
    element: '.text-decoration-none',
    clickText: (el) => slugify(el.querySelector('.topic-card__body h1').innerText),
    clickPageRedirect: (el) => href(el.getAttribute('href')),
    secaoPagina: "por-onde-comecar-o-processo-de-abertura-da-sua-empresa"
  });
})();

// Cards laterais
(function () {
  findElement({
    element: '.ga-cta-sidebar',
    clickText: (el) => slugify(el.querySelector('.aside-posts__btn').innerText),
    clickPageRedirect: (el) => href(el.getAttribute('href')),
    secaoPagina: "cards-laterais-blog"
  });
})();

// Mural de links
(function () {
  findElement({
    element: '.ga-links-mural-linkagem-interna',
    clickText: (el) => slugify(el.innerText),
    clickPageRedirect: (el) => href(el.getAttribute('href'), false),
    secaoPagina: "mural-links-blog"
  });
})();


//Evento de sucesso Form Newsletter na Trilha do conhecimento
(function () {
  if(isPage(trilha)) {
    var wpcf7Elm = document.querySelector( '.wpcf7' );
    wpcf7Elm.addEventListener( 'wpcf7submit', function( event ) {
      dispatchGa4({
        "event": 'form_submission',
        "nome_modal": "newsletter",
        "is_test": wpcf7Elm.querySelector('.wpcf7-email').value

      });
    }, false )
  }
})();


// Footer | A EMPRESA | CONTABILIDADE | SEGURANÇA
(function () {
  findElement({
    element: '.lista-footer .link',
    clickText: (el) => slugify(el.innerText),
    clickPageRedirect: (el) => href(el.getAttribute('href'), false),
    secaoPagina: "footer-blog"
  });
})();

// Footer Redes Sociais
(function () {
  findElement({
    element: '.img-redes-sociais',
    clickText: (el) => slugify(el.title).split('-')[0],
    clickPageRedirect: (el) => el.getAttribute('href'),
    secaoPagina: "footer-blog"
  });
})();

// Footer link manifesto
(function () {
  findElement({
    element: '.link-manifesto',
    clickText: (el) => slugify(el.innerText),
    clickPageRedirect: (el) => href(el.getAttribute('href'), false),
    secaoPagina: "footer-blog"
  });
})();

window.addEventListener('load', () => {
  // Links do menu
  LinkMenu();
});

// Banner footer
(function() {
  document.querySelectorAll('.ga-ctas-superbanner-rodape').forEach((el) => {
    const clickText = slugify(el.innerText);
    const clickPageRedirect = `https://www.contabilizei.com.br/${slugify(el.getAttribute('href'))}`;
    el.addEventListener(
      'click',
      () => dispatchGa4({
        'event': 'page_click',
        'click_text': clickText,
        'click_page_redirect': clickPageRedirect,
        'secao_pagina': isPage(trilha) ? 'abra-sua-empresa-de-forma-rapida-e-emita-suas-notas-fiscais': 'super-banner-rodape-blog'
      })
    )
  })
})();

// Posts relacionados
(function() {
  document.querySelectorAll('#colophon a').forEach((el) => {
    const clickText = slugify(
      el.querySelector('p').innerText
      .replaceAll(':', '')
      .replaceAll('?', '')
    );
    const clickPageRedirect = slugify(el.getAttribute('href'));

    el.addEventListener(
      'click',
      () => dispatchGa4({
        'event': 'page_click',
        'click_text': clickText,
        'click_page_redirect': href(`/${clickPageRedirect}`),
        'secao_pagina': 'posts-relacionados-blog'
      })
    )
  })
})();

// Sessão sem burocracia CTA
(function() {
  document.querySelectorAll('.conteudo-de-conversao a').forEach((el) => {
    const clickText = slugify(
      el.innerText
      .replaceAll(':', '')
      .replaceAll('?', '')
    );
    const clickPageRedirect = el.getAttribute('href');
    const title = document.querySelector('.conteudo-de-conversao h2').innerText;

    el.addEventListener(
      'click',
      () => dispatchGa4({
        'event': 'page_click',
        'click_text': clickText,
        'click_page_redirect': clickPageRedirect,
        'secao_pagina': slugify(title.replaceAll('?', ''))
      })
    )
  })
})();

// ──── Novos eventos DP6 ────

// Eventos estáticos por contexto
(function () {
  if (!window.ga4Config || !window.ga4Config.enabled) {
    return;
  }

  const validContexts = ['home', 'search', 'category', 'post', 'materiais', 'materiais-tax'];
  if (validContexts.includes(window.ga4Config.context)) {
    const ctxEvents = window.ga4Config.events || [];
    ctxEvents.forEach(function (eventObj) {
      if (!eventObj.event) {
        return;
      }
      const slugified = {};
      Object.keys(eventObj).forEach(function (key) {
        slugified[key] = (key !== 'event' && typeof eventObj[key] === 'string')
          ? slugify(eventObj[key])
          : eventObj[key];
      });
      dispatchGa4V2(slugified);
    });
  }
})();

// Eventos dinâmicos por clique
function resolveContentType(el) {
  const elHref = el.getAttribute('href') || '';
  if (elHref.startsWith('#')) {
    return 'ancora';
  }
  if (elHref.startsWith('/') || elHref.startsWith('https://')) {
    return 'link';
  }
  return '';
}

function resolveContentId(el) {
  const btn = el.querySelector('.aside-posts__btn');
  if (btn) {
    return slugify(btn.innerText);
  }
  const p = el.querySelector('p');
  if (p) {
    return slugify(p.innerText);
  }
  return slugify(el.innerText);
}

function buildStaticParams(listener) {
  const params = { event: listener.event };
  Object.keys(listener.params || {}).forEach(function (key) {
    const val = listener.params[key];
    params[key] = typeof val === 'string' ? slugify(val) : val;
  });
  return params;
}

function applyDynamicParams(params, el, dynamicKeys, resolvers) {
  dynamicKeys.forEach(function (key) {
    if (!resolvers[key]) {
      return;
    }
    const value = resolvers[key](el);
    if (value !== undefined) {
      params[key] = value;
    }
  });
}

function handleClickListeners(listeners, resolvers, event) {
  listeners.forEach(function (listener) {
    if (!listener.event || !listener.selector || listener.trigger) {
      return;
    }

    const el = event.target.closest(listener.selector);
    if (!el) {
      return;
    }

    if (listener.event === 'internal_bridge_conversion' && getPromotionBannerElement(el)) {
      return;
    }

    const params = buildStaticParams(listener);
    applyDynamicParams(params, el, listener.dynamic_params || [], resolvers);
    dispatchGa4V2(params);
  });
}

(function () {
  if (!window.ga4Config || !window.ga4Config.enabled) {
    return;
  }

  const dynamicParamResolvers = {
    origin_page_path:    function ()   { return window.location.href; },
    destination_lp:      function (el) { return getDynamicRedirectUrl(el); },
    content_type:        function (el) { return resolveContentType(el); },
    content_id:          function (el) { return resolveContentId(el); },
    promotion_id: function (el) {
      const b = getPromotionBannerElement(el);
      return b && b.id ? b.id : undefined;
    },
    promotion_name: function (el) {
      const b = getPromotionBannerElement(el);
      return b && b.id ? b.id : undefined;
    },
    click_page_redirect: function (el) { return getDynamicRedirectUrl(el); },
  };

  const listeners = window.ga4Config.listeners || [];

  document.addEventListener('click', function (event) {
    handleClickListeners(listeners, dynamicParamResolvers, event);
  });
})();

// Eventos de submit CF7
(function () {
  if (!window.ga4Config || !window.ga4Config.enabled) {
    return;
  }

  const submitListeners = (window.ga4Config.listeners || []).filter(function (l) {
    return l.trigger === 'wpcf7submit';
  });

  if (!submitListeners.length) {
    return;
  }

  submitListeners.forEach(function (listener) {
    document.querySelectorAll(listener.selector).forEach(function (form) {
      form.addEventListener('wpcf7submit', function (event) {
        const params = { event: listener.event };

        Object.keys(listener.params || {}).forEach(function (key) {
          params[key] = listener.params[key];
        });

        const formTitle = getCf7FormTitle(form, event);
        if (formTitle) {
          params.nome_form = formTitle;
        }

        dispatchGa4V2(params);
      });
    });
  });
})();

// Eventos de vídeo YouTube
function getVideoTitle(iframe) {
  const title = iframe.getAttribute('title');
  if (title) {
    return slugify(title);
  }
  const videoSrc = iframe.getAttribute('src') || '';
  const match = videoSrc.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : 'youtube-video';
}

function getVideoUrl(iframe) {
  return (iframe.getAttribute('src') || '').split('?')[0];
}

function ensureEnableJsApi(iframe) {
  const src = iframe.getAttribute('src') || '';
  if (!src.includes('enablejsapi=1')) {
    iframe.setAttribute('src', `${src}${src.includes('?') ? '&' : '?'}enablejsapi=1`);
  }
}

function createYtStateChangeHandler(eventPlay, eventComplete, videoTitle, videoUrl) {
  return function (event) {
    if (eventPlay && event.data === YT.PlayerState.PLAYING) {
      dispatchGa4V2({ event: eventPlay, video_title: videoTitle, video_url: videoUrl });
    }
    if (eventComplete && event.data === YT.PlayerState.ENDED) {
      dispatchGa4V2({ event: eventComplete, video_title: videoTitle, video_url: videoUrl });
    }
  };
}

function setupYouTubePlayer(iframe, eventPlay, eventComplete, videoPlayers) {
  ensureEnableJsApi(iframe);
  const videoUrl   = getVideoUrl(iframe);
  const videoTitle = getVideoTitle(iframe);
  try {
    const player = new YT.Player(iframe.id, {
      events: { onStateChange: createYtStateChangeHandler(eventPlay, eventComplete, videoTitle, videoUrl) }
    });
    videoPlayers.push(player);
  } catch (e) {
    console.error('GA4 Video: Erro ao inicializar player YouTube', e);
  }
}

function observeIframeSrc(iframe, onSrcReady) {
  const mo = new MutationObserver(function (mutations) {
    for (let i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === 'src' && iframe.getAttribute('src')) {
        mo.disconnect();
        onSrcReady();
        return;
      }
    }
  });
  mo.observe(iframe, { attributes: true, attributeFilter: ['src'] });
}

function initYouTubeIframe(iframe, index, eventPlay, eventComplete, videoPlayers) {
  if (!iframe.id) {
    iframe.id = 'ga4-youtube-' + index;
  }
  const setup = function () { 
    setupYouTubePlayer(iframe, eventPlay, eventComplete, videoPlayers);
  };
  if (iframe.getAttribute('src')) {
    setup();
  } else {
    observeIframeSrc(iframe, setup);
  }
}

function initializeYouTubeVideos(ytListeners, videoPlayers) {
  ytListeners.forEach(function (listenerConfig) {
    const selector      = listenerConfig.selector;
    const eventPlay     = listenerConfig.event_play;
    const eventComplete = listenerConfig.event_complete;
    if (!selector || (!eventPlay && !eventComplete)) {
      return;
    }
    document.querySelectorAll(selector).forEach(function (iframe, index) {
      initYouTubeIframe(iframe, index, eventPlay, eventComplete, videoPlayers);
    });
  });
}

function loadYouTubeAPI(ytListeners, videoPlayers) {
  if (window.YT && window.YT.Player) {
    initializeYouTubeVideos(ytListeners, videoPlayers);
    return;
  }
  const tag            = document.createElement('script');
  tag.src              = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

(function () {
  const ytListeners = window.ga4Config && window.ga4Config.video_listeners;
  if (!ytListeners || !ytListeners.length) {
    return;
  }

  const videoPlayers = [];

  // Callback quando YouTube API está pronta — encadeia com callback existente
  const previousYTReady = window.onYouTubeIframeAPIReady || null;
  window.onYouTubeIframeAPIReady = function () {
    if (previousYTReady) {
      previousYTReady();
    }
    initializeYouTubeVideos(ytListeners, videoPlayers);
  };

  // Iniciar ao carregar o DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      loadYouTubeAPI(ytListeners, videoPlayers);
    });
  } else {
    loadYouTubeAPI(ytListeners, videoPlayers);
  }
})();
