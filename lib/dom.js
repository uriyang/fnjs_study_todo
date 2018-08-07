import { partial } from 'partial-js';
import { curryr, reduce } from './fp.js';

// DOM 셀렉터 HELPER 함수로 모두 치환한다.

export const $ = (selector, context) => {
  return (arguments.length === 2) ? context.querySelector(selector) : document.querySelector(selector)
};
export const $$ = (selector) => document.querySelectorAll(selector);


// 긴 구문의 DOM 자체 함수를 모두 렙핑한다.
export const createEl = (elementName) => document.createElement(elementName);

export const prop = (propName, propValue) => (elment) => {
  elment[propName] = propValue;
  return elment;
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

export const parent = (elment) => elment.parentNode;

export const closet = (selector, elment) => {
  let elm = parent(elment);
  elm = (elm.nodeName === selector.toUpperCase()) ? elm : closet(selector, elm);
  return elm;

};

export const addEvent = (element) => (eventName, eventFn) => {
  // console.log(element.addEventListener);
  return element.addEventListener(eventName, eventFn);
}

export const on = (eventName) => { };

export const toggleClass = (element, className) => element.classList.toggle(className);
export const hasClass = (element, className) => element.classList.contains(className);