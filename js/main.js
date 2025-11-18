// シンプルなタスク管理 & ダークモード切替

const taskInput = document.getElementById("taskInput");
const taskTag = document.getElementById("taskTag");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

const statTotal = document.getElementById("statTotal");
const statDone = document.getElementById("statDone");
const statTodo = document.getElementById("statTodo");

const themeToggle = document.getElementById("themeToggle");
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

let tasks = [];
let currentFilter = "all";

// 追加ボタン
addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  const tag = taskTag.value;
  tasks.push({
    id: Date.now(),
    text,
    tag,
    done: false,
  });

  taskInput.value = "";
  renderTasks();
});

// タスク描画
function renderTasks() {
  taskList.innerHTML = "";
  const filtered = tasks.filter((t) =>
    currentFilter === "all" ? true : t.tag === currentFilter
  );

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.done ? " done" : "");

    const left = document.createElement("div");
    left.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = !task.done;
      renderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.text;

    left.appendChild(checkbox);
    left.appendChild(span);

    if (task.tag !== "all") {
      const tagSpan = document.createElement("span");
      tagSpan.className = "task-tag";
      tagSpan.textContent = task.tag.toUpperCase();
      left.appendChild(tagSpan);
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.className = "btn-outline";
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTasks();
    });

    li.appendChild(left);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateStats();
}

// フィルタ
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// 統計更新
function updateStats() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const todo = total - done;

  statTotal.textContent = total;
  statDone.textContent = done;
  statTodo.textContent = todo;
}

// ダークモード切替
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "Light"
    : "Dark";
});

// モーダル
openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// 初期描画
renderTasks();
