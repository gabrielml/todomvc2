const todoList = [
    {id: 0, completed: false, description: 'Tarea1'},
    {id: 1, completed: true, description: 'Tarea2'}
];
let nextId = todoList.length;

function addNewTodoAction(description) {
    todoList.push({id: nextId++, completed: false, description: description});

}

function toggleTodoAction(id) {
    const todo = todoList.find(todo => todo.id === id);

    todo.completed = !todo.completed;
}

function removeTodoAction(id) {
    const todoIndex = todoList.findIndex(todo => todo.id === id);

    todoList.splice(todoIndex, 1);
}

function removeCompletedTodosAction() {
    todoList.forEach((todo, todoIndex) => {
        if (todo.completed) {
            todoList.splice(todoIndex, 1);
        }
    });
}
