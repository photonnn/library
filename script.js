class library {

    constructor() {
        this.title = "";
        this.author = "";
        this.pages = "";
        this.read = false;
        this.myLibrary = [];
        this.main = () => {
            this.init();
        }
    }

    removeFromMyLibrary(button) {
        for (let i = 0; i < this.myLibrary.length; i++) {
            if (this.myLibrary[i].id == button.dataset.id) {
                this.myLibrary.splice(i, 1);
                break;
            }
        }
    }

    assignId(obj) {
        if (this.myLibrary.length != 0) {
            obj.id = this.myLibrary[this.myLibrary.length - 1].id + 1
        } else {
            obj.id = 1;
        }
    }

    assignValuesToObject(obj) {
        const title = document.querySelector("#title");
        const author = document.querySelector("#author");
        const pages = document.querySelector("#pages");
        const read = document.querySelector("#read");
        obj.title = title.value;
        obj.author = author.value;
        obj.pages = pages.value;
        obj.read = read.checked;
        this.myLibrary.push(obj);
        const form = document.querySelector("form");
        form.reset();
    }

    addContentToBook(obj, div) {
        let countP = 1;
        for (let em in obj) {
            const p = document.createElement("p");
            if (typeof (obj[em]) == "boolean") {
                this.assignId(obj);
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
            } else if (em != "myLibrary" && em != "main") {
                p.textContent = obj[em];
                if (countP == 3) {
                    p.textContent += " pages";
                }
                countP++;
                div.appendChild(p);

            }
        }
    }

    addBookToLibrary(div) {
        const obj = new library();
        this.assignValuesToObject(obj);
        this.addContentToBook(obj, div);

        const rbtn = document.createElement("button");
        rbtn.textContent = "Remove";
        rbtn.dataset.id = obj.id;
        div.appendChild(rbtn);
        rbtn.addEventListener("click", () => {
            this.removeFromMyLibrary(rbtn);
            rbtn.parentElement.remove();
        })
    }

    addDivToContentDiv() {
        const div = document.createElement("div");
        div.classList.add("book");
        const content = document.querySelector(".content");
        content.appendChild(div);
        this.addBookToLibrary(div);
    }

    validInputs() {
        const title = document.querySelector("#title");
        const author = document.querySelector("#author");
        const pages = document.querySelector("#pages");

        if (title.value == "") {
            alert("Please fill out the title field!");
        } else if (author.value == "") {
            alert("Please fill out the author field!");
        } else if (+pages.value <= 0 || +pages.value > 13095) {
            alert("Pages value only between 1 and 13095!");
        }

        return title.value != "" && author.value != "" && +pages.value > 0 &&
            +pages.value <= 13095;
    }

    init() {
        const addbtn = document.querySelector("#add");
        const grnbtn = document.querySelector(".green");
        const redbtn = document.querySelector(".red");
        const cover = document.querySelector(".cover");
        const form = document.querySelector("form");

        addbtn.addEventListener("click", () => {
            form.style.visibility = "visible";
            cover.style.display = "block";
        });

        redbtn.addEventListener("click", () => {
            form.style.visibility = "hidden";
            cover.style.display = "none";
        });

        grnbtn.addEventListener("click", () => {
            if (this.validInputs()) {
                this.addDivToContentDiv();
                form.style.visibility = "hidden";
                cover.style.display = "none";
            }
        });
    }
}

let user = new library();
user.main();

/*


const addbtn = document.querySelector("#add");
const form = document.querySelector("form");
const cover = document.querySelector(".cover");
const content = document.querySelector(".content");
const redbtn = document.querySelector(".red");
const grnbtn = document.querySelector(".green");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

let myLibrary = [];


addbtn.addEventListener("click", () => {
    form.style.visibility = "visible";
    cover.style.display = "block";
});

redbtn.addEventListener("click", () => {
    form.style.visibility = "hidden";
    cover.style.display = "none";
});

grnbtn.addEventListener("click", () => {
    if (validInputs()) {
        addDivToContentDiv();
        form.style.visibility = "hidden";
        cover.style.display = "none";
    }
});


function addDivToContentDiv() {
    const div = document.createElement("div");
    div.classList.add("book");
    content.appendChild(div);
    addBookToLibrary(div);
}

function validInputs() {
    if (title.value == "") {
        alert("Please fill out the title field!");
    } else if (author.value == "") {
        alert("Please fill out the author field!");
    } else if (+pages.value <= 0 || +pages.value > 13095) {
        alert("Pages value only between 1 and 13095!");
    }

    return title.value != "" && author.value != "" && +pages.value > 0 &&
        +pages.value <= 13095;
}

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
    form.reset();
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
*/