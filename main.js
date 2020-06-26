// Определение переменных
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task");
const tasksList = document.querySelector(".collection");
const buttonClear = document.querySelector(".clear-list");
const filterInput = document.getElementById("filter");

document.addEventListener("DOMContentLoaded", getTasksFromLStrg);
form.addEventListener("submit", addNewTask);
tasksList.addEventListener("click", rmTask);
buttonClear.addEventListener("click", clrTaskList);
filterInput.addEventListener("keyup", fltrTasks);

// Добавить задачу в список задач
function addNewTask(evt) {
  if (taskInput.value === "") {
    alert("Введите что-нибудь в поле 'Новая задача'!");
  } else {
    // создание нового элемента списка

    const liElemt = document.createElement("li");
    // добавление текста в элемент списка

    liElemt.appendChild(document.createTextNode(taskInput.value));

    liElemt.classList.add("collection-item");

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML =
      '<i class="far fa-times-circle teal-text text-darken-1"></i>';

    liElemt.appendChild(link);

    tasksList.appendChild(liElemt);

    addTaskToLocalStorage(taskInput.value);

    taskInput.value = "";
  }
  evt.preventDefault();
}

// Добавить задачу в localStorage
function addTaskToLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Удалить задачу из списка задач
function rmTask(evt) {
  if (evt.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Действительно удалить задачу?")) {
      evt.target.parentElement.parentElement.remove();

      // Удалить задачу из LocalStorage
      rmTaskFromLclStrg(evt.target.parentElement.parentElement);
    }
  }
}

function rmTaskFromLclStrg(taskLiElmnt) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task, i) {
    if (taskLiElmnt.textContent === task) {
      tasks.splice(i, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//
function getTasksFromLStrg() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function(task) {
    const liElemt = document.createElement("li");
    // добавление текста в элемент списка

    liElemt.appendChild(document.createTextNode(task));

    liElemt.classList.add("collection-item");

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML =
      '<i class="far fa-times-circle teal-text text-darken-1"></i>';

    liElemt.appendChild(link);

    tasksList.appendChild(liElemt);
  });
}

// Очистить список задач

function clrTaskList(evt) {
  tasksList.innerHTML = "";
  // очистить localStorage
  localStorage.clear();
}

// Фильтр задач
function fltrTasks(evt) {
  const txt = evt.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task) {
    if (task.firstChild.textContent.toLowerCase().includes(txt)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
