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
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        taskList.appendChild(div);
    });
}


function editTask(id) {
    const task = tasks.find(t => t.id === id);

    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("dueDate").value = task.dueDate;

    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    displayTasks();
}
