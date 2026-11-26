function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskList = document.getElementById("taskList");

    const li = document.createElement("li");
    li.className = "task";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", function () {
        li.classList.toggle("completed", checkbox.checked);
    });

    // Task text
    const span = document.createElement("span");
    span.textContent = taskText;

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    deleteButton.onclick = function () {
        li.remove();
    };

    // Move up button
    const upButton = document.createElement("button");
    upButton.textContent = "↑";
    upButton.className = "move-btn";

    upButton.onclick = function () {
        const previousTask = li.previousElementSibling;

        if (previousTask) {
            taskList.insertBefore(li, previousTask);
        }
    };

    // Move down button
    const downButton = document.createElement("button");
    downButton.textContent = "↓";
    downButton.className = "move-btn";

    downButton.onclick = function () {
        const nextTask = li.nextElementSibling;

        if (nextTask) {
            taskList.insertBefore(nextTask, li);
        }
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(upButton);
    li.appendChild(downButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    input.value = "";
}