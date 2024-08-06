
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
    li.innerHTML = `<div id="df" class="m-2  grid grid-cols-4 gap-2 text-white ">
        <input type="checkbox" class=" mr-2 text-lime-500 w-[25px] todoChecked" ${
          item.disable ? "checked" : ""
        }>
        <span id="span" class="${item.disable ? "disabled" : ""} span text-white overflow-auto">${item.name}</span>
        <button class=" editBtn   bg-[#5eff00] text-white font-bold px-4 py-1 rounded-md">Edit</button>
        <button class="deleteBtn bg-[red] text-white font-bold px-4 py-1 rounded-md">Delete</button>
        </div>`;
    ol.appendChild(li);

    li.querySelector(".todoChecked").addEventListener("change", () => {
      item.disable = !item.disable;
    
      saveLocal();
      output()
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


function spanCheck() {
  let span = document.getElementById("span")
  span.classList.toggle("checked")
}
spanCheck()