const onReadyDatalayer = (next) => {
  const timeId = setInterval(() => {
    if (typeof dataLayer === 'undefined') {
      return;
    }

    clearInterval(timeId);
    next(dataLayer);
  }, 100);
}

const getUrlApiHubspot = () => {
  const isProd = window.location.host.includes('contabilizei.com.br');

  if (isProd) {
    return 'https://api.contabilizei.com.br/aqs/'
  }

  return 'https://api-dev.contabilizei.com.br/aqs/'
}

jQuery(document).ready(function ($) {
  // SMOOTH SCROLL
  jQuery('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = jQuery(this.hash);
      target = target.length ? target : jQuery(`[name='${this.hash.slice(1)}']`);
      if (target.length) {
        event.preventDefault();
        jQuery('html, body').animate(
          {
            scrollTop: target.offset().top - 100
          }, 1000, function () {
            var $target = jQuery(target);
            $target.focus();
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });

  // fixa o topo
  var vheightPass = false;
  jQuery(window).scroll(function () {
    var pdsize = jQuery('#mainNav').height() + 8;
    if (jQuery(this).scrollTop() >= 100 && !vheightPass) {
      jQuery('main.header-display').css('padding-top', pdsize + 'px');
      jQuery('#header').hide();
      jQuery('#header').addClass('fixed-top').fadeIn('fast');
      vheightPass = true;
    }
    if (jQuery(this).scrollTop() <= 0 && vheightPass) {
      jQuery('main.header-display').css('padding-top', '0');
      jQuery('#header').removeClass('fixed-top').css("display", "");
      vheightPass = false;
    }
  });

  $('.slick-dots li').html('<a href="#"><div class="slide-dot"></div></a>');
  $('.slick-dots li.slick-active').html('<a href="#"><div class="slide-dot"></div></a>');

  // Slider - Recursos
  $('.main-slide').each(function () {
    var slickInduvidual = $(this);
    slickInduvidual.slick({
      dots: true,
      autoplay: false,
      dotsClass: 'main-slide-dots',
      arrows: true,
      nextArrow: $('.slide-wrapper .next-slide'),
      prevArrow: $('.slide-wrapper .prev-slide')
    });
  });

  var phoneMask = '(00) 00000-0000';
  var spOptions = {
    onKeyPress: function (val, e, field, options) {
      field.mask(phoneMask, options);
    }
  };
  $('.phone, .cta-forms .wpcf7-tel').mask(phoneMask, spOptions);

  document.addEventListener('wpcf7mailsent', function () {
    setTimeout(function () {
      const el = document.getElementById('aviso-news-posts')
      const el2 = document.getElementById('aviso-material-baixado')

      if (el && el.style.display === 'block') {
        el.style.display = 'none'
      }
      if (el2 && el2.style.display === 'block') {
        el2.style.display = 'none'
      }
    }, 4000)
  }, false);



  $(document).ready(function () {
    $("#table-of-contents-list a").on('click', function (event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        window.location.hash = hash;
      }
    });
  });

  $(document).ready(function () {
    let lastActiveLink = null;

    function onScroll() {
      const scrollPosition = $(document).scrollTop();
      let activeLink = null;

      const tocLinks = $("#table-of-contents-list a");
      for (let i = 0; i < tocLinks.length / 2; i++) {
        const link = tocLinks[i];
        const section = $(link.getAttribute('href'));
        if (section.length && section.offset().top - 150 <= scrollPosition) {
          activeLink = i;
        }
      }

      if (activeLink !== lastActiveLink) {
        $(".list-group-item").removeClass('active');
        $(`.list-group-item-${activeLink}`).addClass('active');
        lastActiveLink = activeLink;
      }
    }

    $(window).on('scroll', onScroll);
    onScroll();
  });

  $(document).ready(function () {
    const noResultClass = '.no-result';

    $("#searchCNAE").on("keyup", function () {
      var value = $(this).val().toLowerCase();

      $("#tableCNAE tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });

      if ($("#tableCNAE tr").is(":visible") === 0) {
        $(noResultClass).show();
      } else {
        $(noResultClass).hide();
      }
    });

    $("#searchMEI").on("keyup", function () {
      var value = $(this).val().toLowerCase();

      $("#tableMEI tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });

      if ($("#tableMEI tr").is(":visible") === 0) {
        $(noResultClass).show();
      } else {
        $(noResultClass).hide();
      }
    });

    $("#searchSimplesNacional").on("keyup", function () {
      var value = $(this).val().toLowerCase();

      $("#tableSimplesNacional tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });

      if ($("#tableSimplesNacional tr").is(":visible") === 0) {
        $(noResultClass).show();
      } else {
        $(noResultClass).hide();
      }
    });

  });

  $(".clear").each(function () {
    const $search = $(this).find("input:text"),
      $clear = $(this).find(".btn_clear");

    $search.on("input", function () {
      $clear.toggle(!!this.value);
    });

    $clear.on("touchstart click", function (e) {
      e.preventDefault();
      $search.val("").keyup().trigger("input");
      $(".no-result").hide();
    });

  });

  $(".btn-scroll").click(
    function () {
      var tableScroll = $(".tabela > table");
      tableScroll.scrollLeft(tableScroll.scrollLeft() + 300);
    }
  );
});



jQuery(document).ready(function () {
  onReadyDatalayer((dataLayer) => {
    const currentPath = window.location.pathname.split('/').filter((e) => e).pop();

    const pathsActivity = {
      'servicos_de_ti': {
        eventlabel: 'pagina-segmentada-ti',
        paths: [
          'como-criar-um-nome-para-empresa-de-tecnologia',
          'mei-para-programador',
        ],
      },
      'educacao_cursos': {
        eventlabel: 'pagina-segmentada-educacao',
        paths: [
          'educacao-pos-pandemia-coronavirus',
          'personal-trainer-mei',
          'aulas-pela-internet',
          'como-abrir-uma-empresa-de-treinamentos',
          'treinamento-e-desenvolvimento-de-pessoas',
        ],
      },
    }

    Object.keys(pathsActivity).forEach(activity => {
      const { eventlabel, paths } = pathsActivity[activity];

      if (paths.includes(currentPath)) {
        const data = {
          event: 'nonInteractionCustomEvent',
          eventCategory: `blog:${currentPath}`,
          eventAction: 'visualizou',
          eventLabel: eventlabel,
        }

        dataLayer.push(data)
      }
    });
  });
});

(function () {
  document.querySelector('body').addEventListener('mouseleave', bindHashToForm)

  function bindHashToForm() {
    try {
      document.querySelector('[id^=leadinModal]').onclick = function () {
        document.querySelector('[id^=hsPopUpForm]').onsubmit = onSubmitHubspotForm
      }
    } catch (e) {
      return
    }
  }

  function onSubmitHubspotForm(e) {
    e.preventDefault()

    setTimeout(() => sendEvent(), 1000)

    const form = document.getElementsByClassName('leadin-form-wrapper')[0]

    const email = form.querySelector('[type="email"]').value
    const isZap = form.querySelector('.input-forma_de_contato_select').value.includes('whatsapp')

    if (!isZap) {
      return
    }

    sendInfoToSirena(email)
  }

  function sendEvent() {
    const form = document.querySelector('[id^=leadinModal]')
    const hasSubmitted = form.classList.contains('leadinModal-thanks')

    if (hasSubmitted) {
      const data = {
        event: 'InteractionEventUser',
        eventCategory: 'Blog | Formulários',
        eventAction: 'Envio de Formulários | Modal de Fuga',
        eventLabel: document.location.pathname
      }
      dataLayer.push(data)
    }
  }

  function sendInfoToSirena(email) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json;charset=UTF-8");
    myHeaders.append("origin", "https://www.contabilizei.com.br/contabilidade-online/");

    const isProd = window.location.host.includes('contabilizei.com.br');
    let url = '';
    if (isProd) {
      url = 'https://api.contabilizei.com.br/aqs/leads/hubspot/track-event'
    } else {
      url = 'https://api-dev.contabilizei.com.br/aqs/leads/hubspot/track-event'
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, evento: 'Modal de Fuga - Contato no WhatsApp' }),
      headers: myHeaders
    })
      .then(raw => raw.json())
      .then()
      .catch()
  }

}());

(function () {
  const formEmail = document.querySelectorAll('input[name="your-email"]')
  const formPhone = document.querySelectorAll('input[name="your-phone"]')
  const formSubmit = document.querySelectorAll('.cta-forms input[type="submit"]')
  const ctaForm = document.querySelectorAll('.cta-forms')

  document.addEventListener("DOMContentLoaded", function (event) {
    formSubmit.forEach((el) => {
      el.classList.add('disabled')
    })
  });


  let ListTlds;

  const templateUrl = absolute_path.templateUrl;

  fetch(`${templateUrl}/json/lista-tlds-validos.json`)
  .then(resp => resp.json())
  .then((json) => {
    ListTlds = json
  })

  function validateEmail(email) {
    const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (regexEmail.test(email)) {
      const lastTopDomain = email.split('@')[1].split('.').at(-1);
      return lastTopDomain ? ListTlds.includes(lastTopDomain.toUpperCase()) : false;
    }

    return false;
  }
  
  var dddList = ["11","12","13","14","15","16","17","18","19","21","22","24","27","28","31",
    "32","33","34","35","37","38","41","42","43","44","45","46","47","48","49","51","53","54","55",
    "61","62","63","64","65","66","67","68","69","71","73","74","75","77","79","81","82","83","84","85",
    "86","87","88","89","91","92","93","94","95","96","97","98","99"];

  var validatorsPhone = {
    length: (list) => list.length === 11,
    someNumbers: (list) => {
      return (
        !list.slice(2).every(n => n === list[2]) &&
        !list.slice(3).every(n => n === list[3])
      )
    },
    ddd: (list) => dddList.includes(list[0] + list[1]),
    numberNine: (list) => list[2] === '9',
  };

  function validatePhone(phone) {
    var numberSplited = phone.replace(/\D/g, '').split('');

    return (
      validatorsPhone.length(numberSplited) &&
      validatorsPhone.someNumbers(numberSplited) &&
      validatorsPhone.ddd(numberSplited) &&
      validatorsPhone.numberNine(numberSplited)
    );
  }

  function EventListener(input, attrInput, typeEvent, functionInput) {
    input.forEach((el, index) => {
      el.addEventListener(typeEvent, () => {
        const addClassField = document.querySelectorAll(`[name="${attrInput}"]`)
        const validFieldClass = 'valid-field'

        if (functionInput(el.value)) {
          addClassField[index].classList.add(validFieldClass)
          addClassField[index].classList.remove('invalid-field')
        } else {
          addClassField[index].classList.add('invalid-field')
          addClassField[index].classList.remove(validFieldClass)
        }
      });
    });
  }

  EventListener(formEmail, 'your-email', 'keyup', validateEmail)
  EventListener(formPhone, 'your-phone', 'keyup', validatePhone)

  ctaForm.forEach((el, index) => {
    el.addEventListener('change', onSubmit, false)
    el.addEventListener('keyup', onSubmit, false)

    function onSubmit() {
      if (
        validateEmail(formEmail[index].value) &&
        validatePhone(formPhone[index].value)
      ) {
        formSubmit[index].classList.remove('disabled')
      } else {
        formSubmit[index].classList.add('disabled')
      }
    }
  })

  const wpcf7Elm = document.querySelectorAll('.wpcf7')

  wpcf7Elm.forEach((el, index) => {
    wpcf7Elm[index].addEventListener('wpcf7mailsent', function (event) {
      const inputFields = wpcf7Elm[index].querySelectorAll('.wpcf7-form-control-wrap')
      const submitButton = wpcf7Elm[index].querySelector('.cta-forms input[type="submit"]')
      const successMessage = wpcf7Elm[index].querySelector('.aviso-obrigado')

      inputFields.forEach((element, i) => {
        inputFields[i].classList.remove('valid-field')
      });

      if (['26076', '26073', '26392'].includes(event.detail.contactFormId)) {
        successMessage.style.display = 'flex'
        setTimeout(function () {
          submitButton.classList.add('disabled')
          successMessage.style.display = 'none'
        }, 3000);
      }

    }, false);
  });
}());

(function () {
  document.querySelectorAll('#wtr-content a').forEach((el) => {
    if (el.innerText === 'abrir empresa') {
      el.classList.add('link-featured')
    }
  });
}());

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const recommendedItemHTML = document.querySelector('.recommended-categories .dropdown-item').outerHTML;
    const recommendedMenuHTML = document.querySelector('.recommended-categories .dropdown-menu').innerHTML;

    let HTMLmenu = '';
    HTMLmenu += `
      <div class="menu-cabecalho-menu-recommended-container d-none">
        <ul id="menu-cabecalho-menu-recommended" class="nav align-items-center flex-column flex-lg-row list-unstyled">
          <li class="back-item menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown nav-item show">
          <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" class="dropdown-toggle nav-link back-icon">
            <span itemprop="name">Voltar</span>
          </a>`;
    HTMLmenu += `<ul class="dropdown-menu show">`;
    HTMLmenu += `<li class="recommended-categories disabled-item">${recommendedItemHTML}</li>`;
    HTMLmenu += `${recommendedMenuHTML}`;
    HTMLmenu += `</ul></li></ul></div>`;

    const navWrapper = document.querySelector('#navbarMenu');
    navWrapper.innerHTML += HTMLmenu;

    const recommendedMenu = document.querySelector('.recommended-categories');
    const under1200width = window.innerWidth <= 1199;

    if(recommendedMenu && under1200width) {
      recommendedMenu.addEventListener('click', openRecommendedMenu);
    }
  });

  function openRecommendedMenu(event) {
    event.preventDefault();
    event.stopPropagation();

    const mainMenuHide = document.querySelector('.menu-cabecalho-menu-principal-container');
    const linksMenuHide = document.querySelector('.menu-cabecalho-menu-links-container');
    const socialMidiaHide = document.querySelector('.social-midia');
    const recommendedMenuShow = document.querySelector('.menu-cabecalho-menu-recommended-container');

    mainMenuHide.classList.add('d-none');
    linksMenuHide.classList.add('d-none');
    socialMidiaHide.classList.add('d-none');
    recommendedMenuShow.classList.remove('d-none');

    const backItem = document.querySelector('.back-item .dropdown-toggle');
    backItem.addEventListener('click', closeRecommendedMenu);
  }

  function closeRecommendedMenu(e) {
    e.preventDefault();
    e.stopPropagation();

    const mainMenuShow = document.querySelector('.menu-cabecalho-menu-principal-container');
    const linksMenuShow = document.querySelector('.menu-cabecalho-menu-links-container');
    const socialMidiaShow = document.querySelector('.social-midia');
    const recommendedMenuHide = document.querySelector('.menu-cabecalho-menu-recommended-container');

    mainMenuShow.classList.remove('d-none');
    linksMenuShow.classList.remove('d-none');
    socialMidiaShow.classList.remove('d-none');
    recommendedMenuHide.classList.add('d-none');
  }
}());

const FeatureFlagsService = (function () {
  let cachedFeatures = null;

  async function getFeatures() {
    if (cachedFeatures !== null) {
      return cachedFeatures;
    }

    try {
      const response = await fetch(`${getUrlApiHubspot()}feature-flags`);
      if (response.status !== 200) {
        throw new Error('Network response was not successful');
      }
      cachedFeatures = await response.json() ?? [];
      return cachedFeatures;
    } catch (error) {
      console.error('Error fetching features:', error);
      cachedFeatures = [];
      return cachedFeatures;
    }
  }

  return { getFeatures };
}());

(async function () {
  const features = await FeatureFlagsService.getFeatures();
  const seloRa1000 = document.querySelector('#selo-ra-1000');
  const isMobile = window.innerWidth <= 992;

  if (features.includes('site-ra-1000') && !isMobile) {
    seloRa1000.style.display = 'block';
  }
}());