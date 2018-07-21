function addNewTodo(keyPressEvent) {
    if(keyPressEvent.key === 'Enter'){
        const sourceInputElement = keyPressEvent.target;
        const newTodoElement = createTodoElement(sourceInputElement.value);

        document.querySelector('.todo-list').appendChild(newTodoElement);
        sourceInputElement.value = '';
    }
}

function createTodoElement(value){
    const template = `
            <input class="toggle" type="checkbox">
            <label>${value}</label>
            <button class="destroy"></button>
        `;
    const todoElement = document.createElement('li');

    todoElement.innerHTML = template;

    return todoElement;
}