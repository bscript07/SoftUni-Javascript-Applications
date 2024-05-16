import { html, render} from "./node_modules/lit-html/lit-html.js";

document.getElementById("btnLoadTowns").addEventListener('click', onClick);

function onClick(event) {
    event.preventDefault();

    let input = document.querySelector("#towns");
    const data = input.value.split(", ");
    
    const cardTemplate = 
    html `
        <ul>
            ${data.map((item) => html `<li>${item}</li>`)} 
        </ul>`;
    
    const root = document.getElementById("root");
    render(cardTemplate, root);
   // input.value = "";
}




const cardTemplate = (data) => {
    html `
    <ul>
       ${data.map((item) => html `<li>${item}</li>`)} 
    </ul>`;
}

