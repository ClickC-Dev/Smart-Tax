const commentForm = document.getElementById('commentform');

const commentField = document.getElementById('comment');
const authorField = document.getElementById('author');
const emailField = document.getElementById('email');

const commentContent = document.getElementsByClassName('comment-form-comment')[0];
const authorContent = document.getElementsByClassName('comment-form-author')[0];
const emailContent = document.getElementsByClassName('comment-form-email')[0];

function cleanStyle() {
  commentContent.style.color = 'black';
  commentField.style.borderColor = 'black';
  if(authorContent) {
    authorContent.style.color = 'black';
  }
  if(authorField) {
    authorField.style.borderColor = 'black';
  }
  if(emailContent) {
    emailContent.style.color = 'black';
  }
  if(emailField) {
    emailField.style.borderColor = 'black';
  }
}

function styleInputError(form, field) {
  cleanStyle();
  form.style.color = 'red';
  field.style.borderColor = 'red';
}

function displayCustomError(errorContent, message) {
  if (errorContent) {
    errorContent.textContent = message;
  } else {
    const spanError = document.createElement('span');
    spanError.setAttribute('class', 'comment-error');
    spanError.setAttribute('id', 'comment-form-error');
    spanError.textContent = message;
    commentContent.appendChild(spanError);
  }
}

// Minimum time between send comment
function verifyTimeout() {
  const timeout = 15;
  const timestamp = new Date().getTime();
  const lastCommentTime = parseInt(localStorage.getItem('last_comment_time'));
  return !(lastCommentTime > 0 && timestamp - lastCommentTime < timeout * 1000);
}

commentForm && commentForm.addEventListener('submit', (event) => {
  const loggedInAs = document.getElementsByClassName('logged-in-as');
  const commentFormError = document.getElementById('comment-form-error');
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

  if (!verifyTimeout()) {
    event.preventDefault();
    displayCustomError(commentFormError, 'Por favor, aguarde. Você está enviando comentários muito rápido.');
    return;
  }

  if (loggedInAs.length === 0) {
    if (authorField.value === '') {
      event.preventDefault();
      styleInputError(authorContent, authorField);
      commentFormError.textContent = 'Por favor, preencha o seu nome.';
      return;
    }

    if (commentField.value === '') {
      event.preventDefault();
      styleInputError(commentContent, commentField);
      commentFormError.textContent = 'Por favor, escreva o comentário.';
      return;
    }

    if (emailField.value !== '' && !regex.test(emailField.value)) {
      event.preventDefault();
      styleInputError(emailContent, emailField);
      commentFormError.textContent = 'Por favor, preencha com e-mail válido.';
      return;
    }
  } else {
    if (commentField.value === '') {
      event.preventDefault();
      styleInputError(commentContent, commentField);
      displayCustomError(commentFormError, 'Por favor, escreva o comentário.');
      return;
    }
  }

  localStorage.setItem('last_comment_time', new Date().getTime());
});
