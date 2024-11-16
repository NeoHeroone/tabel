let thead = document.querySelector("thead");
let tbody = document.querySelector("tbody");
let form = document.querySelector("form");
let addNewBtn = document.getElementById("addNewBtn");
let formTitle = document.getElementById("formTitle");
let submitBtn = document.getElementById("submitBtn");

let crudDatas = JSON.parse(localStorage.getItem("crudDatas")) || [
  { id: 1, name: "John Doe", email: "johndoe@mail.com", num: "(171) 555-2222" },
  { id: 2, name: "Peter Parker", email: "peterparker@mail.com", num: "(313) 555-5735" },
  { id: 3, name: "Fran Wilson", email: "franwilson@mail.com", num: "(503) 555-9931" },
];

let editId = null;

thead.innerHTML = `<tr>${Object.keys(crudDatas[0])
  .map((key) => `<th>${key[0].toUpperCase() + key.slice(1)}</th>`)
  .join("")}<th>Action</th></tr>`;

const renderTableData = (datas) => {
  tbody.innerHTML = datas.length
    ? datas
        .map(
          (val) => `
      <tr>
        <td>${val.id}</td>
        <td>${val.name}</td>
        <td>${val.email}</td>
        <td>${val.num}</td>
        <td>
          <button onclick="onEdit(${val.id})">🖍️</button>
          <button onclick="onDelete(${val.id})">🗑️</button>
        </td>
      </tr>`
        )
        .join("")
    : `<tr><td colspan="5">No data found</td></tr>`;
  localStorage.setItem("crudDatas", JSON.stringify(datas));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let [nameText, emailText, numText] = [...form.querySelectorAll("input")].map((input) => input.value);
  if (!nameText || !emailText || !numText) return alert("Please fill in all fields");

  if (editId !== null) {
    crudDatas = crudDatas.map((data) =>
      data.id === editId ? { id: editId, name: nameText, email: emailText, num: numText } : data
    );
    editId = null;
    formTitle.textContent = "Add New Data";
    submitBtn.textContent = "Add New";
  } else {
    crudDatas.push({ id: crudDatas.length + 1, name: nameText, email: emailText, num: numText });
  }
  form.reset();
  form.classList.add("hidden");
  renderTableData(crudDatas);
});

window.onDelete = (id) => {
  crudDatas = crudDatas.filter((val) => val.id !== id);
  renderTableData(crudDatas);
};

window.onEdit = (id) => {
  let val = crudDatas.find((data) => data.id === id);
  form.classList.remove("hidden");
  formTitle.textContent = "Edit Data";
  submitBtn.textContent = "Update";
  form.querySelectorAll("input")[0].value = val.name;
  form.querySelectorAll("input")[1].value = val.email;
  form.querySelectorAll("input")[2].value = val.num;
  editId = id;
};

addNewBtn.addEventListener("click", () => {
  form.classList.toggle("hidden");
  if (form.classList.contains("hidden")) form.reset();
  formTitle.textContent = "Add New Data";
  submitBtn.textContent = "Add New";
  editId = null;
});

renderTableData(crudDatas);
