async function lockedProfile() {

    const url = `http://localhost:3030`;
    const endPoint = `${url}/jsonstore/advanced/profiles`;

    const response = await fetch(endPoint);
    const data = await response.json();
    const mainEl = document.getElementById('main');
    mainEl.innerHTML = '';
    
    let counter = 0;
    for (const profile in data) {

        const template = `<div class="profile">
            <img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user${++counter}Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user${counter}Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user${counter}Username" value="${data[profile].username}" disabled readonly />
            <div class="hiddenInfo" disabled readonly>
                <hr>
                <label>Email:</label>
                <input type="email" name="user${counter}Email" value="${data[profile].email}"/>
                <label>Age:</label>
                <input type="email" name="user${counter}Age" value="${data[profile].age}"/>
            </div>
    
            <button>Show more</button>
        </div>`;

        mainEl.innerHTML += template + '\n';

    }

    mainEl.innerHTML.trimEnd();

    const buttons = Array.from(document.getElementsByTagName('button'));
    buttons.forEach(btn => btn.addEventListener('click', hideFields));

    function hideFields(event) {

        if(event.target.parentNode.children[2].checked) {
            return;
        }
        
        if(event.target.textContent === 'Show more') {
            
            event.target.parentNode.children[9].style.display = 'block';
            event.target.parentNode.children[9].classList.remove('hiddenInfo');
            event.target.parentNode.children[9].children[2].style.display = 'block';
            event.target.parentNode.children[9].children[3].style.display = 'block';
            event.target.textContent = 'Hide it';

        } else {

            event.target.parentNode.children[9].style.display = 'none';
            event.target.parentNode.children[9].classList.add('hiddenInfo');

            event.target.textContent = 'Show more'

        }

    }

}

