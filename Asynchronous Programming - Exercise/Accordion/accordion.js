async function solution () {
    const main = document.getElementById("main");
    const url = "http://localhost:3030/jsonstore/advanced/articles/list";
    const response = await fetch(url);
    const data = await response.json();

    data.forEach(acc => {
        let divElement = createElement("div", "", ["class", "accordion"]);
        let divHead = createElement("div", "", ["class", "head"]);
        let span = createElement("span", acc.title);
        let button = createElement("button", "More", ["class", "button", "id", acc._id]);

        let extraDiv = createElement("div", "", ["class", "extra"]);
        let p = createElement("p");

        button.addEventListener('click', toggle);

        extraDiv.appendChild(p);
        divElement.appendChild(extraDiv);
        divHead.appendChild(button);
        divHead.appendChild(span);
        divElement.appendChild(divHead);
        main.appendChild(divElement);
    });

    async function toggle(e) {
        const accordion = e.target.parentNode.parentNode;
        const paragraph = e.target.parentNode.parentNode.children[0].children[0];
        const extra = e.target.parentNode.parentNode.children[0];

        const id = e.target.id;
        const url = ` http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        const response = await fetch(url);
        const data = await response.json();

        paragraph.textContent = data.content;

        const hidden = e.target.textContent === "More";
        extra.style.display = hidden ? "block" : "none";

        e.target.textContent = hidden ? "Less" : "More";

    }


    function createElement(type, content, attributes = []) {
        const element = document.createElement(type);

        if (content) {
            element.textContent = content; 
        }

        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i+=2) {
                element.setAttribute(attributes[i], attributes[i+1]);
            }
        }
        return element;
         
    }
}
solution();


