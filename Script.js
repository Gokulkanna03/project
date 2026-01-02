const STORAGE_KEY = 'todoActivities';
document.addEventListener('DOMContentLoaded', function() {
    loadTodos();
    document.getElementById('addBtn').addEventListener('click', addTodo);
    document.getElementById('activityInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTodo();
    });
});
function addTodo() {
    const input = document.getElementById('activityInput');
    const text = input.value.trim();

    if (text === '') {
        alert('Please enter a todo');
        return;
    }

    let todos = getTodos();
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        date: new Date().toLocaleDateString()
    };

    todos.push(todo);
    saveTodos(todos);
    input.value = '';
    loadTodos();
}
function getTodos() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveTodos(todos) {
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
function loadTodos() {
    const todos = getTodos();
    const list = document.getElementById('todoList');

    list.innerHTML = '';

    if (todos.length === 0) {
        list.innerHTML = '<li style="text-align:center; color:#999;">No todos yet!</li>';
        return;
    }

    todos.forEach(todo => {
        const li = document.createElement('li');
        if (todo.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${todo.text}</span>
            <div>
                <button class="btn-complete" onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? 'Undo' : 'Done'}
                </button>
                <button class="btn-delete" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}
function toggleTodo(id) {
    let todos = getTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        loadTodos();
    }
}
function deleteTodo(id) {
    if (!confirm('Delete this todo?')) return;

    let todos = getTodos();
    todos = todos.filter(t => t.id !== id);
    saveTodos(todos);
    loadTodos();
}
