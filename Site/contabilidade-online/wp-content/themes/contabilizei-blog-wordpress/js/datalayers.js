function sendEvent(eventCategory, eventAction, eventLabel, event) {
  const data = {
    event: event || 'InteractionEventUser',
    eventCategory,
    eventAction,
    eventLabel,
  };
  dataLayer.push(data);
}

function formSubmitGA4 (params) {
  if (!params) {
    return
  }

  const data = {
    ...(params.event && { event: params.event }),
    ...(params.nome_modal && { nome_modal: params.nome_modal }),
    ...(params.atividade_modal && { atividade_modal: params.atividade_modal }),
    ...(params.hubsopt_error && { hubsopt_error: params.hubsopt_error }),
    ...(params.is_test && { is_test: params.is_test }),
  };

  dataLayer.push(data);
}

function checkIsTest(email) {
  const listTest = ['getnada', 'contabilizei', 'teste'];

  if (email.includes('@')) {
    const domain = email.split('@')[1];

    for (const testDomain of listTest) {
      if (domain.includes(testDomain)) {
        return true;
      }
    }
  }

  return false;
}

function slugifyDatalayer(string) {
  return string
  .normalize("NFD")
  .replaceAll("/", " ")
  .trim()
  .replaceAll(/ /g, "-")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();
}

const link = window.location.pathname;

// Header
(function () {
  const blogEventCategory = 'Blog | Header';

  document.querySelector('.navbar-brand').addEventListener(
    'click',
    () => sendEvent(
      blogEventCategory,
      'Clique | logo',
      link
    )
  );

  document.querySelectorAll('#menu-menu-principal a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        blogEventCategory,
        `Clique | menu_0'${index + 1} | ${el.innerText} | ' ${el.pathname}`,
        link
      )
    );
  });

  document.querySelectorAll('header .menu-links a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        blogEventCategory,
        `Clique | menu_materiais_0'${index + 1} | ${el.innerText} | ' ${el.pathname}`,
        link
      )
    );
  });

  document.querySelectorAll('header ul.ctas a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        blogEventCategory,
        `Clique | menu_cta_destaque_0'${index + 1} | ${el.innerText} | ' ${el.pathname}`,
        link
      )
    );
  });

  document.querySelectorAll('article .categorias .dropdown-menu a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Dropdown-Categoria',
        `${el.innerText} | ${el.pathname}`,
        link
      )
    );
  });
}());

// Breadcrumbs
(function () {
  document.querySelectorAll('#breadcrumbs a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Breadcrumb',
        `Clique | breadcrumb_0'${index + 1}`,
        link
      )
    );
  });

}());

// Table of Contents
(function () {
  document.querySelectorAll('.table-of-contents ul li > a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Sidebar',
        `Clique | T.O.C_0${index + 1} | ${el.innerText}`,
        link
      )
    );
  });

}());

// Conteudo das Postagens
(function () {
  const blogEventCategory = 'Blog | Post';

  document.querySelectorAll('.post-wrapper__content a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        blogEventCategory,
        `Clique | link_0${index + 1} | ${el.innerText} | ${el.pathname}`,
        link
      )
    );
  });

  document.querySelectorAll('.cta-text').forEach((el, index) => {
    const textButton = el.querySelector('.cta-text .link').innerText;
    el.addEventListener(
      'click',
      () => sendEvent(
        blogEventCategory,
        `Clique | cta_texto_0${index + 1} | ${textButton} | ${el.pathname}`,
        link
      )
    );
  });

  document.querySelectorAll('.wp-block-image > a').forEach((el, index) => {
    const textAlt = el.querySelector('.wp-block-image a img').alt;
    el.addEventListener(
      'click',
      () => sendEvent(
        blogEventCategory,
        `Clique | cta_imagem_0${index + 1} | ${textAlt} | ${el.pathname}`,
        link
      )
    );
  });

  document.querySelectorAll('.posts-relacionados article > a').forEach((el, index) => {
    const textTitle = el.querySelector('.posts-relacionados article > a .title').innerText;
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Cont.Relacionados',
        `Clique | Post_0${index + 1} | ${textTitle} | ${el.pathname}`,
        link
      )
    );
  });

}());

// Tabela CNAE
(function () {
  document.querySelectorAll('.cnae-table td > a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Tabela CNAE',
        `Clique | link_0${index + 1} | ${el.innerText} | ${el.pathname}`,
        link
      )
    );
  });

  document.querySelectorAll('.cta-tabela-cnae > a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Tabela CNAE',
        `Clique | ${el.innerText} | ${el.pathname}`,
        link
      )
    );
  });

}());

// Tabelas gerais
(function () {
  const blogEventCategory = 'Blog | Tabelas';
  document.querySelectorAll('.atividade-mei-simples-nacional td > a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        blogEventCategory,
        `'Clique | link_0${index + 1} | ${el.innerText} | ${el.pathname}`,
        link
      )
    );
  });

  document.querySelectorAll('.atividade-mei-simples-nacional > a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        blogEventCategory,
        `Clique | ${el.innerText} | ${el.pathname}`,
        link
      )
    );
  });

  document.querySelectorAll('.cta-atividade-mei-simples-nacional > a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        blogEventCategory,
        `Clique | ${el.innerText} | ${el.pathname}`,
        link
      )
    );
  });

}());

// Novo Banner das Postagens
(function () {
  document.querySelectorAll('.new-header .content > a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Banner',
        `Clique | ${el.innerText} | ${el.pathname}`,
        link
      )
    );
  });

  document.querySelectorAll('.new-header .autor-nome > a').forEach((el, index) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Banner - Autor',
        `Clique | ${el.innerText} | ${el.pathname}`,
        link
      )
    );
  });

}());

//Barra Lateral Direita
(function () {
  document.querySelectorAll('.recomendacoes > a').forEach((el, index) => {
    const textButton = el.querySelector('.recomendacoes > a .btn').innerText;
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Sidebar',
        `Clique | barra_lateral_0${index + 1} | ${textButton} | ${el.pathname}`,
        link
      )
    );
  });

}());

// Forms Contact Form
(function () {
  const ebook = window.location.pathname.includes('materiais');

  if (ebook) {
    document.addEventListener('wpcf7mailsent', function () {
      sendEvent(
        'Materiais | Blog',
        'Envio de formulário | Ebook',
        link
      );

      const formOrigin = link.split('/').filter(item => item !== '');
      const nomeModal = formOrigin[formOrigin.length - 1];
      const activity = document.querySelector('[name="your-activity"]').value;
      const email = document.querySelector('[name="email"]').value;
      formSubmitGA4({
        'event': 'form_submission',
        'nome_modal': nomeModal,
        'atividade_modal': slugifyDatalayer(activity.replaceAll('/', '').replaceAll('  ', ' ')),
        'is_test': checkIsTest(email)
      });
    }, false);
  }
  if (!ebook) {
    document.addEventListener('wpcf7mailsent', function (event) {
      const formEspecialista = event.detail.contactFormId === 26073 ? 'Fale com Especialista' : 'Newsletter';
      sendEvent(
        'Materiais | Blog',
        'Envio de formulário | ' + formEspecialista,
        link
      )
    }, false);
  }

  document.addEventListener('wpcf7mailsent', function (event) {
    if (44 === event.detail.contactFormId) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'send-newsletter-blog',
      });
    }
  }, false);
}());

// Super Banner
(function () {
  document.querySelectorAll('.super-banner .content .btn').forEach((el) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Super Banner',
        `Clique | ${el.innerText} | ${el.pathname}`,
        link
      )
    );
  });
}());

// CTA Abertura
(function () {
  document.querySelectorAll('.cta-abertura').forEach((el) => {
    const textButton = el.querySelector('.cta-abertura > a .button').innerText;
    const linkCta = el.querySelector('.cta-abertura > a').pathname;
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | CTA Abertura',
        `Clique | ${textButton} | ${linkCta}`,
        link
      )
    );
  });
}());

// CTA RPA Online
(function () {
  document.querySelectorAll('.cta-rpa-online').forEach((el) => {
    const textButton = el.querySelector('.cta-rpa-online > a .button').innerText;
    const linkCta = el.querySelector('.cta-rpa-online > a').pathname;
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | CTA RPA Online',
        `Clique | ${textButton} | ${linkCta}`,
        link
      )
    );
  });
}());

// Modal Popup
(function () {
  document.querySelectorAll('#modalAbrirCnpj .link').forEach((el) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Modal Abrir CNPJ',
        `'Clique | ${el.innerText} | ${el.pathname}`,
        link
      )
    );
  });
  document.querySelectorAll('#modalAbrirCnpj button').forEach((el) => {
    el.addEventListener(
      'click',
      () => sendEvent(
        'Blog | Modal Abrir CNPJ',
        'Clique | Fechar',
        link
      )
    );
  });
}());

// Trilhas de conhecimento - Sidemenu
(function () {
  document.querySelectorAll('#trailSidemenu .chapter-selector__item').forEach((el) => {
    const innerText = el.querySelector('h3').innerText;
    el.addEventListener(
      'click',
      () => sendEvent(
        `blog:${el.pathname}`,
        `click:ancora-artigos`,
        innerText
      )
    );
  });
}());

// Trilhas de conhecimento - Posts relacionados
(function () {
  document.querySelectorAll('#open-process .open-process__body a').forEach((el) => {
    const eventLabel = el.dataset.eventLabel;
    el.addEventListener(
      'click',
      () => sendEvent(
        `blog:${slugifyDatalayer(link)}`,
        `click:posts-relacionados`,
        eventLabel,
        'customEvent',
      )
    );
  });
}());

// Trilhas de conhecimento - Navegação entre artigos
(function () {
  document.querySelectorAll('#trailContent .content-body__buttons a').forEach((el) => {
    const eventLabel = el.innerText;
    el.addEventListener(
      'click',
      () => sendEvent(
        `blog:${slugifyDatalayer(link)}`,
        `click:artigos-trilha-conhecimento`,
        slugifyDatalayer(eventLabel),
        'customEvent',
      )
    );
  });
}());

// Trilhas de conhecimento - Botão falar com especialista
(function () {
  document.querySelectorAll('.trilhas-falar-especialista__button').forEach((el) => {
    const eventLabel = el.dataset.eventLabel;
    el.addEventListener(
      'click',
      () => sendEvent(
        `blog:${slugifyDatalayer(link)}`,
        `click:artigos-trilha-conhecimento`,
        eventLabel,
        'customEvent',
      )
    );
  });
}());

// Trilhas de conhecimento - Botões do quiz
(function () {
  document.querySelectorAll('.quiz-button').forEach((el) => {
    const eventLabel = el.dataset.eventLabel;
    const labelCount = el.dataset.quizButton;
    el.addEventListener(
      'click',
      () => sendEvent(
        `blog:${slugifyDatalayer(link)}`,
        `click:quiz`,
        `${eventLabel}|pergunta-${+labelCount+1}`,
        'customEvent',
      )
    );
  });
}());
