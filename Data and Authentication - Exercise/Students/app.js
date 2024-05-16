window.onload = attachEvents;

function attachEvents() {
    const baseURL = "http://localhost:3030";
    const studentsURL = "/jsonstore/collections/students";
    const studentsEndPoint = `${baseURL}${studentsURL}`;

    const tableBody = document.getElementById("results").children[1];

    const formData = document.getElementById("form");
    formData.addEventListener('submit', createRecord);
    studentsTotalData();

    async function createRecord(e) {
        e.preventDefault();

        const form = new FormData(e.target);

        const studentBody = {
            firstName: form.get("firstName"),
            lastName: form.get("lastName"),
            facultyNumber: form.get("facultyNumber"),
            grade: form.get("grade")
        }

        await fetch(studentsEndPoint, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(studentBody)
        })
        studentsTotalData()
    }

    async function studentsTotalData() {
        const response = await fetch(studentsEndPoint);
        const data = await response.json();

        tableBody.innerHTML = "";

        for (const student in data) {
            const trElement = document.createElement("tr");
            tableBody.appendChild(trElement);

            const firstNameElement = document.createElement("td");
            firstNameElement.textContent = data[student].firstName;
            trElement.appendChild(firstNameElement);

            const lastNameElement = document.createElement("td");
            lastNameElement.textContent = data[student].lastName;
            trElement.appendChild(lastNameElement);

            const facultyNumberElement = document.createElement("td");
            facultyNumberElement.textContent = data[student].facultyNumber;
            trElement.appendChild(facultyNumberElement);

            const gradeElement = document.createElement("td");
            gradeElement.textContent = data[student].grade;
            trElement.appendChild(gradeElement);
            
        }
    }
}