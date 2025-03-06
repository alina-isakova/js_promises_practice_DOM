'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((result) => addSuccessMessage(result))
  .catch((error) => addErrorMessage(error));

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('mousedown', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((result) => addSuccessMessage(result));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((result) => addSuccessMessage(result));

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
