function addNewTodo(keyPressEvent) {
    if(keyPressEvent.key === 'Enter'){
        const sourceInputElement = keyPressEvent.target;
        const doneToggleElement = document.createElement('input');
        doneToggleElement.type = 'checkbox';
        doneToggleElement.className = 'toggle';
        const labelElement = document.createElement('label');
        labelElement.textContent = sourceInputElement.value;
        const buttonElement = document.createElement('button');
        buttonElement.className = 'destroy';
        const newTodoElement = document.createElement('li');
        newTodoElement.appendChild(doneToggleElement);
        newTodoElement.appendChild(labelElement);
        newTodoElement.appendChild(buttonElement);
        document.querySelector('.todo-list').appendChild(newTodoElement);
        sourceInputElement.value = '';
    }
}