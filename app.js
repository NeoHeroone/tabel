let table = document.querySelector(".table");
let tbody = table.querySelector("tbody");

let data = [
  { id: 1, name: "John Doe", age: 25, action: "del edit" },
  { id: 2, name: "Jane Doe", age: 30, action: "del edit" },
  { id: 3, name: "Alice Doe", age: 28, action: "del edit" },
];

data.forEach((val) => {
  let tr = document.createElement("tr");

  let tdId = document.createElement("td");
  let tdName = document.createElement("td");
  let tdAge = document.createElement("td");
  let tdAction = document.createElement("td");

  tdId.textContent = val.id;
  tdName.textContent = val.name;
  tdAge.textContent = val.age;

  tr.append(tdId, tdName, tdAge, tdAction);

  val.action.split(" ").forEach((item) => {
    let actionBtn = document.createElement("button");
    actionBtn.textContent = item;

    if (item === "del") {
      actionBtn.addEventListener("click", () => {
        tr.remove();
      });
    } else if (item === "edit") {
      
      actionBtn.addEventListener("click", () => {
        tdName.contentEditable = true
        tdAge.contentEditable = true
      });
    }

    tdAction.append(actionBtn);
  });

  tbody.append(tr);
});
