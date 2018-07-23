const ALL = '';
const ACTIVE = '#active';
const COMPLETED = '#completed';
const allTodosPredicate = () => true;
const activeTodosPredicate = todo => !todo.completed;
const completedTodosPredicate = todo => todo.completed;
const mockTodos = [
    {id: 0, completed: false, description: 'Tarea1'},
    {id: 1, completed: true, description: 'Tarea2'}
];
let state = {
    todos: mockTodos,
    nextId: mockTodos.length,
    visibleTodos: getVisibleTodos(mockTodos, window.location.hash),
    filter: window.location.hash
};
const history = [state];

function addNewTodoAction(description) {
    const todos = [...state.todos, {id: state.nextId + 1, completed: false, description: description}];

    state = {
        ...state,
        todos: todos,
        nextId: state.nextId + 1,
        visibleTodos: getVisibleTodos(todos, state.filter)
    };
    history.push(state);
}

function toggleTodoAction(id) {
    const todos = state.todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo);

    state = {
        ...state,
        todos: todos,
        visibleTodos: getVisibleTodos(todos, state.filter)
    };
    history.push(state);
}

function toggleAllAction() {
    const newState = state.todos.some(activeTodosPredicate);
    const todos = state.todos.map(todo => ({...todo, completed: newState}));

    state = {
        ...state,
        todos: todos,
        visibleTodos: getVisibleTodos(todos, state.filter)
    };
    history.push(state);
}

function removeTodoAction(id) {
    const todos = state.todos.filter(todo => todo.id !== id);

    state = {
        ...state,
        todos: todos,
        visibleTodos: getVisibleTodos(todos, state.filter)
    };
    history.push(state);
}

function removeCompletedTodosAction() {
    const todos = state.todos.filter(activeTodosPredicate);
    state = {
        ...state,
        todos: todos,
        visibleTodos: getVisibleTodos(todos, state.filter)
    };
    history.push(state);
}

function setFilterAction(filter) {
    state = {
        ...state,
        visibleTodos: getVisibleTodos(state.todos, filter),
        filter: filter
    };
    history.push(state);
}

function getVisibleTodos(todos, filterName) {
    const filterPredicatesByName = {
        [ALL]: allTodosPredicate,
        [ACTIVE]: activeTodosPredicate,
        [COMPLETED]: completedTodosPredicate
    };
    const filterPredicate = filterPredicatesByName[filterName];

    if (filterPredicate === undefined) {
        throw new Error(`Filter value: '${filter}' not supported.`);
    }

    return todos.filter(filterPredicate);
}
