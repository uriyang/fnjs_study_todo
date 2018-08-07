import { $, $$, createEl, prop, appendChild, children, addEvent, parent, closet, toggleClass, hasClass, attr } from '../lib/dom.js';
import { store } from '../store.js';
import { go } from 'partial-js';

const template = document.createElement('template');
template.innerHTML =
  `<li>
			<input type="checkbox">
			<label></label>
			<input type="text">
			<button class="edit">Edit</button>
			<button class="delete">Delete</button>
		</li>
	`;

export class NewTaskComponet extends HTMLElement {


  constructor() {
    super();
    const root = this.appendChild(template.content.cloneNode(true));
    this.editTask = this.editTask.bind(this);

  }

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
    let label$ = $("label", this);
    let checkBox$ = $('input[type="checkbox"]', this);
    let editButton$ = $("button.edit", this);
    let deleteButton$ = $("button.delete", this);

    console.log('this.tododetail : ', this.tododetail);

    go(
      label$,
      prop('innerText', this.tododetail),
    );


    addEvent
      (checkBox$)
      ('click', this.checkedTask);

    addEvent
      (editButton$)
      ('click', this.editTask);

    addEvent
      (deleteButton$)
      ('click', this.deleteTask);

  }


  checkedTask() {
    console.log("checked Task...");
  }

  editTask() {
    console.log("Edit Task...");
    // console.log(this);

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
    let root = closet('new-task-componet', this);
    root.remove();
  }


}

customElements.define('new-task-componet', NewTaskComponet);

