// Define variables
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
let tasks = [];

// Function to render a task item
function renderTask(task) {
  const taskItem = document.createElement("li");
  taskItem.setAttribute("data-id", task.id);
  taskItem.innerHTML = `
          <input type="checkbox" ${task.completed ? "checked" : ""}>
          <span>${task.text}</span>
          <button class="deleteTask">Delete</button>
      `;
  taskList.appendChild(taskItem);

  // Add event listener for checkbox
  const checkbox = taskItem.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    taskItem.classList.toggle("completed");
  });

  // Add event listener for delete button
  const deleteButton = taskItem.querySelector(".deleteTask");
  deleteButton.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.id !== task.id);
    taskItem.remove();
  });
}

// Add event listener to add task button
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = { id: Date.now(), text: taskText, completed: false };
    tasks.push(task);
    renderTask(task);
    taskInput.value = "";
  }
});

// Initialize the application
function init() {
  // Load tasks from localStorage or initialize tasks array
  const tasksFromStorage = JSON.parse(localStorage.getItem("tasks"));
  if (tasksFromStorage) {
    tasks = tasksFromStorage;
    tasks.forEach((task) => renderTask(task));
  }
}

init();

// Save tasks to localStorage on window unload
window.addEventListener("unload", () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
});
