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

function removeTodo(id) {
    removeTodoAction(id);
    update();
}

function removeCompletedTodos() {
    removeCompletedTodosAction();
    update();
}

function update() {
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
