function addNewTodo(keyPressEvent) {
    if (keyPressEvent.key === 'Enter') {
        const sourceInputElement = keyPressEvent.target;

        addNewTodoAction(sourceInputElement.value);
        update();
        sourceInputElement.value = '';
    }
}

function toggleTodo(id) {
    toggleTodoAction(id);
    update();
}

function toggleAll() {
    toggleAllAction();
    update();
}

function removeTodo(id) {
    removeTodoAction(id);
    update();
}

function removeCompletedTodos() {
    removeCompletedTodosAction();
    update();
}

function update() {
    updateTodoCount();
    updateTodoList();

    function updateTodoCount() {
        const todoCountElement = document.querySelector('.todo-count');
        const todoCount = state.todos.filter(todo => !todo.completed).length;

        todoCountElement.innerHTML = `<strong>${todoCount}</strong> ${todoCount === 1 ? 'item' : 'items'} left`;
    }

    function updateTodoList() {
        const todoListElement = document.querySelector('.todo-list');

        todoListElement.innerHTML = null;
        state.todos.forEach(todo => {
            const newTodoElement = createTodoElement(todo);

            todoListElement.appendChild(newTodoElement);
        });

        function createTodoElement(todo) {
            const template = `
            <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
            <label>${todo.description}</label>
            <button class="destroy" onclick="removeTodo(${todo.id})"></button>
        `;
            const todoElement = document.createElement('li');

            todoElement.className = todo.completed ? 'completed' : undefined;
            todoElement.innerHTML = template;

            return todoElement;
        }
    }
}

