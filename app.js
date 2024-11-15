let crudTab = document.querySelector(".crudTable");
let thead = document.querySelector("thead");
let tbody = document.querySelector("tbody");
let form = document.querySelector("form");

let crudDatas = JSON.parse(localStorage.getItem("crudDatas")) || [
  { id: 1, name: "John Doe", email: "johndoe@mail.com", num: "(171) 555-2222" },
  { id: 2, name: "Peter Parker", email: "peterparker@mail.com", num: "(313) 555-5735" },
  { id: 3, name: "Fran Wilson", email: "franwilson@mail.com", num: "(503) 555-9931" }
]

function renderTableHead() {
  let tr = document.createElement("tr");
  Object.keys(crudDatas[0]).forEach((key) => {
    let th = document.createElement("th");
    th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    tr.append(th);
  });
  
  let thAction = document.createElement("th");
  thAction.textContent = "Action";
  tr.append(thAction);
  
  thead.append(tr);
  
};

function renderTableData(datas) {
  tbody.innerHTML = "";
  datas.forEach((val) => {
    let tr = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdName = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdNumber = document.createElement("td");
    let tdAction = document.createElement("td");

    tdId.textContent = val.id;
    tdName.textContent = val.name;
    tdEmail.textContent = val.email;
    tdNumber.textContent = val.num;

    tr.append(tdId, tdName, tdEmail, tdNumber, tdAction);

    let delBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    editBtn.textContent = "Edit";
    tdAction.append(delBtn, editBtn);

    tbody.append(tr);

    delBtn.addEventListener("click", () => {
      onDelete(val.id);
    });
    editBtn.addEventListener("click", () => {
      onEdit(val);
    });
  });

  localStorage.setItem("crudDatas", JSON.stringify(crudDatas));
  
  if (datas.length === 0) {
    tbody.innerHTML = "<tr><td colspan='4'>No data found</td></tr>";
  }
}

renderTableData(crudDatas);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameText = e.target[0].value;
  let emailText = e.target[1].value;
  
  if (!nameText || !emailText) {
    alert("Please fill in all fields");
    return;
  }
  
  let newData = {
    id: crudDatas.length + 1,
    name: nameText,
    email: emailText,
  };
  
  crudDatas.push(newData);
  renderTableData(crudDatas);
  
  e.target[0].value = "";
  e.target[1].value = "";
});

function onDelete(id) {
  crudDatas = crudDatas.filter((val) => val.id !== id);
  renderTableData(crudDatas);
}

function onEdit(val) {
  let inputName = prompt("Enter new name:", val.name);
  let inputEmail = prompt("Enter new email:", val.email);
  
  if (inputName && inputEmail) {
    crudDatas = crudDatas.map((item) => 
      item.id === val.id ? { ...item, name: inputName, email: inputEmail } : item
    );
    renderTableData(crudDatas);
  }
}
