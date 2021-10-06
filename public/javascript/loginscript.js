const inputName = document.querySelector('#username');
const inputPassword = document.querySelector('#password');
const btn = document.querySelector('.startlogin');
const info = document.querySelector('.loginfo h1');

btn.addEventListener('click', (e) => {

    e.preventDefault();

    const username = inputName.value;
    const password = inputPassword.value;

    const data = {
        user : username,
        password,
    }

    fetch('/login', {
        method : 'POST',
        redirect: 'follow',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
        if(res.redirected) {
            window.location.href = res.url;
        } else {
            info.innerText = 'Niepoprawna nazwa użytkownika lub hasło';
            info.style.color = 'red';
        }  
    });
    
    inputName.value = '';
    inputPassword.value = '';
})