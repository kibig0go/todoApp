import { addTask, changeStatus, deleteTask, list, PRIORITY, STATUSES } from "./todo.js";
import { formHigh, inputHigh, listHigh, formLow, inputLow, listLow } from "./view.js";

formHigh.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(inputHigh.value.trim(), PRIORITY.HIGH, STATUSES.TO_DO);
    inputHigh.value = '';
    render(list);
    console.log(list);
})

formLow.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(inputLow.value.trim(), PRIORITY.LOW, STATUSES.TO_DO);
    inputLow.value = '';
    render(list);
    console.log(list);
})

function render(list) {
    let tasksForDelete = document.querySelectorAll('.list__item');
    tasksForDelete.forEach((item) => item.remove());

    list.forEach(element => {
        switch (element.priority) {
            case PRIORITY.HIGH:
                listHigh.append(highListAdd(element));
                break;
            case PRIORITY.LOW:
                listLow.append(highListAdd(element));
                break;
        }
    })
}

function highListAdd(element) {
    let listItem = document.createElement('li');
    listItem.classList.add('list__item');
    let div = document.createElement('div');
    div.classList.add('todo__task');
    let divContent = document.createElement('div');
    divContent.classList.add('todo__task-content');
    div.append(divContent);
    let divInner = document.createElement('div');
    divInner.classList.add('task__inner');
    divContent.append(divInner);
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo__task-checkbox');
    let label = document.createElement('label');
    label.classList.add('.todo__task-name');
    label.textContent = element.name;
    divInner.append(label);
    let button = document.createElement('button');
    button.classList.add('todo__task-btn');
    let img = document.createElement('img');
    img.src = 'img/delete-btn.svg';
    button.append(img);
    button.addEventListener('click', () => {
        deleteTask(element.name);
        console.log(list);
        render(list);
    })
    divContent.append(button);
    divInner.prepend(checkbox);
    listItem.append(div);
    return listItem;
}

listHigh.addEventListener('click', function (ev) {
    if (ev.target.classList.contains('todo__task-content')) {
        ev.target.classList.toggle('done');
    }
}, false);

listLow.addEventListener('click', function (ev) {
    if (ev.target.classList.contains('todo__task-content')) {
        ev.target.classList.toggle('done');
    }
}, false);
