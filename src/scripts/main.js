'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const resolveFirst = () => {
    resolve('First promise was resolved');
    document.body.removeEventListener('click', resolveFirst);
  };

  document.body.addEventListener('click', resolveFirst);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((result) => addSuccessMessage(result))
  .catch((error) => addErrorMessage(error));

const secondPromise = new Promise((resolve) => {
  const resolveSecond = () => {
    resolve('Second promise was resolved');
    document.body.removeEventListener('click', resolveSecond);
  };

  document.body.addEventListener('mousedown', resolveSecond);
});

secondPromise.then((result) => addSuccessMessage(result));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const resolveThird = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }

    document.body.removeEventListener('click', resolveThird);
  };

  document.body.addEventListener('mousedown', resolveThird);
});

thirdPromise.then((result) => addSuccessMessage(result));

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function addSuccessMessage(message) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="success" data-qa="notification">${message}</div>`,
  );
}

function addErrorMessage(message) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="error" data-qa="notification">${message}</div>`,
  );
}
