import { partial } from 'partial-js';
import { curryr, reduce } from './fp.js';

// DOM 셀렉터 HELPER 함수로 모두 치환한다.

export const $ = (selector, context) => {
  return (arguments.length === 2) ? context.querySelector(selector) : document.querySelector(selector)
};
export const $$ = (selector) => document.querySelectorAll(selector);


// 긴 구문의 DOM 자체 함수를 모두 렙핑한다.
export const createEl = (elementName) => document.createElement(elementName);
export const createFM = (elementName) => document.createDocumentFragment(elementName);


export const prop = (propName, propValue) => {
  
  if (arguments.length === 2) {
    return (elment) => {
      elment[propName] = propValue; 
      return elment;
    }
  } else {
    return (elment) => elment[propName];
  }
};

export const attr = (propName, propValue) => (elment) => {
  elment.setAttribute(propName, propValue);
  return elment;


}

export const appendChild = (targetElmment, htmlElment) => {
  // XXX: 일단 추후에 다시 고민 
  targetElmment.appendChild(htmlElment);
  return targetElmment;
}
export const appendChildR = curryr(appendChild);
// console.log(appendChildR.toString());

export const children = (elment) => elment.children;

export const remove = (elment) => elment.remove();
export const removeChild = (elment) => {
    while (elment.firstChild){ 
      elment.removeChild(elment.firstChild); 
    }
};


export const parent = (elment) => elment.parentNode;

export const closet = (selector, elment) => {
  let elm = $(selector,elment);
  // console.log(elm);
  elm = (elm.nodeName === selector.toUpperCase()) ? elm : closet(selector, elm);
  return elm;
   
};

export const addEvent = (eventName, eventFn) => (element) => {

  element.addEventListener(eventName, eventFn);
  return element;
}

export const addEventR = curryr(( eventFn , eventName) => (element) => {
  element.addEventListener(eventName, eventFn);
  return element;
});

// export const onClick = ()=> go();

export const on = (eventName) => { };

export const bind = (context, fn) => {
  fn.bind(context)
  return fn;
};


export const toggleClass = (element, className) => element.classList.toggle(className);
export const hasClass = (element, className) => element.classList.contains(className);