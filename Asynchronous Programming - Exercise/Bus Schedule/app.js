function solve() {

    const spanRef = document.querySelector("div[id='info'] span");
    const baseURI = "http://localhost:3000/jsonstore/bus/schedule/";
    const arriveBtn = document.getElementById("arrive");
    const departBtn = document.getElementById("depart");
    let currentStop = '';

    let nextStop = "depot";

    function depart() {
       fetch(baseURI + nextStop).then(response => {
        response.json().then(data => {
            nextStop = data.next;
            currentStop = data.name;
            spanRef.textContent = `Next stop ${data.name}`;

            arriveBtn.disabled = false;
            departBtn.disabled = true;
        })
       }).catch(e => {
        arriveBtn.disabled = true;
        departBtn.disabled = true;
        spanRef.textContent = "Error";
       })
    }

    function arrive() {
        spanRef.textContent = `Arriving at ${currentStop}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();