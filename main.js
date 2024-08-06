
let input = document.getElementById("input");
let save = document.getElementById("save");
let ol = document.getElementById("ol");
let total = document.getElementById("total");
let removeAll = document.getElementById("removeAll");
let arr = JSON.parse(localStorage.getItem("list")) || [];

document.addEventListener("DOMContentLoaded", () => {
  removeAll.addEventListener("click", removeAlls);
  save.addEventListener("click", (e) => {
    e.preventDefault();
    let inputValue = input.value.trim();
    if (inputValue !== "") {
      arr.push({ name: inputValue, disable: false });
      totalOutput();
    }

    saveLocal();
    output();
  });
  output();
});

function output() {
  input.value = "";
  ol.innerHTML = "";
  arr.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `<div class="m-2   row g-2">
        <input type="checkbox" class=" col-1 mr-2 todoChecked" ${
          item.disable ? "checked" : ""
        }>
        <span class="col-5">${item.name}</span>
        <button class="col-2 editBtn btn mr-2 btn-success">Edit</button>
        <button class="deleteBtn col-2  btn btn-danger">Delete</button>
        </div>`;
    ol.appendChild(li);

    li.querySelector(".todoChecked").addEventListener("change", () => {
      item.disable = !item.disable;
      saveLocal();
    });

    li.querySelector(".editBtn").addEventListener("click", () => {
      let newName = prompt("edit", item.name);
      if (newName !== "") {
        item.name = newName.trim();
        saveLocal();
        output();
      }
    });

    li.querySelector(".deleteBtn").addEventListener("click", () => {
      arr.splice(index, 1);
      saveLocal();
      output();
    });
  });
  totalOutput();
}

function saveLocal() {
  localStorage.setItem("list", JSON.stringify(arr));
}

function totalOutput() {
  total.innerHTML = arr.length;
}

function removeAlls() {
  arr = [];
  saveLocal();
  output();
}
