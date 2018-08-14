import { $, $$, createEl, prop, appendChild, appendChildR, children, addEvent , addEventR } from '../lib/dom.js';
import { go, each, filter } from 'partial-js';
import { render, clearVal } from '../lib/utils.js';
import { store } from '../store.js';
import { addTodo } from '../actions/actions.js';
import { addTodoCompoentTemplate } from './addTodoCompoent.html.js';

export class AddTodoCompoent extends HTMLElement {

  constructor() { super(); }

  connectedCallback() {
    render(this, addTodoCompoentTemplate);

    this.$newTaskElm = $('#new-task', this.shadowRoot);
    this.$addBtn = $('#add-btn', this.shadowRoot);
    

    // go ( this.$addBtn  ,
    //            onClick , 
    // () => this.addNewTodo() )
    go( this.$addBtn ,
        addEvent('click', () => this.addNewTodo() )
    );

  }

  addNewTodo() {

    go(this.$newTaskElm,
      prop('value'),
      addTodo,
      store.dispatch
    );

    clearVal(this.$newTaskElm);
  }

}

customElements.define('add-todo', AddTodoCompoent);

