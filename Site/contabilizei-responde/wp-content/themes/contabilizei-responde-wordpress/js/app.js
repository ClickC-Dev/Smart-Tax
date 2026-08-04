const getMenuMobileOpen = document.querySelector( '.navbar-menu__toggle' );

getMenuMobileOpen.addEventListener( 'click', () => {
	if ( getMenuMobileOpen.classList.contains( 'collapsed' ) ) {
		document.body.classList.remove( 'overflow-hidden' );
	} else {
		document.body.classList.add( 'overflow-hidden' );
	}
} );

const fixedCta = document.querySelector( '#fixed-cta' );
const fixedCtaClose = document.querySelector( '#fixed-cta .fixed-cta__close' );
const TheHeader = document.querySelector( '#TheHeader' );
const TheMain = document.querySelector( 'main' );
const isMobile = window.navigator.userAgent.includes( 'Mobile' );
const loaderContainer = document.querySelector( '#loader-container' );
const searchBox = document.querySelector( '.header__search' );
const searchIconButton = document.querySelector( '.navbar-menu__search' );
const sortListButton = document.querySelector( '#questions-sort' );
const questionContainer = document.querySelector( '#questions-container' );
const searchBoxFocus = document.querySelector( '.header__search' );

let order = 'desc';

if ( fixedCta ) {
	fixedCta.style.transform = `translate(0px, -${ fixedCta.clientHeight }px)`;
	fixedCta.classList.add( 'd-none' );
}

const removeLoader = () => {
	setTimeout( () => {
		loaderContainer.classList.add( 'opacity-0' );
	}, 1000 );
};

const showLoader = () => {
	loaderContainer.classList.remove( 'opacity-0' );
	removeLoader();
};

const changeTextSortButton = ( text ) => {
	sortListButton.innerHTML = text;
};

const changeContentQuestionContainer = ( text ) => {
	questionContainer.innerHTML = text;
};

const headerShadowOnScroll = () => {
	if ( window.scrollY > 0 ) {
		TheHeader.classList.add( 'header__box-shadow' );
	} else {
		TheHeader.classList.remove( 'header__box-shadow' );
	}
};

const openCtaOnScroll = () => {
	if ( fixedCta ) {
		setTimeout( () => {
			TheHeader.style.transform = 'translate(0px, 129px)';
			fixedCta.style.transform = `translate(0px, 0px)`;
			fixedCta.classList.remove( 'd-none' );
			TheMain.style.paddingTop = `${ fixedCta.clientHeight + TheHeader.clientHeight }px`;
		}, 1000 );
	}
};

const handleCloseCta = () => {
	TheHeader.style.transform = `translate(0px, 0px)`;
	fixedCta.style.transform = `translate(0px, -${ fixedCta.clientHeight }px)`;
	TheMain.style.paddingTop = `${ TheHeader.clientHeight }px`;
};

const handleSortList = () => {
	var id = sortListButton.getAttribute('data-accountant');
	var accountantFilter = false;

	if (id) {
		accountantFilter = true;
	}

	if (sortListButton.innerHTML === 'Mais antigos') {
		order = 'desc';

		changeTextSortButton('Mais recentes');
		submitSortList(order, accountantFilter, id);
		showLoader();
	} else {
		order = 'asc';

		changeTextSortButton('Mais antigos');
		submitSortList(order, accountantFilter, id);
		showLoader();
	}
};

const submitSortList = (sort, filteredByAccountant, id = '') => {
	changeContentQuestionContainer('');

	const templateURL = absolute_path.templateUrl;
	const filter = filteredByAccountant ? 'accountant_filter' : 'myfilter';
	const request = new XMLHttpRequest();
	const data = `order=${sort}&id=${id}&action=${filter}`;
	const errorMessage = '<h5 class="text-center">Não foi possível carregar os dados. Tente novamente mais tarde.</h5>';

	request.open(
		'POST',
		`${templateURL}/wp-admin/admin-ajax.php`,
		true);

	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

	request.send(data);

	request.onload = function () {
		if (this.status >= 200 && this.status < 400) {
			changeContentQuestionContainer(this.response);
		} else {
			changeContentQuestionContainer(errorMessage);
		}
	};

	request.onerror = function () {
		changeContentQuestionContainer(errorMessage);
	};
};

const showSearchBar = () => {
	const boxShadowNavbar = document.querySelector( '.navbar' );
	searchBox.classList.toggle( 'd-none' );
	boxShadowNavbar.style.boxShadow = '0px 3px 8px -2px rgba(172, 199, 229, 0.25)';
};

const hideSearchBar = ( ) => {
	searchBox.classList.add( 'd-none' );
};

if ( fixedCta && isMobile ) {
	window.addEventListener( 'scroll', openCtaOnScroll, { once: true } );
}

if ( sortListButton ) {
	sortListButton.addEventListener( 'click', handleSortList );
}

if ( searchIconButton ) {
	searchIconButton.addEventListener( 'click', showSearchBar );
}

if ( searchBoxFocus ) {
	searchBoxFocus.addEventListener( 'mouseleave', hideSearchBar );
}

if ( fixedCtaClose ) {
	fixedCtaClose.addEventListener( 'click', handleCloseCta );
}

window.addEventListener( 'scroll', headerShadowOnScroll );

const customerReview = document.querySelector( '.customer-review' );
const customerReviewButton = document.querySelectorAll( '.customer-review__button' );

if ( customerReview ) {
	customerReviewButton.forEach( ( button ) => {
		button.addEventListener( 'click', () => {
			const hideButtons = document.querySelector( '.customer-review__buttons' );
			const title = document.querySelector( '.customer-review__title' );

			hideButtons.outerHTML = '';
			title.innerHTML = 'Obrigado por avaliar!';
		}, { once: true } );
	} );
}
