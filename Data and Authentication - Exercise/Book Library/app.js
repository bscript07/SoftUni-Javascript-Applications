import { render } from "../node_modules/lit-html/lit-html.js";
import { getAllBooks, createBook, updateBook, deleteBook } from "./src/api.js";
import { mainTemplate } from "./src/templates/mainTemplate.js";
import { tableRowTemplate } from "./src/templates/tableRowsTemplate.js";
import { editButtonHandler } from "./src/actions.js";

const body = document.querySelector("body");
render(mainTemplate(), body);

document.querySelector("#loadBooks").addEventListener("click", async () => {
    const booksData = await getAllBooks();
    const section = body.querySelector("table tbody");
    const books = [];

    for (const id in booksData) {
        books.push({
            author: booksData[id].author,
            title: booksData[id].title,
            _id: id,
        });
    }
    const context = {
        books,
        deleteFunction,
        editButtonHandler
    };
    render(tableRowTemplate(context), section);
});

const addFormElement = document.querySelector("#add-form");
    addFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(addFormElement);
    const author = formData.get("author");
    const title = formData.get("title");

    if (!title || !author) {
        return alert("Please enter all fields");
    }

    const book = {
        author,
        title
    };

    await createBook(book)
    .then(() => {
        addFormElement.reset();
        body.querySelector("#loadBooks").click();
    });
})

const editFormElement = body.querySelector("#edit-form");
editFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(editFormElement);
    const id = formData.get("id");
    const author = formData.get("author");
    const title = formData.get("title");

    if (!title ||!author) {
        return alert("Please enter all fields");
    }

    const book = {
        author,
        title
    };

   updateBook(id, book).then(() => {
    body.querySelector("#loadBooks").click();
    editFormElement.style.display = "none";
    editFormElement.reset();
    addFormElement.style.display = "block";
   })
});

function deleteFunction(id) {
    deleteBook(id);
    body.querySelector("#loadBooks").click();
}
