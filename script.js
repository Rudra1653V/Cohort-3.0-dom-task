const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const taskContainer = document.getElementById("taskContainer");

const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const clearAllBtn = document.getElementById("clearAllBtn");
const themeToggle = document.getElementById("themeToggle");
const attributeDemoBtn = document.getElementById("attributeDemoBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
    loadTheme();
});


taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = taskInput.value.trim();
    const category = categorySelect.value;

    if (!title) {
        alert("Task title required");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        category,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskForm.reset();
});


function renderTasks() {

    taskContainer.innerHTML = "";

    if (tasks.length === 0) {

        const empty = document.createElement("div");
        empty.className = "empty-message";

        const text = document.createTextNode(
            "No tasks available."
        );

        empty.append(text);

        taskContainer.append(empty);

        updateStats();
        return;
    }

    const fragment = document.createDocumentFragment();

    tasks.forEach(task => {

        const card = createTaskCard(task);

        fragment.append(card);
    });

    taskContainer.append(fragment);

    updateStats();
}


function createTaskCard(task) {

    const card = document.createElement("div");

    card.classList.add("task-card");

    if (task.completed) {
        card.classList.add("completed");
    }

    card.setAttribute("data-id", task.id);
    card.setAttribute(
        "data-status",
        task.completed ? "completed" : "pending"
    );

    card.setAttribute(
        "data-category",
        task.category
    );

    const title = document.createElement("h3");
    title.className = "task-title";

    const textNode = document.createTextNode(
        task.title
    );

    title.append(textNode);

    const category = document.createElement("span");
    category.className = "task-category";
    category.textContent = task.category;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.className = "complete-btn";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    actions.append(
        editBtn,
        completeBtn,
        deleteBtn
    );

    card.prepend(title);

    card.append(category);
    card.append(actions);

    return card;
}


taskContainer.addEventListener("click", (e) => {

    const card = e.target.closest(".task-card");

    if (!card) return;

    const id = Number(card.dataset.id);

    console.log("Dataset:", card.dataset);


    if (e.target.classList.contains("delete-btn")) {

        tasks = tasks.filter(
            task => task.id !== id
        );

        card.remove();

        saveTasks();
        renderTasks();
    }

    if (e.target.classList.contains("complete-btn")) {

        const task = tasks.find(
            task => task.id === id
        );

        task.completed = !task.completed;

        saveTasks();
        renderTasks();
    }

    if (e.target.classList.contains("edit-btn")) {

        const task = tasks.find(
            task => task.id === id
        );

        const updated = prompt(
            "Edit Task",
            task.title
        );

        if (!updated) return;

        const oldTitle =
            card.querySelector(".task-title");

        const newTitle =
            document.createElement("h3");

        newTitle.className = "task-title";

        newTitle.textContent = updated;

        oldTitle.replaceWith(newTitle);

        task.title = updated;

        saveTasks();
        renderTasks();
    }
});

searchInput.addEventListener("input", () => {

    const keyword =
        searchInput.value.toLowerCase();

    const cards =
        document.querySelectorAll(".task-card");

    cards.forEach(card => {

        const title =
            card.querySelector(".task-title")
                .textContent
                .toLowerCase();

        if (title.includes(keyword)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});


filterCategory.addEventListener("change", () => {

    const selected =
        filterCategory.value;

    const cards =
        document.querySelectorAll(".task-card");

    cards.forEach(card => {

        const category =
            card.dataset.category;

        if (
            selected === "All" ||
            category === selected
        ) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

function updateStats() {

    const total = tasks.length;

    const completed =
        tasks.filter(
            task => task.completed
        ).length;

    const pending =
        total - completed;

    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;
}


clearAllBtn.addEventListener("click", () => {

    const confirmDelete =
        confirm("Delete all tasks?");

    if (!confirmDelete) return;

    tasks = [];

    saveTasks();
    renderTasks();
});

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

themeToggle.addEventListener("click", () => {

    const html =
        document.documentElement;

    const currentTheme =
        html.dataset.theme;

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    html.dataset.theme = newTheme;

    html.setAttribute(
        "data-theme",
        newTheme
    );

    localStorage.setItem(
        "theme",
        newTheme
    );

    html.classList.toggle(
        "light-mode"
    );

    themeToggle.textContent =
        newTheme === "dark"
            ? "🌙 Dark Mode"
            : "☀️ Light Mode";
});

function loadTheme() {

    const theme =
        localStorage.getItem("theme")
        || "dark";

    document.documentElement
        .setAttribute(
            "data-theme",
            theme
        );

    document.documentElement
        .dataset.theme = theme;

    themeToggle.textContent =
        theme === "dark"
            ? "🌙 Dark Mode"
            : "☀️ Light Mode";
}


attributeDemoBtn.addEventListener(
    "click",
    () => {

        console.clear();

        console.log(
            "PROPERTY VALUE:"
        );

        console.log(
            taskInput.value
        );

        console.log(
            "ATTRIBUTE VALUE:"
        );

        console.log(
            taskInput.getAttribute(
                "value"
            )
        );

    }
);

setTimeout(() => {

    const firstCard =
        document.querySelector(
            ".task-card"
        );

    if (!firstCard) return;

    console.log(
        firstCard.hasAttribute(
            "data-id"
        )
    );

    console.log(
        firstCard.getAttribute(
            "data-id"
        )
    );

    firstCard.setAttribute(
        "data-demo",
        "example"
    );

    firstCard.removeAttribute(
        "data-demo"
    );

    console.log(
        "hasAttribute:",
        firstCard.hasAttribute("data-id")
    );

    console.log(
        "getAttribute:",
        firstCard.getAttribute("data-id")
    );

    console.log(
        "dataset:",
        firstCard.dataset
    );

}, 3000);


const grandparent =
    document.getElementById(
        "grandparent"
    );

const parent =
    document.getElementById(
        "parent"
    );

const childBtn =
    document.getElementById(
        "childBtn"
    );


grandparent.addEventListener(
    "click",
    () => {
        console.log(
            "Grandparent Capture"
        );
    },
    true
);

parent.addEventListener(
    "click",
    () => {
        console.log(
            "Parent Capture"
        );
    },
    true
);

childBtn.addEventListener(
    "click",
    () => {
        console.log(
            "Child Capture"
        );
    },
    true
);


grandparent.addEventListener(
    "click",
    () => {
        console.log(
            "Grandparent Bubble"
        );
    }
);

parent.addEventListener(
    "click",
    () => {
        console.log(
            "Parent Bubble"
        );
    }
);

childBtn.addEventListener(
    "click",
    () => {
        console.log(
            "Child Bubble"
        );
    }
);

const demoBtn =
    document.getElementById(
        "demoMethodsBtn"
    );

if (demoBtn) {

    demoBtn.addEventListener(
        "click",
        () => {

            const box =
                document.getElementById(
                    "demoBox"
                );

            if (!box) {
                alert(
                    "Demo already executed. Refresh the page to run it again."
                );
                return;
            }

            const beforeNode =
                document.createElement("p");

            beforeNode.textContent =
                "Inserted Before";

            const afterNode =
                document.createElement("p");

            afterNode.textContent =
                "Inserted After";

            box.before(beforeNode);

            box.after(afterNode);

            const replacement =
                document.createElement("h3");

            replacement.textContent =
                "Element Replaced Successfully";

            setTimeout(() => {

                box.replaceWith(
                    replacement
                );

            }, 1000);
        }
    );
}