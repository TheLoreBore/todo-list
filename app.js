const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let filter = 'all';

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '') return;

  const li = document.createElement('li');
  li.textContent = text;

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

  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = '';
  applyFilter();
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