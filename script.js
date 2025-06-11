// Utiliza localStorage para persistir las tareas
function loadTasks() {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = loadTasks();
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach((t, i) => {
        const li = document.createElement('li');
        li.textContent = `${i + 1}. ${t.title} - ${t.description}`;
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
    const fileInput = document.getElementById('attachment');
    let attachment = null;

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const data = await file.arrayBuffer();
        attachment = btoa(String.fromCharCode(...new Uint8Array(data)));
    }

    const tasks = loadTasks();
    tasks.push({ title, description, attachment });
    saveTasks(tasks);
    e.target.reset();
    renderTasks();
}

document.getElementById('taskForm').addEventListener('submit', handleAdd);
document.addEventListener('DOMContentLoaded', renderTasks);
