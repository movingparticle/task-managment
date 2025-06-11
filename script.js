// Utiliza localStorage para persistir las tareas
function loadTasks() {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

let currentCategory = 'importante';

function renderTasks() {
    const tasks = loadTasks();
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.filter(t => t.category === currentCategory).forEach((t, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${t.title} (${t.startDate} - ${t.endDate}) - ${t.description}`;
        if (t.attachment) {
            const span = document.createElement('span');
            span.className = 'attachment';
            span.textContent = ' [adjunto]';
            li.appendChild(span);
        }
        list.appendChild(li);
    });
}

async function handleAdd(e) {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const fileInput = document.getElementById('attachment');
    let attachment = null;

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const data = await file.arrayBuffer();
        attachment = btoa(String.fromCharCode(...new Uint8Array(data)));
    }

    const tasks = loadTasks();
    tasks.push({ title, description, startDate, endDate, category: currentCategory, attachment });
    saveTasks(tasks);
    e.target.reset();
    renderTasks();
}

document.getElementById('taskForm').addEventListener('submit', handleAdd);
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tab').forEach(btn => {
        btn.addEventListener('click', () => switchCategory(btn.dataset.category));
    });
    renderTasks();
});

function switchCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === cat);
    });
    renderTasks();
}
