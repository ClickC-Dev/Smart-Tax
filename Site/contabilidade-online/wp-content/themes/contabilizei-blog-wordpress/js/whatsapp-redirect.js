(function () {
  'use strict';

  const DEFAULT_WABA_CONFIG = {
    phone: '554199000198',
    text: '',
    queryParams: {}
  };

  const CONTACT_FORM_ID = '26392';
  const PHONE_REGEX = /^\d{8,15}$/;

  let wabaConfig = DEFAULT_WABA_CONFIG;

  const parseWabaFlag = (flags) => {
    if (!Array.isArray(flags)) {
        return null;
    }

    const wabaFlag = flags.find(flag => typeof flag === 'string' && flag.startsWith('whatsapp-number'));

    if (!wabaFlag) {
        return null;
    }

    const config = { phone: '', text: '', queryParams: {} };
    const params = wabaFlag.replace(/^whatsapp-number;?/, '').split(';').filter(Boolean);

    params.forEach(param => {
      const [key, ...rest] = param.split('=');
      const value = rest.join('=').trim();

      if (!key || !value) {
        return;
      }

      if (key === 'phone' && PHONE_REGEX.test(value)) {
        config.phone = value;
      } else if (key === 'text') {
        config.text = value;
      } else {
        config.queryParams[key] = value;
      }
    });

    return config.phone ? config : null;
  };

  const buildWhatsappUrl = (config) => {
    const phone = config?.phone || DEFAULT_WABA_CONFIG.phone;
    const baseUrl = `https://wa.me/${phone}`;

    const params = new URLSearchParams();

    if (config?.text) {
      params.append('text', config.text);
    }

    if (config?.queryParams) {
      Object.entries(config.queryParams).forEach(([key, value]) => {
        if (key && value) {
          params.append(key, value);
        }
      });
    }

    const query = params.toString();
    return query ? `${baseUrl}?${query}` : baseUrl;
  };

  document.addEventListener('wpcf7mailsent', (event) => {
    if (String(event.detail?.contactFormId) !== CONTACT_FORM_ID) {
      return;
    }

    const successMessage = event.target?.querySelector('.aviso-obrigado')
      || document.querySelector('.aviso-obrigado');

    if (successMessage) {
      successMessage.style.display = 'flex';
    }

    window.open(buildWhatsappUrl(wabaConfig), '_blank', 'noopener,noreferrer');
  });

  (async () => {
    if (typeof FeatureFlagsService === 'undefined') {
      return;
    }

    try {
      const features = await FeatureFlagsService.getFeatures();
      const parsed = parseWabaFlag(features);
      if (parsed) {
        wabaConfig = parsed;
      }
    } catch (error) {
      console.error('Erro ao carregar feature flags:', error);
    }
  })();
}());
