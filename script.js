let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

document.getElementById("taskForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;

    const task = {
        id: Date.now(),
        title,
        description,
        dueDate,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    displayTasks();
    this.reset();
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(t => t.completed);
    } else if (currentFilter === "pending") {
        filteredTasks = tasks.filter(t => !t.completed);
    }

    filteredTasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task" + (task.completed ? " completed" : "");

        const today = new Date().toISOString().split("T")[0];
        if (!task.completed && task.dueDate <= today) {
            div.style.borderColor = "red";
        }

        div.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Due: ${task.dueDate}</p>
            <button onclick="toggleTask(${task.id})">
                ${task.completed ? "Undo" : "Complete"}
            </button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        taskList.appendChild(div);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
}

function filterTasks(type) {
    currentFilter = type;
    displayTasks();
}

displayTasks();
