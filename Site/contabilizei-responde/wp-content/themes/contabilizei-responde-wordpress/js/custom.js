const getUrlApiHubspot = () => {
  const isProd = window.location.host.includes( 'contabilizei.com.br' );

  if ( isProd ) {
    return 'https://api.contabilizei.com.br/aqs';
  }

  return 'https://api-dev.contabilizei.com.br/aqs';
}
( function() {
	const formEmail = document.querySelectorAll( 'input[name="your-email"]' );
	const formPhone = document.querySelectorAll( 'input[name="your-phone"]' );
	const formSubmit = document.querySelectorAll( '.cta-forms input[type="submit"]' );
	const ctaForm = document.querySelectorAll( '.cta-forms' );

	// recupera tlds validos de emails
	let ListTlds;
	const templateUrl = absolute_path.templateUrl;
	fetch( `${ templateUrl }/json/lista-tlds-validos.json` )
		.then( ( resp ) => resp.json() )
		.then( ( json ) => {
			ListTlds = json;
		} );

	document.addEventListener( 'DOMContentLoaded', function() {
		formSubmit.forEach( ( el ) => {
			el.classList.add( 'disabled' );
		} );
	} );

	function validateEmail( email ) {
		const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if ( regexEmail.test( email ) ) {
			const lastTopDomain = email.split( '@' )[ 1 ].split( '.' ).at( -1 );
			return lastTopDomain ? ListTlds.includes( lastTopDomain.toUpperCase() ) : false;
		}

		return false;
	}

	function validatePhone( phone ) {
		const dddList = [ '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28', '31',
			'32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49', '51', '53', '54', '55',
			'61', '62', '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85',
			'86', '87', '88', '89', '91', '92', '93', '94', '95', '96', '97', '98', '99' ];

		const validatorsPhone = {
			length: ( list ) => list.length === 11,
			someNumbers: ( list ) => {
				return (
					! list.slice( 2 ).every( ( n ) => n === list[ 2 ] ) &&
					! list.slice( 3 ).every( ( n ) => n === list[ 3 ] )
				);
			},
			ddd: ( list ) => dddList.includes( list[ 0 ] + list[ 1 ] ),
			numberNine: ( list ) => list[ 2 ] === '9',
		};
		const numberSplited = phone.replace( /\D/g, '' ).split( '' );

		return (
			validatorsPhone.length( numberSplited ) &&
			validatorsPhone.someNumbers( numberSplited ) &&
			validatorsPhone.ddd( numberSplited ) &&
			validatorsPhone.numberNine( numberSplited )
		);
	}

	function EventListener( input, attrInput, typeEvent, functionInput ) {
		input.forEach( ( el, index ) => {
			el.addEventListener( typeEvent, () => {
				const addClassField = document.querySelectorAll( `[name="${ attrInput }"]` );
				const validFieldClass = 'valid-field';

				if ( functionInput( el.value ) ) {
					addClassField[ index ].classList.add( validFieldClass );
					addClassField[ index ].classList.remove( 'invalid-field' );
				} else {
					addClassField[ index ].classList.add( 'invalid-field' );
					addClassField[ index ].classList.remove( validFieldClass );
				}
			} );
		} );
	}

	EventListener( formEmail, 'your-email', 'keyup', validateEmail );
	EventListener( formPhone, 'your-phone', 'keyup', validatePhone );

	ctaForm.forEach( ( el, index ) => {
		el.addEventListener( 'change', onSubmit, false );
		el.addEventListener( 'keyup', onSubmit, false );

		function onSubmit() {
			if (
				validateEmail( formEmail[ index ].value ) &&
				validatePhone( formPhone[ index ].value )
			) {
				formSubmit[ index ].classList.remove( 'disabled' );
			} else {
				formSubmit[ index ].classList.add( 'disabled' );
			}
		}
	} );

	const wpcf7Elm = document.querySelectorAll( '.wpcf7' );

	wpcf7Elm.forEach( ( el, index ) => {
		if ( wpcf7Elm[ index ] ) {
			wpcf7Elm[ index ].addEventListener( 'wpcf7mailsent', function( event ) {
				const inputFields = wpcf7Elm[ index ].querySelectorAll( '.wpcf7-form-control-wrap' );
				const submitButton = wpcf7Elm[ index ].querySelector( '.cta-forms input[type="submit"]' );
				const successMessage = wpcf7Elm[ index ].querySelector( '.aviso-obrigado' );

				inputFields.forEach( ( element, i ) => {
					inputFields[ i ].classList.remove( 'valid-field' );
				} );

				if ( [ 611, 619, 1618 ].includes( event.detail.contactFormId ) ) {
					successMessage.style.display = 'flex';
					setTimeout( function() {
						submitButton.classList.add( 'disabled' );
						successMessage.style.display = 'none';
					}, 3000 );
				}
			}, false );
		}
	} );

	jQuery( document ).ready( function( $ ) {
		const phoneMask = '(00) 00000-0000';
		const spOptions = {
			onKeyPress: ( val, e, field, options ) => field.mask( phoneMask, options ),
		};
		$( '.phone, .cta-forms .wpcf7-tel' ).mask( phoneMask, spOptions );
	} );
}() );

(async function () {
	async function getFeatures() {
		try {
			const response = await fetch( `${getUrlApiHubspot()}/feature-flags` );
			if ( response.status !== 200 ) {
				throw new Error( 'Network response was not successful' );
			}
			const data = await response.json();
			return data ?? [];
		} catch {
			return [];
		}
	}

	const seloRa1000 = document.querySelector( '#selo-ra-1000' );
	const features = await getFeatures();
	const isMobile = window.innerWidth <= 992;

	if ( features.includes( 'site-ra-1000' ) && !isMobile ) {
		seloRa1000.style.display = 'block';
	}
}() );
