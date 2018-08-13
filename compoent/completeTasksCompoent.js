import { $, $$, createEl, prop, appendChild, appendChildR, children, addEvent, remove, removeChild, createFM } from '../lib/dom.js';
import { render } from '../lib/utils.js';
import { store } from '../store.js';
import { go, each, filter, reduce } from 'partial-js';
import { completeTasksCompoentTemplate } from './completeTasksCompoent.html.js';

export class CompleteTasksCompoent extends HTMLElement {

  constructor() { super(); }

  // 컴포넌트가 DOM에 연결되면 호출
  connectedCallback() {
    render(this, completeTasksCompoentTemplate);
    this.incompleteTasks$ = $('#incomplete-tasks', this.shadowRoot);
    this.sub = store.subscribe(this.obs);

  }

  // 컴포넌트가 DOM에서 제거되면 구독 해지
  disconnectedCallback() {
    this.sub.unsubcribe();
  }

  obs = (state) => {
    let { currentState } = state;
    this.removeLis();
    this.addTodoLists(currentState);
  };


  removeLis = () => {
    go(this.incompleteTasks$,
      removeChild
    );

  }

  addTodoLists(list) {
    go(list,
      this.createTodoList,
      this.appendLi
    );
  }

  appendLi = (fragment) => go(
    this.incompleteTasks$,
    appendChildR(fragment)
  );

  // DOM 생성시 documentFragment 먼저 생성후에 DOM append 시킴
  // createTodoList = (list) => reduce(list, (pri, cur) =>  appendChildR(this.createNewTodo(cur))(pri)
  //                                 , createFM());
  createTodoList = (list) => reduce(list,
    (pri, cur) => go(pri,
      appendChildR(this.createNewTodo(cur))
    ), createFM()
  );

  createNewTodo = (taskDesc) => go(
    createEl('new-task-componet'),
    prop('tododetail', taskDesc),
  );


}

customElements.define('complete-tasks-compoent', CompleteTasksCompoent);


