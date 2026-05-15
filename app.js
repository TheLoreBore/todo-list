const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let filter = 'all';

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '') return;

  const li = document.createElement('li');
<<<<<<< Updated upstream
  li.textContent = text;
=======

  const taskText = document.createElement('span');
  taskText.classList.add('task-text');
  taskText.textContent = text;

  const dueDate = document.getElementById('dueDateInput').value;

  li.appendChild(taskText);

  if (dueDate) {
    const dateLabel = document.createElement('span');
    dateLabel.classList.add('due-date');
    const formatted = new Date(dueDate + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
    dateLabel.textContent = '📅 ' + formatted;
    li.appendChild(dateLabel);
  }

  const actions = document.createElement('div');
  actions.classList.add('task-actions');
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);
=======
  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(actions);
>>>>>>> Stashed changes
  taskList.appendChild(li);

  taskInput.value = '';
  document.getElementById('dueDateInput').value = '';
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