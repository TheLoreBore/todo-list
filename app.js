const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filters button');

let filter = 'all';

// Load tasks from local storage on page load
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task.text, task.dueDate, task.completed));
}

// Save all current tasks to local storage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.querySelector('.task-text').textContent,
      dueDate: li.querySelector('.due-date') ? li.querySelector('.due-date').dataset.raw : '',
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render a single task to the DOM
function renderTask(text, dueDate, completed = false) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  const taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = text;
  li.appendChild(taskText);

  if (dueDate) {
    const dateLabel = document.createElement('span');
    dateLabel.classList.add('due-date');
    dateLabel.dataset.raw = dueDate;
    const formatted = new Date(dueDate + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
    dateLabel.textContent = '📅 ' + formatted;
    li.appendChild(dateLabel);
  }

  const actions = document.createElement('div');
  actions.classList.add('task-actions');

  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Done';
  completeBtn.classList.add('complete-btn');
  completeBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
    applyFilter();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(actions);
  taskList.appendChild(li);
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '') return;

  const dueDate = document.getElementById('dueDateInput').value;
  renderTask(text, dueDate);
  saveTasks();

  taskInput.value = '';
  document.getElementById('dueDateInput').value = '';
  applyFilter();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.textContent.toLowerCase();
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter();
  });
});

function applyFilter() {
  const tasks = taskList.querySelectorAll('li');
  tasks.forEach(task => {
    const isCompleted = task.classList.contains('completed');
    if (filter === 'all') task.style.display = '';
    else if (filter === 'active') task.style.display = isCompleted ? 'none' : '';
    else if (filter === 'done') task.style.display = isCompleted ? '' : 'none';
  });
}

// Set All button as active by default
filterBtns[0].classList.add('active');

// Load saved tasks when page opens
loadTasks();