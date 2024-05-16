async function getInfo() {
    const baseURI = "http://localhost:3030/jsonstore/bus/businfo/";

    const stopIdReference = document.getElementById("stopId");
    const busId = stopIdReference.value;
    const div = document.getElementById("stopName");
    const ulRef = document.getElementById("buses");
    try {
        const response = await fetch(baseURI + busId);
        const data = await response.json();

        div.textContent = data.name;
        clear();

        for (const [bussesId, time] of Object.entries(data.buses)) {
            const li = document.createElement("li");
            li.textContent = `Bus ${bussesId} arrives in ${time} minutes`;
            ulRef.appendChild(li);
        }
    } catch (e) {
        errorMessage();
    }

    function errorMessage() {
        clear();
        div.textContent = "Error";
    }

    function clear() {
        stopIdReference.value = "";
        ulRef.innerHTML = "";
    }
}