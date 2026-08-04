/* global dataLayer */

function sendEvent( eventCategory, eventAction, eventLabel ) {
	const data = {
		event: 'customEvent',
		eventCategory,
		eventAction,
		eventLabel: slug( eventLabel ),
	};
	dataLayer.push( data );
}

function removeAccents( text ) {
	return text.normalize( 'NFD' ).replace( /[\u0300-\u036f]/g, '' );
}

function slug( text ) {
	return removeAccents( text )
		.toLowerCase()
		.replace( /[^a-z0-9:]+/g, '-' )
		.replace( /(^-|-$)+/g, '' );
}

const defaultEventCategory = 'site:contabilizei-responde';
const defaultHomeEventCategory = 'site:home-contabilizei-responde';
const headerEventAction = 'click:cabecalho';

// Menu Header
const menuHeaderLinks = document.querySelectorAll( '#menu-menu-principal .nav-item a' );
if ( menuHeaderLinks ) {
	menuHeaderLinks.forEach( ( link ) => {
		if ( link.href.includes( '#' ) ) {
			return;
		}

		link.addEventListener( 'click', ( ) => {
			const listClassNames = link.className.split( ' ' );
			const onlyClassHasUnderline = listClassNames.filter( ( item ) => item.includes( '_' ) );
			const parentMenu = onlyClassHasUnderline[ 0 ].split( '_' ).pop();

			const label = `${ parentMenu }-${ link.innerText }`;
			sendEvent( defaultEventCategory, headerEventAction, label );
		} );
	} );
}

// Abrir Empresa Link
const abrirEmpresaButton = document.querySelector( '#menu-menu-login .btn-primary a' );
if ( abrirEmpresaButton ) {
	abrirEmpresaButton.addEventListener( 'click', () => sendEvent( defaultEventCategory, headerEventAction, abrirEmpresaButton.innerText ) );
}

// Trocar de Contador Link
const trocarContadorButton = document.querySelector( '#menu-menu-login .btn-secondary a' );
if ( trocarContadorButton ) {
	trocarContadorButton.addEventListener( 'click', () => sendEvent( defaultEventCategory, headerEventAction, trocarContadorButton.innerText ) );
}

// CTA Sidebar
const ctaSidebarButton = document.querySelector( '.cta-sidebar__link' );
if ( ctaSidebarButton ) {
	const textContent = ctaSidebarButton.innerText;
	ctaSidebarButton.addEventListener( 'click', () => sendEvent( defaultEventCategory, 'click:banner-lateral', textContent ) );
}

// CTA Todas as perguntas Home
const ctaAllQuestions = document.querySelector( '.questions-home .btn--primary' );
if ( ctaAllQuestions ) {
	const textContent = ctaAllQuestions.innerText;
	ctaAllQuestions.addEventListener( 'click', () => sendEvent( defaultHomeEventCategory, 'click:perguntas-frequentes', textContent ) );
}

// CTA Abra sua empresa Home
const ctaOpenYourBusiness = document.querySelectorAll( '.solutions .btn--primary' );
if ( ctaOpenYourBusiness ) {
	ctaOpenYourBusiness.forEach( ( link ) => {
		link.addEventListener( 'click', () => sendEvent( defaultHomeEventCategory, 'click:links-internos', link.innerText ) );
	} );
}

// Ctas Avaliacao Section
const ctasAvaliationSection = document.querySelectorAll( '.avaliacao-contabilizei__ctas .btn' );
if ( ctasAvaliationSection ) {
	ctasAvaliationSection.forEach( ( link ) => {
		link.addEventListener( 'click', () => sendEvent( defaultHomeEventCategory, 'click:abra-sua-empresa', link.innerText ) );
	} );
}

// Questions Article
const questionsArticleContentLinks = document.querySelectorAll( '.question__article .question__excerpt a' );
if ( questionsArticleContentLinks ) {
	questionsArticleContentLinks.forEach( ( link ) => {
		link.addEventListener( 'click', () => sendEvent( defaultEventCategory, 'click:links-internos', link.innerText ) );
	} );
}

// Reviews Button
const reviewsButton = document.querySelectorAll( '.customer-review__button' );
if ( reviewsButton ) {
	reviewsButton.forEach( ( button ) => {
		button.addEventListener( 'click', () => sendEvent( defaultEventCategory, 'click:resposta-foi-util', button.innerText ) );
	} );
}

// Related Questions
const relatedQuestionsArticles = document.querySelectorAll( '.related-questions .col-md-3' );
if ( relatedQuestionsArticles ) {
	relatedQuestionsArticles.forEach( ( article, index ) => {
		const articlePosition = index + 1;
		const articleLink = article.querySelector( '.related-questions__question__link' );
		const pathName = article.querySelector( '.related-questions__question__title' ).innerText;
		const label = `artigo-${ articlePosition }:${ pathName }`;
		articleLink.addEventListener( 'click', () => sendEvent( defaultEventCategory, 'click:perguntas-relacionadas', label ) );
	} );
}

// Blog Post Home
const blogPostHome = document.querySelectorAll( '.questions-home__card' );
if ( blogPostHome ) {
	blogPostHome.forEach( ( post ) => {
		const pathName = post.querySelector( '.questions-home__card__title' ).innerText;
		const label = `${ pathName }`;
		post.addEventListener( 'click', () => sendEvent( defaultHomeEventCategory, 'click:perguntas-frequentes', label ) );
	} );
}

// Featured Blog Posts
const blogPosts = document.querySelectorAll( '.blog-posts .col-md-4' );
if ( blogPosts ) {
	blogPosts.forEach( ( post, index ) => {
		const postPosition = index + 1;
		const articleLink = post.querySelector( '.blog-post__link' );
		const articleLinkSplit = articleLink.href.split( '/' );
		const pathName = articleLinkSplit[ articleLinkSplit.length - 2 ];
		const label = `artigo-${ postPosition }:${ pathName }`;
		articleLink.addEventListener( 'click', () => sendEvent( defaultEventCategory, 'click:destaques-blog', label ) );
	} );
}

// Super Banner Footer
const superBannerFooter = document.querySelectorAll( '.banner-hero' );
if ( superBannerFooter ) {
	const bannerButtons = document.querySelectorAll( '.banner-hero__link' );
	bannerButtons.forEach( ( button ) => {
		button.addEventListener( 'click', () => sendEvent( defaultEventCategory, 'click:cta-superbanner-rodape', button.innerText ) );
	} );
}

// Accountant Questions Link
const accountantQuestionsLink = document.querySelectorAll( '.accountant-questions__linkcard' );
if ( accountantQuestionsLink ) {
	accountantQuestionsLink.forEach( ( item ) => {
		const author = slug( item.getAttribute( 'data-author' ) );
		const category = 'site:autores-contabilizei-responde';
		const action = `click:perguntas-${author}`;
		const label = item.getAttribute( 'data-question' ).replaceAll( ':', '' );

		item.addEventListener( 'click', () => sendEvent( category, action, label ) );
	} );
}

// Reasons Contabilizei CTA
const reasonsContabilizeiCta = document.querySelectorAll('.ga-dobra-reasons');
if (reasonsContabilizeiCta) {
	reasonsContabilizeiCta.forEach((item) => {
		const category = defaultHomeEventCategory;
		const action = `click:links-internos`;
		const label = item.innerText;
		item.addEventListener('click', () => {
			sendEvent(category, action, label);
		});
	});
}

// Question Bar CTA
const questionBarCta = document.querySelectorAll('.question-bar__cta');
if (questionBarCta) {
	questionBarCta.forEach((item) => {
		const category = `site:contabilizei-responde`;
		const action = `click:barra-pergunta`;
		const label = item.innerText;
		item.addEventListener('click', () => {
			sendEvent(category, action, label);
		});
	});
}

// Form Submit Button
const formSubmitButton = document.querySelectorAll('.wpcf7-submit');
if (formSubmitButton) {
	formSubmitButton.forEach((item) => {
		const category = `site:contabilizei-responde`;
		const action = `click:form`;
		const label = item.value;
		item.addEventListener('click', () => {
			sendEvent(category, action, label);
		});
	});
}

// Form required inputs
const formRequiredInput = document.querySelectorAll('.wpcf7-validates-as-required');
if (formRequiredInput) {
	formRequiredInput.forEach((item) => {
		const category = `site:contabilizei-responde`;
		const action = `preencheu:form-pergunta`;
		const label = item.name.replace('your-', '');
		item.addEventListener('blur', () => {
			if (item.getAttribute('data-valid') === 'true') {
				sendEvent(category, action, label);
			}
		});
	});
}
