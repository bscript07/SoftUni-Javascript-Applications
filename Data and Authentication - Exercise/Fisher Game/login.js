function login() {

    const accessToken = sessionStorage.getItem("accessToken"); //user data authorization

    if (accessToken) {
        document.getElementById("logout").style.display = "inline";
    } else {
        document.getElementById("logout").style.display = "none";
    }

    const regBtnEl = document.querySelector("button");
    const formEl = document.querySelector("form");
    const notificationP = document.getElementsByClassName("notification")[0];

    regBtnEl.addEventListener("click", onLogin);

    async function onLogin(event) {
        event.preventDefault();

        const formData = new FormData(formEl);
        const email = formData.get("email");
        const password = formData.get("password");
        
        if (!email) {
            notificationP.textContent = "Email is required!";
        } else if (!password) {
            notificationP.textContent = "Password is required!";
        }

        if (email && password) {
            try {
                const response = await fetch("http://localhost:3030/users/login", {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({email, password})
                });
                if (!response.ok) {
                    const err = new Error(response.statusText);
                    throw err;
                }
                const data = await response.json();
                
                sessionStorage.setItem("accessToken", data.accessToken);
                sessionStorage.setItem("loggedUser", data.email);
                sessionStorage.setItem("id", data._id);

                window.location = "index.html";
            } catch (err) {
                notificationP.textContent = err.message;
            }
        }
    }
}

login();