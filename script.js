
const addbtn = document.querySelector("#add");
const form = document.querySelector("form");
const cover = document.querySelector(".cover");

const redbtn = document.querySelector(".red");
const greenbtn = document.querySelector(".green");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

const content = document.querySelector(".content");


addbtn.addEventListener("click", () => {
    changeDisplay("block");
});

redbtn.addEventListener("click", () => {
    changeDisplay("none");
});

greenbtn.addEventListener("click", () => {
    addDivToContentDiv();
    changeDisplay("none");
});

function addDivToContentDiv() {
    const div = document.createElement("div");
    div.classList.add("book");
    content.appendChild(div);
    addBookToLibrary(div);
}

function changeDisplay(str) {
    form.style.display = str;
    cover.style.display = str;
}

let myLibrary = [];

function book() {
    this.title = "";
    this.author = "";
    this.pages = "";
    this.read = false;
}

function addBookToLibrary(div) {
    const obj = new book();
    assignValuesToObject(obj);
    addContentToBook(obj, div);

    const rbtn = document.createElement("button");
    rbtn.textContent = "Remove";
    rbtn.dataset.id = obj.id;
    div.appendChild(rbtn);
    rbtn.addEventListener("click", () => {
        removeFromMyLibrary(rbtn); // bug can't go to 0!
        rbtn.parentElement.remove();
    })
}

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
            if (countP == 3 && obj[em] != "") {
                if (obj[em] > 13095) {
                    p.textContent = "13095 pages";
                } else {
                    p.textContent = obj[em] + " pages"
                }
                
            } else {
                p.textContent = obj[em];
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

function removeFromMyLibrary(button) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == button.dataset.id) {
            myLibrary.splice(i, 1);
            break;
        }
    }
}

// temp fix
function enforceMinMax(el){
    if(el.value != ""){
      if(parseInt(el.value) < parseInt(el.min)){
        el.value = el.min;
      }
      if(parseInt(el.value) > parseInt(el.max)){
        el.value = el.max;
      }
    }
  }