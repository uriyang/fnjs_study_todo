const initialState = [
    {
        id: 1,
        content: 'Pay Bills'
    },
    {
        id: 2,
        content: 'Go Shopping',
        onEdit: true
    },
    {
        id: 3,
        content: 'See the Doctor'
    }
];

let lastId = 3;

const elements = {
    incompleteList: El('#incomplete-tasks')[0],
    completeList: El('#completed-tasks')[0],
    addBtn: El('.add-task-btn')[0],
    newTask: El('#new-task')[0]
};

const Todo = {
    todoId_REGEXP: /^todo-\d$/,
    create(content, id) {
        const createEl = con =>
            El.create('li', {
                class: 'todo-' + id,
                innerHTML: `
            <input class="complete" type="checkbox">
            <label>${con}</label>
            <input class="content" type="text" value="${con}">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>`
            });

        const attachEvent = el =>
            El.attachEvent(el, 'click', (event) => {
                if (Todo.isTodoEl(event.target)) return;
                const target = event.target;
                if (El.hasClass(target, 'complete')) Todo.complete(el);
                if (El.hasClass(target, 'edit')) Todo.edit(el);
                if (El.hasClass(target, 'delete')) El.delete(el);
            });

        return FP.go(
            content,
            createEl,
            attachEvent,
            El.appendChild(elements.incompleteList)
        );
    },
    edit: (todoEl) => {
        const setContent = (el) => {
            El('label', el).innerText = Todo.getElContent(el);
            El.removeClass(el, 'editMode');
            return el;
        };

        const openEdit = (el) => {
            El.addClass(el, 'editMode');
        };

        const onEdit = el => El.hasClass(el, 'editMode');

        FP.ifElse(onEdit, setContent, openEdit)(todoEl);
        return todoEl;
    },
    isComplete(todoEl) {
        return El('.complete', todoEl)[0].checked;
    },
    complete(todoEl) {
        const { incompleteList, completeList } = elements;
        const moveTodo = parent => el => El.appendChild(parent, el);

        FP.ifElse(
            Todo.isComplete,
            moveTodo(completeList),
            moveTodo(incompleteList)
        )(todoEl);
        return todoEl;
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

function todoInit() {
    initialState.forEach((todo) => {
        const el = Todo.create(todo.content, todo.id);
        if (todo.onEdit) Todo.edit(el);
    });

    El.attachEvent(elements.addBtn, 'click', () => {
        lastId += 1;
        Todo.create(elements.newTask.value, lastId);
        elements.newTask.value = '';
    });
}

todoInit();
