function addNewTodo(keyPressEvent) {
    if (keyPressEvent.key === 'Enter') {
        const sourceInputElement = keyPressEvent.target;

        state = reducer(state, {type: ADD_TODO_ACTION, payload: sourceInputElement.value});
        update();
        sourceInputElement.value = '';
    }
}

function toggleTodo(id) {
    state = reducer(state, {
        type: TOGGLE_TODO_ACTION,
        payload: id
    });
    update();
}

function toggleAll() {
    state = reducer(state, {
        type: TOGGLE_ALL_ACTION
    });
    update();
}

function removeTodo(id) {
    state = reducer(state, {
        type: REMOVE_TODO_ACTION,
        payload: id
    });
    update();
}

function removeCompletedTodos() {
    state = reducer(state, {
        type: REMOVE_COMPLETED_TODOS_ACTION
    });
    update();
}

function setFilter(filter) {
    state = reducer(state, {
       type: FILTER_TODOS_ACTION,
       payload: filter
    });
    update();
}

function update() {
    updateTodoCount();
    updateTodoList();
    updateFilters();
    updateClearCompleted();

    function updateTodoCount() {
        const todoCountElement = document.querySelector('.todo-count');
        const todoCount = state.todos.filter(todo => !todo.completed).length;

        todoCountElement.innerHTML = `<strong>${todoCount}</strong> ${todoCount === 1 ? 'item' : 'items'} left`;
    }

    function updateTodoList() {
        const todoListElement = document.querySelector('.todo-list');

        todoListElement.innerHTML = null;
        state.filteredTodos.forEach(todo => {
            const newTodoElement = createTodoElement(todo);

            todoListElement.appendChild(newTodoElement);
        });

        function createTodoElement(todo) {
            const template = `
            <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
            <label>${todo.text}</label>
            <button class="destroy" onclick="removeTodo(${todo.id})"></button>
        `;
            const todoElement = document.createElement('li');

            todoElement.className = todo.completed ? 'completed' : undefined;
            todoElement.innerHTML = template;

            return todoElement;
        }
    }

    function updateFilters() {
        const selectedClass = 'class="selected"';
        const template = `
            <li>
                <a ${state.filter === ALL_FILTER ? selectedClass : ''} href="#" onclick="setFilter(ALL_FILTER)">All</a>
            </li>
            <li>
                <a ${state.filter === NOT_COMPLETED_FILTER ? selectedClass : ''} href="#active" onclick="setFilter(NOT_COMPLETED_FILTER)">Active</a>
            </li>
            <li>
                <a ${state.filter === COMPLETED_FILTER ? selectedClass : ''} href="#completed" onclick="setFilter(COMPLETED_FILTER)">Completed</a>
            </li>
        `;
        const ulFilters = document.querySelector('.filters');
        ulFilters.innerHTML = template;
    }

    function updateClearCompleted() {
        const isVisible = state.todos.some(todo => todo.completed);
        const clearCompletedElement = document.querySelector('.clear-completed');

        if (isVisible) {
            clearCompletedElement.classList.remove('hidden');
        } else {
            clearCompletedElement.classList.add('hidden');
        }
    }
}



