const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

// Enter key support
inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("Please enter a task!");
        return;
    }
    
    let li = document.createElement('li');
    li.textContent = inputBox.value; 
    li.classList.add('todo-item');
    li.setAttribute('draggable', 'true');
    
    li.addEventListener('dragstart', () => {
        li.classList.add('dragging');
    });
    
    li.addEventListener('dragend', () => {
        li.classList.remove('dragging');
        saveData();
    });
    
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
    
    listContainer.appendChild(li);
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    }
    else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Drag & Drop
listContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    if (!dragging) return;
    
    const afterElement = getDragAfterElement(listContainer, e.clientY);
    if (afterElement == null) {
        listContainer.appendChild(dragging);
    } else {
        listContainer.insertBefore(dragging, afterElement);
    }
});

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
    
    const items = listContainer.querySelectorAll('li');
    items.forEach(li => {
        li.classList.add('todo-item');
        li.setAttribute('draggable', 'true');
        
        li.addEventListener('dragstart', () => {
            li.classList.add('dragging');
        });
        
        li.addEventListener('dragend', () => {
            li.classList.remove('dragging');
            saveData();
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.todo-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element || null;
}

showTask();

// Save data to local storage whenever there is a change
listContainer.addEventListener('DOMSubtreeModified', saveData);
