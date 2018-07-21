const todoList = [
    {completed: false, description: 'Tarea1'},
    {completed: true, description: 'Tarea2'}
];
document.addEventListener('DOMContentLoaded', update);


function addNewTodo(keyPressEvent) {
    if (keyPressEvent.key === 'Enter') {
        const sourceInputElement = keyPressEvent.target;

        todoList.push({completed: false, description: sourceInputElement.value});
        update();
        sourceInputElement.value = '';
    }
}

function update() {
    const todoListElement = document.querySelector('.todo-list');

    todoListElement.innerHTML = null;
    todoList.forEach(todo => {
        const newTodoElement = createTodoElement(todo.description);

        todoListElement.appendChild(newTodoElement);
    });

    function createTodoElement(value) {
        const template = `
            <input class="toggle" type="checkbox">
            <label>${value}</label>
            <button class="destroy"></button>
        `;
        const todoElement = document.createElement('li');

        todoElement.innerHTML = template;

        return todoElement;
    }
}
