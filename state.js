const ALL_FILTER = 'ALL';
const COMPLETED_FILTER = 'COMPLETED';
const NOT_COMPLETED_FILTER = 'NOT_COMPLETED';

const ADD_TODO_ACTION = 'ADD_TODO';
const REMOVE_TODO_ACTION = 'REMOVE_TODO';
const REMOVE_COMPLETED_TODOS_ACTION = 'REMOVE_COMPLETED_TODOS';
const TOGGLE_TODO_ACTION = 'TOGGLE_TODO';
const TOGGLE_ALL_ACTION = 'TOGGLE_ALL';
const FILTER_TODOS_ACTION = 'FILTER_TODOS';

const notCompletedTodosPredicate = todo => !todo.completed;
const completedTodosPredicate = todo => todo.completed;

let nextId = 0;
let state = {
    todos: [],
    filteredTodos: [],
    filter: ALL_FILTER
};

function reducer(state = {}, action) {
    let todos;
    let filter;

    switch (action.type) {
        case ADD_TODO_ACTION:
            todos = [...(state.todos || []), {
                id: nextId++,
                completed: false,
                text: action.payload
            }];
            filter = state.filter || ALL_FILTER;

            return createState(todos, filter);
        case REMOVE_TODO_ACTION:
            todos = (state.todos || []).filter(todo => todo.id !== action.payload);
            filter = state.filter;

            return createState(todos, filter);
        case REMOVE_COMPLETED_TODOS_ACTION:
            todos = (state.todos || []).filter(notCompletedTodosPredicate);
            filter = state.filter;

            return createState(todos, filter);
        case TOGGLE_TODO_ACTION:
            todos = (state.todos || []).map(todo => todo.id === action.payload ?
                {...todo, completed: !todo.completed} : todo);
            filter = state.filter;

            return createState(todos, filter);
        case TOGGLE_ALL_ACTION:
            const newState = state.todos.some(notCompletedTodosPredicate);

            todos = (state.todos || []).map(todo => ({...todo, completed: newState}));
            filter = state.filter;

            return createState(todos, filter);
        case FILTER_TODOS_ACTION:
            todos = state.todos || [];
            filter = action.payload;

            return createState(todos, filter);
        default:
            return state;
    }
}

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
        case ALL_FILTER:
            return () => true;
        case COMPLETED_FILTER:
            return completedTodosPredicate;
        case NOT_COMPLETED_FILTER:
            return notCompletedTodosPredicate;
        default:
            throw new Error(`Filter not supported: '${filterId}'`);
    }
}
