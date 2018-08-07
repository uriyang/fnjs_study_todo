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





// // XXX : 전역 변수는 안 쓰는게 맞겠다....
// let taskInput = $("#new-task"); // new-task
// let addButton = $("#add-btn");//first button
// let incompleteTasksHolder = $('#incomplete-tasks'); //incomplete-tasks
// let completedTasksHolder = $('#completed-tasks'); //completed-tasks

// //Add a new task
// // addTask -> 새로운 TASK 만들고 -> DOM -> 이벤트 걸고 -> 상태 초기화
// // addItem 컴포넌트 -> input => btn
// let addTask = function () {
//   console.log("Add Task...");
//   // ADD버튼의 클릭이 이벤트후에 현재 input 값을 전달할 중간 매개체가 따로 없다.  
//   let listItem = createNewTaskElement(taskInput.value);
//   //Append listItem to incompleteTaskHolder
//   appendChild(incompleteTasksHolder, listItem);

//   bindTaskEvents(listItem, taskCompleted);
//   taskInput.value = "";
// }

// //Edit an existing task
// let editTask = function () {
//   console.log("Edit Task...");

//   let listItem = this.parentNode;

//   let editInput = $('input[type=text]', listItem);
//   let label = $('label', listItem);

//   let containsClass = listItem.classList.contains("editMode");


//   // if class of the parent is .editMode
//   if (containsClass) {
//     //Switch from .editMode
//     //label text become the input's value
//     label.innerText = editInput.value;
//   } else {
//     //Switch to .editMode
//     //input value becomes the labels text
//     editInput.value = label.innerText;
//   }
//   //Toggle .editMode on the parent 
//   listItem.classList.toggle("editMode");
// }

// //Delete an existing task
// let deleteTask = function () {
//   console.log("Delete Task...");
//   //Remove the parent list item from the ul
//   var listItem = this.parentNode;
//   var ul = listItem.parentNode;

//   ul.removeChild(listItem);
// }

// //Mark a task as complete
// let taskCompleted = function () {
//   console.log("Task Complete...");
//   //When the Checkbox is checked 
//   //Append the task list item to the #completed-tasks ul
//   let listItem = this.parentNode;
//   completedTasksHolder.appendChild(listItem);
//   bindTaskEvents(listItem, taskIncomplete);
// }


// //Mark a task as incomplete
// let taskIncomplete = function () {
//   console.log("Task Incomplete...");
//   //When the checkbox is unchecked appendTo #incomplete-tasks
//   let listItem = this.parentNode;
//   incompleteTasksHolder.appendChild(listItem);
//   bindTaskEvents(listItem, taskCompleted);
// }


// //Set the click handler to the addTask function
// addEvent(addButton)('click', addTask);

// let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
//   console.log("Bind List item events");
//   // select listitetms chidlren
//   let checkBox = $('input[type="checkbox"]', taskListItem);
//   let editButton = $("button.edit", taskListItem);
//   let deleteButton = $("button.delete", taskListItem);

//   addEvent(editButton)('click', editTask);
//   addEvent(deleteButton)('click', deleteTask);
//   addEvent(checkBox)('onchange', checkBoxEventHandler);

// }

// //cycle over incompleteTaskHolder ul list items
// each(
//   children(incompleteTasksHolder), (elm) => {
//     bindTaskEvents(elm, taskCompleted);
//   });
// //cycle over completedTaskHolder ul list items
// each(
//   children(completedTasksHolder), (elm) => {
//     bindTaskEvents(elm, taskIncomplete);
//   });








