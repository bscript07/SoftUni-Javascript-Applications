const url = "http://localhost:3030/jsonstore/collections/books";

   export function getAllBooks() {
    return fetch(url).then(res => res.json());
}

export async function createBook(bookObject) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookObject)
    }).then(res => res.json());
}

   export function getBookById(id) {
    return fetch(`${url}/${id}`).then(res => res.json());
}

   export function updateBook(id, bookObject) {
    return fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookObject)
    }).then(res => res.json());
   }

   export function deleteBook(id) {
    return fetch(`${url}/${id}`, {
        method: "DELETE"
    }).then(res => res.json());
   }