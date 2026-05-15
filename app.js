const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filters button');

let filter = 'all';

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '') return;

  const li = document.createElement('li');

  const taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = text;

  const actions = document.createElement('div');
  actions.classList.add('task-actions');

  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Done';
  completeBtn.classList.add('complete-btn');
  completeBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    applyFilter();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => li.remove());

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(taskText);
  li.appendChild(actions);
  taskList.appendChild(li);

  taskInput.value = '';
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