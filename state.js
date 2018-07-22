const mockTodos = [
    {id: 0, completed: false, description: 'Tarea1'},
    {id: 1, completed: true, description: 'Tarea2'}
];
let state = {
    todos: mockTodos,
    nextId: mockTodos.length
};
const history = [state];

function addNewTodoAction(description) {
    state = {
        ...state,
        todos: [...state.todos, {id: state.nextId + 1, completed: false, description: description}],
        nextId: state.nextId + 1
    };
    history.push(state);
}

function toggleTodoAction(id) {
    state = {
        ...state,
        todos: state.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo)
    };
    history.push(state);
}

function toggleAllAction() {
    const newState = state.todos.some(todo => !todo.completed);

    state = {
        ...state,
        todos: state.todos.map(todo => ({...todo, completed: newState}))
    };
    history.push(state);
}

function removeTodoAction(id) {
    state = {
        ...state,
        todos: state.todos.filter(todo => todo.id !== id)
    };
    history.push(state);
}

function removeCompletedTodosAction() {
    state = {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
    };
    history.push(state);
}
