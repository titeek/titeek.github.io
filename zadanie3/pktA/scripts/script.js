let draggedElement;
let listOfLi;
let indexBefore;
let indexAfter;

const initialFunction = () => {
  let list = document.querySelector('#list').children;

  for (let i = 1; i < list.length; i += 1) {
    list[i].setAttribute("id", i);
  }
}

document.addEventListener("keydown", () => {
  let list = document.querySelector('#list').children;

  for (let i = 1; i < list.length; i += 1) {
    list[i].setAttribute("id", i);
  }

  if (list.length === 0) {
    let ol = document.querySelector('#list');
    let li = document.createElement("li");
    li.setAttribute("class","column");
    li.setAttribute("draggable","true");
    li.setAttribute("id", 1)
    ol.appendChild(li);
  }
})

document.addEventListener("dragstart", ({ target }) => {
  draggedElement = target;
  listOfLi = target.parentNode.children;

  for (let i = 0; i < listOfLi.length; i += 1) {
    if(listOfLi[i] === draggedElement) {
      indexBefore = i;
    }
  }
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.addEventListener("drop", ({ target }) => {
  if (target.className == "column" && target.id !== draggedElement.id) {
    draggedElement.remove(draggedElement);
    for (let i = 0; i < listOfLi.length; i += 1) {
      if(listOfLi[i] === target) {
        indexAfter = i;
      }
    }

    indexBefore > indexAfter ? target.before(draggedElement) : target.after(draggedElement);
  }
});

initialFunction();