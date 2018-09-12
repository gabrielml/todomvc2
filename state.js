const FILTER_ALL = 'ALL';
const FILTER_COMPLETED = 'COMPLETED';
const FILTER_NOT_COMPLETED = 'NOT_COMPLETED';

let nextId = 0;
let state = {
    todos: [],
    filteredTodos: [],
    filter: FILTER_ALL
};

function reducer(state = {}, action) {
    let todos;
    let filter;

    switch (action.type) {
        case 'ADD_TODO':
            todos = [...(state.todos || []), {
                id: nextId++,
                completed: false,
                text: action.payload
            }];
            filter = state.filter || FILTER_ALL;

            return createState(todos, filter);
        case 'REMOVE_TODO':
            todos = (state.todos || []).filter(todo => todo.id !== action.payload);
            filter = state.filter;

            return createState(todos, filter);
        case 'REMOVE_COMPLETED_TODOS':
            todos = (state.todos || []).filter(todo => todo.completed === false);
            filter = state.filter;

            return createState(todos, filter);
        case 'TOGGLE_TODO':
            todos = (state.todos || []).map(todo => todo.id === action.payload ?
                {...todo, completed: !todo.completed} : todo);
            filter = state.filter;

            return createState(todos, filter);
        case 'TOGGLE_ALL':
            const newState = state.todos.some(todo => !todo.completed);

            todos = (state.todos || []).map(todo => ({...todo, completed: newState}));
            filter = state.filter;

            return createState(todos, filter);
        case 'FILTER_TODOS':
            todos = state.todos || [];
            filter = action.payload;

            return createState(todos, filter);
        default:
            return state;
    }
};

function createState(todos, filter) {
    return {
        todos,
        filter,
        filteredTodos: getFilteredTodos(todos, filter)
    };
}

function getFilteredTodos(todos, filter) {
    return todos.filter(getFilterPredicate(filter));
}

function getFilterPredicate(filterId) {
    switch (filterId) {
        case FILTER_ALL:
            return () => true;
        case FILTER_COMPLETED:
            return todo => todo.completed;
        case FILTER_NOT_COMPLETED:
            return todo => !todo.completed;
        default:
            throw new Error(`Filter not supported: '${filterId}'`);
    }
}
