import { $, $$, createEl, prop, appendChild, children, addEvent, parent, closet, toggleClass, hasClass, attr } from '../lib/dom.js';
import { store } from '../store.js';
import { renderEl } from '../lib/utils.js';
import { go } from 'partial-js';
import { newTaskComponetTemplate } from './newTaskComponet.html.js';

export class NewTaskComponet extends HTMLElement {


  constructor() { super(); }

  get todoDetail() {
    return this.getAttribute('tododetail');
  }

  set todoDetail(value) {
    console.log('tododetail ::', value);
    this.setAttribute('tododetail', value);
  }


  static get observedAttributes() {
    return ["tododetail"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('name, oldValue, newValue', name, oldValue, newValue);
  }

  connectedCallback() {
    renderEl(this, newTaskComponetTemplate);

    let label$ = $("label", this);
    let checkBox$ = $('input[type="checkbox"]', this);
    let editButton$ = $("button.edit", this);
    let deleteButton$ = $("button.delete", this);

    prop('innerText', this.tododetail)
      (label$);

    addEvent('click', () => this.checkedTask())
      (checkBox$);

    addEvent('click', () => this.editTask())
      (editButton$);

    addEvent('click', () => this.deleteTask())
      (deleteButton$);
   
  }


  checkedTask() {
    console.log("checked Task...");
  }

  editTask() {
    console.log("Edit Task...");
    
    let listItem = $('li', this);
    let editInput$ = $('input[type=text]', listItem);
    let label$ = $('label', listItem);

    let containsClass = hasClass(listItem, 'editMode');
    
    if (containsClass) {
      this.todoDetail = editInput$.value;
      label$.innerText = editInput$.value;
    } else {
      editInput$.value = label$.innerText;
    }

    toggleClass(listItem, 'editMode');

  }

  deleteTask() {
    console.log("delete Task...");
    this.remove();
  }


}

customElements.define('new-task-componet', NewTaskComponet);

