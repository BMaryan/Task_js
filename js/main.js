let form = document.querySelector(".form");
let formBox = document.querySelectorAll(".form-box");
let inputs = document.querySelectorAll("input");
let inputLogin = document.querySelector(".input__login");
let inputEmail = document.querySelector(".input__email");
let inputPassword = document.querySelector(".input__password");
let button = document.querySelector(".button");
// for saveEditUser() and userDelete()
let array = [];

// addUser
function addUser(index, login, email, password) {
    let obj = {
        index: index,
        login: login,
        email: email,
        password: password
    };
    if (inputLogin.style.border == "1px solid red" || inputEmail.style.border == "1px solid red" || inputPassword.style.border == "1px solid red") {
        alert("Заповнені дані є не валідні!");
        return false;
    } else {
        array.push(obj);
    }
    render();
}

let tabelBody;
let tr;
let buttonEdit;
let buttonDelete;

// generates information to tabel
function render() {
    tabelBody = document.querySelector(".tabel__tbody");
    tabelBody.innerHTML = "";

    array.map((item) => {
        tr = document.createElement("tr");
        let tdIndex = document.createElement("td");
        tdIndex.innerHTML = item.index;
        let tdLogin = document.createElement("td");
        tdLogin.innerHTML = item.login;
        let tdEmail = document.createElement("td");
        tdEmail.innerHTML = item.email;
        let tdPassword = document.createElement("td");
        tdPassword.innerHTML = item.password;
        let tdEdit = document.createElement("td");
        buttonEdit = document.createElement('button');
        buttonEdit.addEventListener("click", () => {
            button.style.display = "none";
            let buttonUserEdit = document.querySelector(".buttonUserEdit");
            buttonUserEdit.style.display = 'block';
            buttonUserEdit.addEventListener("click", () => {
                saveEditUser(userIndex.index, inputLogin.value, inputEmail.value, inputPassword.value);
                buttonUserEdit.style.display = 'none';
                button.style.display = "block";
                inputLogin.style.border = "1px solid rgb(161, 157, 157)";
                inputEmail.style.border = "1px solid rgb(161, 157, 157)";
                inputPassword.style.border = "1px solid rgb(161, 157, 157)";
                // inputLogin.value = "";
                // inputEmail.value = "";
                // inputPassword.value = "";
            });
            editUser(item);
        });
        tdEdit.appendChild(buttonEdit);
        buttonEdit.className = "buttonEdit";
        buttonEdit.innerHTML = "<button class='buttonEdit'>Edit</button>";
        let tdDelete = document.createElement("td");
        buttonDelete = document.createElement('button');
        buttonDelete.addEventListener("click", () => {
            deleteUser(item);
        });
        tdDelete.appendChild(buttonDelete);
        buttonDelete.className = "buttonDelete";
        buttonDelete.innerHTML = "<button class='buttonDelete'>Delete</button>";
        tr.appendChild(tdIndex);
        tr.appendChild(tdLogin);
        tr.appendChild(tdEmail);
        tr.appendChild(tdPassword);
        tr.appendChild(tdEdit);
        tr.appendChild(tdDelete);

        tabelBody.appendChild(tr);
    });
}

let userIndex;
// buttonEdit
function editUser(item) {
    userIndex = item;
    inputLogin.value = item.login;
    inputEmail.value = item.email;
    inputPassword.value = item.password;
}

// saveEditUser
function saveEditUser(index, login, email, password) {
    let newObj = {
        index: index,
        login: login,
        email: email,
        password: password
    };
    array.splice(userIndex.index - 1, 1, newObj);
    render();
}

// deleteUser
function deleteUser(item) {
    let itemIndex = array.indexOf(item.index);
    array.splice(itemIndex, 1);
    // console.log(item.index);
    // console.log(item);
    // console.log(array);
    render();
}

// button onclick
document.querySelector(".button").addEventListener("click", function(event) {
    if (inputLogin.value === "" && inputEmail.value === "" && inputPassword.value === "") {
        alert("Пусті поля не можна добавляти!");
        return false;
    } else {
        addUser(array.length + 1, inputLogin.value, inputEmail.value, inputPassword.value);
    }

    inputLogin.style.border = "1px solid rgb(161, 157, 157)";
    inputEmail.style.border = "1px solid rgb(161, 157, 157)";
    inputPassword.style.border = "1px solid rgb(161, 157, 157)";
    inputLogin.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
});

// login validation
function loginValidation() {
    let reg = /^[a-zA-Z]{4,16}$/;
    if (reg.exec(inputLogin.value) == undefined) {
        inputLogin.style.border = "1px solid red";
    } else {
        inputLogin.style.border = "1px solid green";
        return reg.exec(inputLogin.value);
    }
}

// email address validation
function emailAddressValidation() {
    let reg = /^[\w-.]+@[a-zA-Z]*(\.gmail\.com|\.net\.ua|\.org\.ua|gmail\.com|net\.ua|org\.ua)$/;
    if (reg.exec(inputEmail.value) == undefined) {
        inputEmail.style.border = "1px solid red";
    } else {
        inputEmail.style.border = "1px solid green";
        return reg.exec(inputEmail.value);
    }
}

// password validation
function passwordValidation() {
    let reg = /^[\w\.\_\-\.]{8,15}$/;
    if (reg.exec(inputPassword.value) == undefined) {
        inputPassword.style.border = "1px solid red";
    } else {
        inputPassword.style.border = "1px solid green";
        return reg.exec(inputPassword.value);
    }
}

// inputs validation change of border
function inputsChangeBorder() {
    inputLogin.addEventListener("input", function(event) {
        loginValidation();
    });
    inputEmail.addEventListener("input", function(event) {
        emailAddressValidation();
    });
    inputPassword.addEventListener("input", function(event) {
        passwordValidation();
    });
}
inputsChangeBorder();