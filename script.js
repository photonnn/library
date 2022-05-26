
const addbtn = document.querySelector("#add");
const form = document.querySelector("form");
const cover = document.querySelector(".cover");
const content = document.querySelector(".content");
const redbtn = document.querySelector(".red");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");


addbtn.addEventListener("click", () => {
    form.style.visibility = "visible";
    cover.style.display = "block";
});

redbtn.addEventListener("click", () => {
    form.style.visibility = "hidden";
    cover.style.display = "none";
});

form.addEventListener("submit", () => {
    addDivToContentDiv();
    form.style.visibility = "hidden";
    cover.style.display = "none"
});

function addDivToContentDiv() {
    const div = document.createElement("div");
    div.classList.add("book");
    content.appendChild(div);
    addBookToLibrary(div);
}

let myLibrary = [];

function book() {
    this.title = "";
    this.author = "";
    this.pages = "";
    this.read = false;
}

// runs after submitting form
function addBookToLibrary(div) {
    const obj = new book();
    assignValuesToObject(obj);
    addContentToBook(obj, div);

    const rbtn = document.createElement("button");
    rbtn.textContent = "Remove";
    rbtn.dataset.id = obj.id;
    div.appendChild(rbtn);
    rbtn.addEventListener("click", () => {
        removeFromMyLibrary(rbtn);
        rbtn.parentElement.remove();
    })
}

// add elements to the div corresponding to the object and add id to make 
// connection between them
function addContentToBook(obj, div) {
    let countP = 1;
    for (let em in obj) {
        const p = document.createElement("p");
        if (typeof (obj[em]) == "boolean") {
            assignId(obj);
            const readBtn = document.createElement("button");
            if (obj[em]) {
                div.style.border = "5px solid green";
                readBtn.textContent = "Unfinish";

            } else {
                div.style.border = "5px solid red";
                readBtn.textContent = "Finish";
            }
            div.appendChild(readBtn);
            readBtn.addEventListener('click', () => {
                if (readBtn.parentElement.style.border == "5px solid red") {
                    readBtn.parentElement.style.border = "5px solid green";
                    readBtn.textContent = "Unfinish";
                } else {
                    readBtn.parentElement.style.border = "5px solid red";
                    readBtn.textContent = "Finish";
                }
            });
        } else {
            p.textContent = obj[em];
            if (countP == 3) {
                p.textContent += " pages"
            }
            countP++;
            div.appendChild(p);
        }
    }
}

function assignId(obj) {
    if (myLibrary.length != 0) {
        obj.id = myLibrary[myLibrary.length - 1].id + 1
    } else {
        obj.id = 1;
    }
}

function assignValuesToObject(obj) {
    obj.title = title.value;
    obj.author = author.value;
    obj.pages = pages.value;
    obj.read = read.checked;
    myLibrary.push(obj);
    clearForm();
}

function clearForm() {
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
}

// we can remove them properly because we assigned them the same id
function removeFromMyLibrary(button) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == button.dataset.id) {
            myLibrary.splice(i, 1);
            break;
        }
    }
}