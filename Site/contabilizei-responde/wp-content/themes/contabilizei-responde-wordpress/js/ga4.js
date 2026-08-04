/* global ga4 */

function sendGA4( params ) {
	if (!params) {
    return
  }

  const data = {
    ...(params.event && { event: params.event }),
    ...(params.secao_pagina && { secao_pagina: params.secao_pagina }),
    ...(params.click_text && { click_text: params.click_text }),
    ...(params.nome_modal && { nome_modal: params.nome_modal }),
    ...(params.click_page_redirect && { click_page_redirect: params.click_page_redirect }),
    ...(params.is_test !== undefined && { is_test: params.is_test }),
  };

	dataLayer.push( data );
}

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

// CTA Abra sua empresa
const menuCTAAbraSuaEmpresa = document.querySelector( '#menu-menu-login .btn-primary a' );
if ( menuCTAAbraSuaEmpresa ) {
	menuCTAAbraSuaEmpresa.addEventListener( 'click', () =>
		sendGA4({
			event: "page_click",
			click_text: slugify(menuCTAAbraSuaEmpresa.innerText),
			secao_pagina: "menu",
			click_page_redirect: 'checkout'
		})
	);
}

// Perguntas frequentes
const perguntasFrequentes = document.querySelectorAll( '.questions-home__linkcard' );
if ( perguntasFrequentes ) {
	perguntasFrequentes.forEach( ( link ) => {
		const title = link.querySelector( '.questions-home__card__title' ).innerText;

		link.addEventListener( 'click', () =>
			sendGA4({
				event: "page_click",
				click_text: slugify(title),
				secao_pagina: "perguntas-frequentes",
				click_page_redirect: link.href
			})
		);
	});
}

// CTA Ler todas as perguntas
const ctaTodasAsPergutnas = document.querySelector( '.questions-home .btn--primary' );
if ( ctaTodasAsPergutnas ) {
	ctaTodasAsPergutnas.addEventListener( 'click', () =>
		sendGA4({
			event: "page_click",
			click_text: slugify(ctaTodasAsPergutnas.innerText),
			secao_pagina: "perguntas-frequentes",
			click_page_redirect: ctaTodasAsPergutnas.href
		})
	);
}

// CTA Venha para Contabilizei
const ctaVenhaParaCtbz = document.querySelector( '.ga-dobra-reasons' );
if ( ctaVenhaParaCtbz ) {
	ctaVenhaParaCtbz.addEventListener( 'click', () =>
		sendGA4({
			event: "page_click",
			click_text: slugify(ctaVenhaParaCtbz.innerText),
			secao_pagina: "parceiros-de-quem-empreende",
			click_page_redirect: ctaVenhaParaCtbz.href
		})
	);
}

// CTA Abra sua empresa com quem é lider de mercado
const quemELiderDeMercado = document.querySelector( '.avaliacao-contabilizei__ctas' );
if (quemELiderDeMercado) {
	const ctasQuemELiderDeMercado = quemELiderDeMercado.querySelectorAll('.btn')
	if ( ctasQuemELiderDeMercado ) {
		ctasQuemELiderDeMercado.forEach( (cta) => {
			cta.addEventListener( 'click', () =>
				sendGA4({
					event: "page_click",
					click_text: slugify(cta.innerText),
					secao_pagina: "quem-e-lider-de-mercado",
					click_page_redirect: cta.href
				})
			);
		});
	}
}

// Artigos
const artigo = document.querySelector( '.question' );
if (artigo) {
	const continueText = 'Continue com a gente e saiba mais';
	const title = document.querySelector( '.question__banner-title' ).innerText;
	const pergutnasPath = artigo.querySelector( '.question__excerpt' );
	if (pergutnasPath) {
		const tags = pergutnasPath.getElementsByTagName('a');
		for (const element of tags) {
			const text = element.innerText.includes('http') ? continueText : element.innerText
			element.addEventListener( 'click', () =>
					sendGA4({
						event: "page_click",
						click_text: slugify(text),
						secao_pagina: slugify(title),
						click_page_redirect: element.href
					})
				);
		}
	}
}

// CTA Banner De Assessoria Contabil Gratuita
const ctaBannerAbrirEmpresa = document.querySelector( '.cta-sidebar__link' );
if ( ctaBannerAbrirEmpresa ) {
	ctaBannerAbrirEmpresa.addEventListener( 'click', () =>
		sendGA4({
			event: "page_click",
			click_text: slugify(ctaBannerAbrirEmpresa.innerText),
			secao_pagina: "ainda-com-duvidas-fale-com-uma-contadora",
			click_page_redirect: ctaBannerAbrirEmpresa.href
		})
	);
}

// Perguntas relacionadas
const perguntasRelacionadas = document.querySelector( '.related-questions' );
if ( perguntasRelacionadas ) {
	const perguntas = perguntasRelacionadas.querySelectorAll( '.related-questions__question__url' );
	perguntas.forEach( ( pergunta ) => {
		pergunta.addEventListener( 'click', () =>
			sendGA4({
				event: "page_click",
				click_text: slugify(pergunta.innerText),
				secao_pagina: "perguntas-relacionadas",
				click_page_redirect: pergunta.href
			})
		)
	});
}

// Destaques do blog
const destaquesDoBlog = document.querySelectorAll( '.blog-post' );
if ( destaquesDoBlog ) {
	destaquesDoBlog.forEach( ( destaque ) => {
		const text = destaque.querySelector( '.blog-post__title' ).innerText;
		const href = destaque.querySelector( '.blog-post__link' ).href;
		destaque.addEventListener( 'click', () =>
			sendGA4({
				event: "page_click",
				click_text: slugify(text),
				secao_pagina: "confira-destaques-do-nosso-blog",
				click_page_redirect: href
			})
		)
	});
}

// CTA De o primeior passo
const primeiroPasso = document.querySelectorAll( '.banner-hero__link' );
if (primeiroPasso) {
	primeiroPasso.forEach( (cta) => {
		cta.addEventListener( 'click', () =>
			sendGA4({
				event: "page_click",
				click_text: slugify(cta.innerText),
				secao_pagina: "de-o-primeiro-passo-e-para-os-proximos-conte-com-a-contabilizei",
				click_page_redirect: cta.href
			})
		);
	});
}

// CTA que abre a modal de Form faça sua pergunta
const nomeModal = "contabilizei-responde";
const ctaModal = document.querySelector( '.question-bar__cta' );
if (ctaModal) {
	ctaModal.addEventListener( 'click', () =>
		sendGA4({
			event: "form_view",
			nome_modal: nomeModal,
		})
	);
}

// CTA de envio do Form faça sua pergunta
const ctaEnvioModal = document.querySelector('#cf7-question .wpcf7-submit')
if (ctaEnvioModal) {
	ctaEnvioModal.addEventListener( 'click', () => {
		const email = document.querySelector('#cf7-question .wpcf7-email')

		sendGA4({
			event: "form_submission",
			nome_modal: nomeModal,
			is_test: isTestEmail(email.value),
		})
	});
}

// CTA de envio do Form faça sua pergunta
const ctaEnvioModalMobile = document.querySelector('#cf7-question-mobile .wpcf7-submit')
if (ctaEnvioModalMobile) {
	ctaEnvioModalMobile.addEventListener( 'click', () => {
		const email = document.querySelector('#cf7-question-mobile .wpcf7-email')

		sendGA4({
			event: "form_submission",
			nome_modal: nomeModal,
			is_test: isTestEmail(email.value),
		})
	});
}
