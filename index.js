function addNewTodo(keyPressEvent) {
    if(keyPressEvent.key === 'Enter'){
        const sourceInputElement = keyPressEvent.target;
        const template = `
            <input class="toggle" type="checkbox">
            <label>${sourceInputElement.value}</label>
            <button class="destroy"></button>
        `;
        const newTodoElement = document.createElement('li');
        newTodoElement.innerHTML = template;
        document.querySelector('.todo-list').appendChild(newTodoElement);
        sourceInputElement.value = '';
    }
}