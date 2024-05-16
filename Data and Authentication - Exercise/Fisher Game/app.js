function app () {
    const accessToken = sessionStorage.getItem("accessToken");
    const loggedUser = sessionStorage.getItem("loggedUser");
    const addBtnEl = document.getElementsByClassName("add")[0];
    addBtnEl.addEventListener('click', onAdd);

    const addFormEl= document.getElementById("addForm");

    if (loggedUser) {
       document.querySelector("span").textContent = loggedUser;
    } else {
        document.querySelector("span").textContent = "guest";
    }

    if (accessToken) {
        document.getElementById("login").style.display = "none";
        document.getElementById("register").style.display = "none";

        document.getElementById("logout").style.display = "inline";
        addBtnEl.disabled = false;
    } else {
        document.getElementById("login").style.display = "inline";
        document.getElementById("register").style.display = "inline";

        document.getElementById("logout").style.display = "none";
        addBtnEl.disabled = true;
    }

    document.getElementById("logout").addEventListener('click', onLogout);

    async function onLogout() {
        await fetch("http://localhost:3030/users/logout", {
            method: "GET",
            headers: {"X-Authorization": accessToken},
        });

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("loggedUser");
        sessionStorage.removeItem("id");

        window.location = "index.html";
    }

    const catchesDiv = document.getElementById("catches");
    Array.from(catchesDiv.children).forEach(child => child.remove());

    const loadBtn = document.getElementsByClassName("load")[0];
    loadBtn.addEventListener('click', onLoad);

    async function onLoad() {
        Array.from(catchesDiv.children).forEach(child => child.remove());

        const response = await fetch("http://localhost:3030/data/catches");
        const catches = await response.json();

        for (const currentCatch of catches) {
            const catchDivElement = createElements("div", "", catchesDiv, {
                class: "catch",
            });

            createElements("label", "Angler", catchDivElement, {});
            createElements("input", "", catchDivElement, {
                type: "text",
                class: "angler",
                value: currentCatch.angler
            });

            createElements("label", "Weight", catchDivElement, {});
            createElements("input", "", catchDivElement, {
                type: "text",
                class: "weight",
                value: currentCatch.weight
            });

            createElements("label", "Species", catchDivElement, {});
            createElements("input", "", catchDivElement, {
                type: "text",
                class: "species",
                value: currentCatch.species
            });

            createElements("label", "Location", catchDivElement, {});
            createElements("input", "", catchDivElement, {
                type: "text",
                class: "location",
                value: currentCatch.location
            });

            createElements("label", "Bait", catchDivElement, {});
            createElements("input", "", catchDivElement, {
                type: "text",
                class: "bait",
                value: currentCatch.bait
            });

            createElements("label", "Capture Time", catchDivElement, {});
            createElements("input", "", catchDivElement, {
                type: "text",
                class: "captureTime",
                value: currentCatch.captureTime
            });

            const btnUpdate = createElements("button", "Update", catchDivElement, {
                class: "update",
                "data-id": currentCatch._id
            });
            btnUpdate.addEventListener('click', onUpdate);

            const btnDelete = createElements("button", "Delete", catchDivElement, {
                class: "delete",
                "data-id": currentCatch._id
            });
            btnDelete.addEventListener('click', onDelete);

            const loggedUserId = sessionStorage.getItem("id");
            if (loggedUserId !== currentCatch._ownerId) {
                btnUpdate.disabled = true;
                btnDelete.disabled = true;
            }
        }
    }

    async function onUpdate(event) {
        const catchDivElement = event.target.parentElement;

        const angler = catchDivElement.getElementsByClassName("angler")[0].value.trim();
        const weight = catchDivElement.getElementsByClassName("weight")[0].value.trim();
        const species = catchDivElement.getElementsByClassName("species")[0].value.trim();
        const location = catchDivElement.getElementsByClassName("location")[0].value.trim();
        const bait = catchDivElement.getElementsByClassName("bait")[0].value.trim();
        const captureTime= catchDivElement.getElementsByClassName("captureTime")[0].value.trim();

        if (!angler) {
            alert("angler is required");
        } else if (!weight) {
            alert("weight is required");
        } else if (!species) {
            alert("species is required");
        } else if (!location) {
            alert("location is required");
        } else if (!bait) {
            alert("bait is required");
        } else if (!captureTime) {
            alert("captureTime is required");
        }

        if (angler && weight && species && location && bait && captureTime) {
            try {
                const response = await fetch(`http://localhost:3030/data/catches/${event.target.dataset.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': accessToken
                    },
                    body: JSON.stringify({
                        angler,
                        weight,
                        species,
                        location,
                        bait,
                        captureTime
                    })
                })

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                await onLoad();
            } catch (error) {
                alert(error.message);
            }
        }
    }

    async function onDelete(event) {
        const response = await fetch(`http://localhost:3030/data/catches/${event.target.dataset.id}`, {
            method: 'DELETE',
            headers: {"X-Authorization": accessToken},
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        } else {
            await onLoad();
        }
    }

    async function onAdd(event) {
        event.preventDefault();

        const formData = new FormData(addFormEl);

        const angler = formData.get("angler");
        const weight = formData.get("weight");
        const species = formData.get("species");
        const location = formData.get("location");
        const bait = formData.get("bait");
        const captureTime = formData.get("captureTime");

        if (!angler) {
            alert("angler is required");
        } else if (!weight) {
            alert("weight is required");
        } else if (!species) {
            alert("species is required");
        } else if (!location) {
            alert("location is required");
        } else if (!bait) {
            alert("bait is required");
        } else if (!captureTime) {
            alert("captureTime is required");
        }

        if (angler && weight && species && location && bait && captureTime) {
            try {
                const response = await fetch("http://localhost:3030/data/catches", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': accessToken
                    },
                    body: JSON.stringify({
                        angler,
                        weight,
                        species,
                        location,
                        bait,
                        captureTime
                    })
                })
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

               // Array.from(addFormEl.querySelectorAll("input")).forEach(input => input.value = "");
                await onLoad();
            } catch (error) {
                alert(error.message);
            }
        }
    }
    function createElements(type, content, parent, attributes) {
        const element = document.createElement(type);
        element.textContent = content;

        if (parent) {
            parent.appendChild(element);
        }

        for (const [attribute, value] of Object.entries(attributes)) {
            element.setAttribute(attribute, value);
        }

        return element;
    }
}
app()