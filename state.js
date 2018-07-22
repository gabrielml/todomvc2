const mockTodos = [
    {id: 0, completed: false, description: 'Tarea1'},
    {id: 1, completed: true, description: 'Tarea2'}
];
const state = {
    todos: mockTodos,
    nextId: mockTodos.length
};

function addNewTodoAction(description) {
    state.todos.push({id: state.nextId++, completed: false, description: description});
}

function toggleTodoAction(id) {
    const todo = state.todos.find(todo => todo.id === id);

    todo.completed = !todo.completed;
}

function removeTodoAction(id) {
    const todoIndex = state.todos.findIndex(todo => todo.id === id);

    state.todos.splice(todoIndex, 1);
}

function removeCompletedTodosAction() {
    state.todos.forEach((todo, todoIndex, todos) => {
        if (todo.completed) {
            todos.splice(todoIndex, 1);
        }
    });
}
