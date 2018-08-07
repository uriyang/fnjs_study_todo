// 함수형으로 짜기

// 기존에서 개선할 점
// 1. dom 접근을 해서 side effect 가 일어나는 부분 함수로 빼기
// 2. 상태관리를 js 에서 계속 들고 있고, 직접 element 를 체크하는 것보다는 js 로 체크
// -> 둘다 빼기는 어려움... react 에서 하는 것처럼 view 를 다루는 로직은 그냥 통합하고, state 만 부수효과로 다루기
// -> view 와 state 가 싱크가 되어야 한다...리액트처럼

// 상태 정의 및 관리 - 상태 관리 라이브러리로 immer js 사용

// 1. 상태를 어느 수준까지 불변하게 할 것인가?
// ex) state 내부의 것들이 불변하면 되는지? 아니면 state 자체를 매변 불변하게 해야 하는지?

const { getState, updateState } = (function () {
    // initial state
    let state = {
        todoList: {},
        lastId: 0
    };

    const getState = () => state;

    const updateState = (updateFn) => {
        state = produce(state, updateFn);
    };

    return { getState, updateState };
}());

// 투두 관련 함수 네임스페이스
const Todo = {
    todoId_REGEXP: /^todo-\d$/,
    createEl(content, id) {
        // <li class="todo-1">
        // <input class="complete" type="checkbox">
        // <label>Pay Bills</label>
        // <input type="text">
        // <button class="edit">Edit</button>
        // <button class="delete">Delete</button>
        // </li>
        // html
        const el = El.create('li', {
            class: 'todo-' + id,
            innerHTML: `
            <input class="complete" type="checkbox">
            <label>${content}</label>
            <input class="content" type="text">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>`
        });

        el.onclick = (event) => {
            if (Todo.isTodoEl(event.target)) return;
            const target = event.target;
            if (El.hasClass(target, 'complete')) Todo.complete(id, el);
            if (El.hasClass(target, 'edit')) Todo.edit(id, Todo.getElContent(el), el);
            if (El.hasClass(target, 'delete')) Todo.delete(id, el);
        };

        return el;
    },
    create(content) {
        const id = getState().lastId + 1;
        const todoEl = Todo.createEl(content, id);
        getState().els.uncompleteList.appendChild(todoEl);

        // update state
        updateState((prevState) => {
            prevState.todoList[id] = {
                content,
                isComplete: false,
                onEdit: false,
                el: todoEl
            };
            prevState.lastId = id;
        });
        return id;
    },
    edit: (id, content, el) => {
        const setContent = () => {
            el.querySelector('label').innerText = content;
            updateState((prevState) => {
                prevState.todoList[id].content = content;
            });
            
        }

        FP.go(id,
            Todo.getTodoItem,
            ifElse(FP.val('onEdit'), setContent, openEdit)
        )
    }
    
        const todoItem = Todo.getTodoItem(id);
        if (todoItem.onEdit) {}
    },
    delete(id, el) {
        
    },
    complete(id, el) {
        
    },
    getId(el) {
        
    },
    getTodoItem(id) {
        return getState().todoList[id];
    },
    isTodoEl(el) {
        const allClass = El.getClasses(el);
        const toodId = FP.find(allClass, cl => cl.match(Todo.todoId_REGEXP));
        return !!toodId;
    },
    getElContent(el) {
        return el.querySelector('.content').value;
    }
};

// // Problem: user interaction doesn't provide desired results
// // Solution: add interactivity so the user can manage daily tasks.

// const taskInput = document.getElementById('new-task'); // new-task
// const addButton = document.getElementsByTagName('button')[0]; // first button
// const incompleteTasksHolder = document.getElementById('incomplete-tasks'); // incomplete-tasks
// const completedTasksHolder = document.getElementById('completed-tasks'); // completed-tasks

// // New Task List item

// const createNewTaskElement = function (taskString) {
//     // create List Item
//     const listItem = document.createElement('li');
//     // input checkbox
//     const checkBox = document.createElement('input');
//     // label
//     const label = document.createElement('label');
//     // input (text)
//     const editInput = document.createElement('input');
//     // button.edit
//     const editButton = document.createElement('button');
//     // button.delete
//     const deleteButton = document.createElement('button');

//     // Each element needs modified

//     checkBox.type = 'checkBox';
//     editInput.type = 'text';

//     editButton.innerText = 'Edit';
//     editButton.className = 'edit';
//     deleteButton.innerText = 'Delete';
//     deleteButton.className = 'delete';

//     label.innerText = taskString;

//     // Each element needs appending
//     listItem.appendChild(checkBox);
//     listItem.appendChild(label);
//     listItem.appendChild(editInput);
//     listItem.appendChild(editButton);
//     listItem.appendChild(deleteButton);

//     return listItem;
// };

// // Add a new task
// const addTask = function () {
//     console.log('Add Task...');
//     // Create a new list item with the text from the #new-task:
//     const listItem = createNewTaskElement(taskInput.value);
//     // Append listItem to incompleteTaskHolder
//     incompleteTasksHolder.appendChild(listItem);
//     bindTaskEvents(listItem, taskCompleted);
//     taskInput.value = '';
// };

// // Edit an existing task
// const editTask = function () {
//     console.log('Edit Task...');

//     const listItem = this.parentNode;

//     const editInput = listItem.querySelector('input[type=text]');
//     const label = listItem.querySelector('label');

//     const containsClass = listItem.classList.contains('editMode');

//     // if class of the parent is .editMode
//     if (containsClass) {
//         // Switch from .editMode
//         // label text become the input's value
//         label.innerText = editInput.value;
//     } else {
//         // Switch to .editMode
//         // input value becomes the labels text
//         editInput.value = label.innerText;
//     }
//     // Toggle .editMode on the parent
//     listItem.classList.toggle('editMode');
// };

// // Delete an existing task
// const deleteTask = function () {
//     console.log('Delete Task...');
//     // Remove the parent list item from the ul
//     const listItem = this.parentNode;
//     const ul = listItem.parentNode;

//     ul.removeChild(listItem);
// };

// // Mark a task as complete
// var taskCompleted = function () {
//     console.log('Task Complete...');
//     // When the Checkbox is checked
//     // Append the task list item to the #completed-tasks ul
//     const listItem = this.parentNode;
//     completedTasksHolder.appendChild(listItem);
//     bindTaskEvents(listItem, taskIncomplete);
// };

// // Mark a task as incomplete
// var taskIncomplete = function () {
//     console.log('Task Incomplete...');
//     // When the checkbox is unchecked appendTo #incomplete-tasks
//     const listItem = this.parentNode;
//     incompleteTasksHolder.appendChild(listItem);
//     bindTaskEvents(listItem, taskCompleted);
// };

// // Set the click handler to the addTask function
// addButton.addEventListener('click', addTask);

// var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
//     console.log('Bind List item events');
//     // select listitems chidlren
//     const checkBox = taskListItem.querySelector('input[type="checkbox"]');
//     const editButton = taskListItem.querySelector('button.edit');
//     const deleteButton = taskListItem.querySelector('button.delete');
//     // bind editTask to edit button
//     editButton.onclick = editTask;
//     // bind deleteTask to delete button
//     deleteButton.onclick = deleteTask;
//     // bind checkBoxEventHandler to checkbox
//     checkBox.onchange = checkBoxEventHandler;
// };

// // cycle over incompleteTaskHolder ul list items
// for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
//     // bind events to list item's children (taskCompleted)
//     bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
// }

// // cycle over completedTaskHolder ul list items
// for (var i = 0; i < completedTasksHolder.children.length; i++) {
//     // bind events to list item's children (taskCompleted)
//     bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
// }
