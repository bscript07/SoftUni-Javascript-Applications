function attachEvents() {
    const uri = "http://localhost:3030/jsonstore/messenger";
    const textArea = document.getElementById("messages");
    document.getElementById("refresh").addEventListener('click', loadingContent);
    document.getElementById("submit").addEventListener('click', submitComments);

    async function loadingContent(e) {
        textArea.textContent = "";
        const response = await fetch(uri);
        const data = await response.json();

        Object.values(data).forEach(row => {
            textArea.textContent += `${row.author}: ${row.content}\n`;
        });
        textArea.textContent = textArea.textContent.trim();
    }

    async function submitComments(e) {
        const dataRef = document.querySelectorAll("#controls input[type='text']");
        const author = dataRef[0].value;
        const content = dataRef[1].value;
        
        const data = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author,
                content
            })
        }
        fetch(uri, data);
        dataRef[0].value = "";
        dataRef[1].value = "";
    }
}

attachEvents();