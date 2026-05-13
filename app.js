const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text === '') return;

  const li = document.createElement('li');
  li.textContent = text;
  taskList.appendChild(li);

  taskInput.value = '';
});