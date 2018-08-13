import './style.css';
import {
  $,
  $$,
  createEl,
  prop,
  appendChild,
  appendChildR,
  children,
  addEvent
} from './lib/dom.js';
import { each } from './lib/fp.js';
import { go } from 'partial-js';
import './compoent/addTodoCompoent.js';
import './compoent/completeTasksCompoent.js';
import './compoent/newTaskComponet.js'
