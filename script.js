// Utiliza localStorage para persistir las tareas
function loadTasks() {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

let currentCategory = 'importante';

document.getElementById('showFormBtn').addEventListener('click', () => {
    const form = document.getElementById('taskForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('deleteDoneBtn').addEventListener('click', deleteDone);

function renderTasks() {
    const tasks = loadTasks();
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach((t, i) => {
        if (t.category !== currentCategory) return;
        const li = document.createElement('li');
        li.className = 'task';
        if (t.done) li.classList.add('done');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = !!t.done;
        checkbox.addEventListener('change', () => {
            const all = loadTasks();
            all[i].done = checkbox.checked;
            saveTasks(all);
            renderTasks();
        });
        li.appendChild(checkbox);

        const span = document.createElement('span');
        let text = `${t.title}`;
        if (t.startDate || t.endDate) {
            text += ` (${t.startDate || ''} - ${t.endDate || ''})`;
        }
        text += ` - ${t.description}`;
        if (t.frequency) {
            text += ` [${t.frequency}]`;
        }
        span.textContent = text;
        li.appendChild(span);

        if (t.attachment) {
            const att = document.createElement('span');
            att.className = 'attachment';
            att.textContent = ' [adjunto]';
            li.appendChild(att);
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
    const frequency = document.getElementById('frequency').value;
    const fileInput = document.getElementById('attachment');
    let attachment = null;

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const data = await file.arrayBuffer();
        attachment = btoa(String.fromCharCode(...new Uint8Array(data)));
    }

    const tasks = loadTasks();
    tasks.push({ title, description, startDate, endDate, category: currentCategory, attachment, frequency: currentCategory === 'recurrente' ? frequency : undefined, done: false });
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
    const form = document.getElementById('taskForm');
    form.style.display = 'none';
    const freqGroup = document.getElementById('freqGroup');
    const start = document.getElementById('startDate');
    const end = document.getElementById('endDate');
    if (cat === 'recurrente') {
        freqGroup.style.display = 'block';
        start.required = false;
        end.required = false;
    } else {
        freqGroup.style.display = 'none';
        start.required = true;
        end.required = true;
    }
    renderTasks();
}

function deleteDone() {
    let tasks = loadTasks();
    tasks = tasks.filter(t => !t.done);
    saveTasks(tasks);
    renderTasks();
}
