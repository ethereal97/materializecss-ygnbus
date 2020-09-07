const app = {
  itemUsage: {
    total: 0,
    add(el) {
      this.total++;
      findElementOnDOM(el).textContent = this.total;
      return;
    },
    substract(el) {
      if (this.total > 0) {
        this.total--;
      }
      findElementOnDOM(el).textContent = this.total;
    }
  }
}

function findElementOnDOM(input) {
  if (typeof input === "string") {
    return document.querySelector(input);
  }
  if (input instanceof HTMLElement) {
    return input;
  }
  console.error('Unexcepted type of input element, excepted string or HTMLElement', typeof input);
  return false;
}

window.addEventListener('load', function () {
  ethereal.import('nav');
    
  //* initialized materialize-css
  if (typeof M === 'object') M.AutoInit();
});
