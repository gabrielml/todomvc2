const todoList = [
    {id: 0, completed: false, description: 'Tarea1'},
    {id: 1, completed: true, description: 'Tarea2'}
];
let nextId = todoList.length;
document.addEventListener('DOMContentLoaded', update);


function addNewTodo(keyPressEvent) {
    if (keyPressEvent.key === 'Enter') {
        const sourceInputElement = keyPressEvent.target;

        todoList.push({id: nextId++, completed: false, description: sourceInputElement.value});
        update();
        sourceInputElement.value = '';
    }
}

function toggleTodo(id) {
    const todo = todoList.find(todo => todo.id === id);

    todo.completed = !todo.completed;
    update();
}

function removeTodo(id){
    const todoIndex = todoList.findIndex(todo => todo.id === id);

    todoList.splice(todoIndex, 1);
    update();
}

function update() {
    const todoListElement = document.querySelector('.todo-list');

    todoListElement.innerHTML = null;
    todoList.forEach(todo => {
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
