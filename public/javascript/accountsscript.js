
const hasClass = (elem, className) => {
    return elem.classList.contains(className);
};

document.addEventListener('click', (e) => {

    if(hasClass(e.target, 'addUser')) {

        e.preventDefault();
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const confirmpassword = document.getElementById('confirmpassword').value;
        const permissions = document.getElementById('permissions').checked;
        const info = document.querySelector('.infoBox p');

        if (name.length < 4) {
            info.innerText = 'Nazwa użytkownika musi zawierać conajmniej 4 znaki!';
            info.style.color = 'red';
            return;
        };
        if (password.length < 6) {
            info.innerText = 'Hasło musi zawierać conajmniej 6 znaków!';
            info.style.color = 'red';
            return;
        };
        if (password !== confirmpassword) {
            info.innerText = 'Potwierzdzenie hasła jest inne niż hasło';
            info.style.color = 'red';
            return;
        }

        fetch('/accounts/add', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    name,
                    password,
                    permissions
                })  
        })
        .then(res => res.json())
        .then(data => {
            if(data.ok) {
                info.innerText = 'Użytkownik został dodany';
                info.style.color = 'green';
                setTimeout(()=> {
                    window.location.href = '/accounts/add';
                }, 1800)
            }
        });
    };
});