const validationRules = {
  'your-name': function (text) {
    const regex = /^[a-z A-Z]{6,}$/;
    return regex.test(text) && text
      .trim()
      .split(' ')
      .length > 1;
  },
  'your-email': function (text) {
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return regex.test(text);
  },
  'your-message': function (text) {
    const regex = /^(.+){12,}$/;
    return regex.test(text);
  },
}

const data = {
  valid: 'data-valid',
  disabled: 'data-disabled',
}

class Form {
  constructor({ id, feedback: { toHide, success, fail } }) {
    try {
      this.form = document.getElementById(id);
      this.feedback = {
        toHide: document.querySelector(toHide),
        success: document.querySelector(success),
        fail: document.querySelector(fail),
      }
    } catch (error) {
      console.warn('Make sure that you fill "ID" and "Feedback" parameters on Form instance declaration.', error);
    }
  }

  initInputs() {
    this.inputs = [...this.form.querySelectorAll('input, textarea')];
    this.inputs = this.inputs.filter(item => item.className.includes('validates-as-required'));
  }

  initButton() {
    this.button = this.form.querySelector('[type="submit"]');
    this.button.setAttribute(data.disabled, true);
    this.button.addEventListener('click', () => document.dispatchEvent(this.events.trigger));
  }

  initEvents() {
    this.events = {
      trigger: new CustomEvent('wpcf7trigger'),
      reset: new CustomEvent('wpcf7formreset'),
    }
    window.formEvents = this.events;
  }

  initForm() {
    document.addEventListener('wpcf7formreset', () => {
      this.resetForm();
    });
    document.addEventListener('wpcf7trigger', () => {
      this.defineLoadingState(true);
    });
    document.addEventListener('wpcf7mailsent', () => {
      this.defineFeedbackState(true);
    });
    document.addEventListener('wpcf7mailfailed', () => {
      this.defineFeedbackState(false);
    });
  }

  defineInputsValidation() {
    this.inputs.forEach(input => {
      input.addEventListener('blur', () => {
        input.value = input.value.trim();
      });
      validationRules[input.name] && input.addEventListener('input', () => {
        input.setAttribute(data.valid, validationRules[input.name](input.value));
        input.parentElement.setAttribute(data.valid, validationRules[input.name](input.value));
        this.button.setAttribute(data.disabled, !this.validateForm());
      });
    });
  }

  defineFeedbackState(mailSent) {
    this.defineLoadingState(false);
    this.feedback.toHide.classList.add('d-none');
    if (mailSent) {
      this.feedback.success.classList.remove('d-none');
    } else {
      this.feedback.fail.classList.remove('d-none');
    }
  }

  defineLoadingState(isLoading) {
    this.button.setAttribute(data.disabled, isLoading);
    this.button.value = isLoading ? 'Enviando...' : 'Enviar pergunta';
  }

  resetForm() {
    this.feedback.fail.classList.add('d-none');
    this.feedback.success.classList.add('d-none');
    this.feedback.toHide.classList.remove('d-none');
    this.button.setAttribute(data.disabled, true);
    this.inputs.forEach(input => {
      input.setAttribute(data.valid, '');
      input.parentElement.setAttribute(data.valid, '');
      input.value = '';
    })
  }

  validateForm() {
    return Array.from(this.inputs).every(elemento => elemento.getAttribute(data.valid) === 'true');
  }

  init() {
    this.initForm();
    this.initEvents();
    this.initInputs();
    this.initButton();
    this.defineInputsValidation();
  }
}

if (document.getElementById('cf7-question')) {
  new Form({
    id: 'cf7-question',
    feedback: {
      toHide: '#form-row',
      success: '#feedback-s-row',
      fail: '#feedback-f-row',
    }
  }).init();
}

if (document.getElementById('cf7-question-mobile')) {
  new Form({
    id: 'cf7-question-mobile',
    feedback: {
      toHide: '#question-form-row',
      success: '#question-feedback-m-s',
      fail: '#question-feedback-m-f',
    }
  }).init();
}
