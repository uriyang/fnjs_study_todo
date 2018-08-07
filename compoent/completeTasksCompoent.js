import { $, $$, createEl, prop, appendChild, appendChildR, children, addEvent } from '../lib/dom.js';
import { store } from '../store.js';
import { go, each } from 'partial-js';

export const template = createEl('template');
template.innerHTML = `
		<style>
			ul {
				margin: 0;
				padding: 0;
			}

			li * {
				float: left;
			}

			li,
			h3 {
				clear: both;
				list-style: none;
			}

			input,
			button {
				outline: none;
			}

			button {
				background: none;
				border: 0px;
				color: #888;
				font-size: 15px;
				width: 60px;
				margin: 10px 0 0;
				font-family: Lato, sans-serif;
				cursor: pointer;
			}

			button:hover {
				color: #333;
			}
			/* Heading */

			h3,
			label[for='new-task'] {
				color: #333;
				font-weight: 700;
				font-size: 15px;
				border-bottom: 2px solid #333;
				padding: 30px 0 10px;
				margin: 0;
				text-transform: uppercase;
			}

			input[type="text"] {
				margin: 0;
				font-size: 18px;
				line-height: 18px;
				height: 18px;
				padding: 10px;
				border: 1px solid #ddd;
				background: #fff;
				border-radius: 6px;
				font-family: Lato, sans-serif;
				color: #888;
			}
			/* Task list */

			li {
				overflow: hidden;
				padding: 20px 0;
				border-bottom: 1px solid #eee;
			}

			li>input[type="checkbox"] {
				margin: 0 10px;
				position: relative;
				top: 15px;
			}

			li>label {
				font-size: 18px;
				line-height: 40px;
				width: 237px;
				padding: 0 0 0 11px;
			}

			li>input[type="text"] {
				width: 226px;
			}

			li>.delete:hover {
				color: #CF2323;
			}
			/* Completed */

			#completed-tasks label {
				text-decoration: line-through;
				color: #888;
			}
			/* Edit Task */

			ul li input[type=text] {
				display: none;
			}

			ul li.editMode input[type=text] {
				display: block;
			}

			ul li.editMode label {
				display: none;
			}
		</style>
		<h3>Todo</h3>
		<ul id="incomplete-tasks">
		</ul>
`;


export class CompleteTasksCompoent extends HTMLElement {



  get todoLists() {
    return this.getAttribute('todolists');
  }

  set todoLists(value) {
    // console.log('tododetail ::', value);
    this.setAttribute('todolists', value);
  }

  static get observedAttributes() {
    return ["todolists"];
  }

  constructor() {
    super();
    //const template = $('#completeTasksCompoent').content;
    const shadowRoot = this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true));
    this.todoLists = [];

    // store.subscribe(({currentState}) => { this.todoLists =            // currentState;});

  }

  connectedCallback() {
    console.log('this.todoLists', );


  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'todolists') {
      console.log('name, oldValue, newValue', newValue.split(','));
      //this.addTodoLists(newValue.split(','));
    }
  }

  addTodoLists(list) {
    each(list, (task) => this.createNewTodo(task));
  }

  createNewTodo(taskString) {
    const incompleteTask = go(
      createEl('new-task-componet'),
      prop('tododetail', taskString),
    );
    //console.log($('#incomplete-tasks', this.shadowRoot));
    appendChild($('#incomplete-tasks', this.shadowRoot)
      , incompleteTask);
  }


}

customElements.define('complete-tasks-compoent', CompleteTasksCompoent);

