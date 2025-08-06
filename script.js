// LIVE CLOCK
function updateClock() {
  let now = new Date();
  document.getElementById("clock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// DAYS SINCE
document.getElementById("startDate").addEventListener("change", function () {
  let start = new Date(this.value);
  let today = new Date();
  let diff = today - start;
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("daysCount").innerText = `⏳ Days since selected date: ${days}`;
});

// TASK TRACKER
function saveTask() {
  let input = document.getElementById("taskInput");
  let task = input.value.trim();
  if (!task) return;

  let now = new Date();
  let timestamp = now.toLocaleTimeString();
  let item = { text: task, time: timestamp };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(item);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  showTasks();
  input.value = "";
}

function showTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let list = document.getElementById("taskList");
  list.innerHTML = "";
  
  tasks.forEach((task, index) => {
      let li = document.createElement("li");
      //Task text
      let span = document.createElement("span");
      span.innerText = `${task.text} @ ${task.time}`;
      li.appendChild(span);
    
      // Edit button
      let editBtn = document.createElement("button");
      editBtn.innerText = "✏️";
      editBtn.style.marginLeft = "10px";
      editBtn.onclick = () => editTask(index);
      li.appendChild(editBtn);
      
      
      // Delete button
      let delBtn = document.createElement("button");
      delBtn.innerText = "🥤"
      delBtn.style.marginLeft = "5px";
      delBtn.onclick = () => deleteTask(index);
      li.appendChild(delBtn);
      
      list.appendChild(li);
      });
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

function editTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }
}

showTasks();
