const form = document.querySelector(".createTask");
const input = document.querySelector("input");
const select = document.querySelector("select");

const totalCount = document.querySelector(".Totaltask .count");
const pendingCount = document.querySelector(".PendingTasks .count");
const completedCount = document.querySelector(".CompletedTasks .count");

const themeBtn = document.getElementById("themeToggle");
const themeLabel = document.querySelector(".theme-label");

let tasks = [];

renderTasks();

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = input.value.trim();
    const category = select.value;

    if (title === "" || category === "Category") return;

    const task = {
        title,
        category,
        completed: false
    };

    tasks.push(task);

    input.value = "";
    select.selectedIndex = 0;

    renderTasks();
});

function renderTasks() {

    // पहले render किए गए tasks हटाओ
    document.querySelectorAll(".generated-task").forEach(task => task.remove());

    tasks.forEach((task, index) => {

        const section = document.createElement("section");
        section.classList.add("Task", "generated-task");

        if (task.completed) {
            section.classList.add("completed");
        }

        section.innerHTML = `
            <div class="left">
                <h3>${task.title}</h3>

                <div class="bt">
                    <div class="Study">${task.category}</div>
                    <div class="Pending">
                        ${task.completed ? "Completed" : "Pending"}
                    </div>
                </div>
            </div>

            <div class="right">
                <button class="Edit">Edit</button>
                <button class="Complete">Complete</button>
                <button class="Delete">Delete</button>
            </div>
        `;

        document.querySelector("main").append(section);

        // Delete
        section.querySelector(".Delete").addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        // Complete
        section.querySelector(".Complete").addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        });

        // Edit
        section.querySelector(".Edit").addEventListener("click", () => {

            let newTask = prompt("Edit Task", tasks[index].title);

            if (newTask !== null) {

                newTask = newTask.trim();

                if (newTask !== "") {
                    tasks[index].title = newTask;
                    renderTasks();
                }
            }

        });

    });

    totalCount.innerText = tasks.length;
    pendingCount.innerText = tasks.filter(task => !task.completed).length;
    completedCount.innerText = tasks.filter(task => task.completed).length;
}

// Theme Toggle
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeLabel.innerText = "Dark";
    } else {
        themeLabel.innerText = "Light";
    }

});