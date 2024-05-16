function attachEvents() {
    const baseURL = "http://localhost:3030";
    const phoneBookUrl = "/jsonstore/phonebook";
    const phonebookEndPoint = `${baseURL}${phoneBookUrl}`;

    const phoneBookElement = document.getElementById("phonebook");

    const personInputField = document.getElementById("person");
    const phoneInputField = document.getElementById("phone");

    const createBtn = document.getElementById("btnCreate");
    createBtn.addEventListener('click', createRecord);

    const loadPhoneBookButton = document.getElementById("btnLoad");
    loadPhoneBookButton.addEventListener('click', loadingPhonebook);

    async function createRecord() {
        const requestBody = {person: personInputField.value, phone: phoneInputField.value};

        await fetch(phonebookEndPoint, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(requestBody)
        })
        loadingPhonebook();
    }

    async function deleteRecord(e) {
        e.preventDefault();
        const deleteEndPoint = `${phonebookEndPoint}/${e.target.parentNode.id}`;
        await fetch(deleteEndPoint, {
            method: "DELETE",
            headers: {"Content-type": "application/json"},
        })
        loadingPhonebook();
    }

    async function loadingPhonebook() {
        phoneBookElement.innerHTML = "";

        const phoneBookResponse = await fetch(phonebookEndPoint);
        const data = await phoneBookResponse.json();

        for (const record in data) {
            const listItem = document.createElement("li");
            listItem.textContent = `${data[record].person}: ${data[record].phone}`;
            listItem.id = record;
            phoneBookElement.appendChild(listItem);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener('click', deleteRecord);
            listItem.appendChild(deleteButton);
        }
    }
}

attachEvents();