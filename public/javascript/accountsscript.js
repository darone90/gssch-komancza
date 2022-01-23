const  nameBox = document.querySelector('.nameBox h2');
const cookies = document.cookie.split(';')

const loadName= () => {

    const name = (cookies.filter(cookie => cookie.includes('user-name')))[0].split('=');
    nameBox.innerText = nameBox.innerText + "\t" + name[1];
    return name[1];
    
}

const hasClass = (elem, className) => {
    return elem.classList.contains(className);
};

document.addEventListener('click', (e) => {

    if(hasClass(e.target, 'addUser')) {

        e.preventDefault();
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const confirmpassword = document.getElementById('confirmpassword').value;
        const info = document.querySelector('.infoBox p');
        const username = document.querySelector('.confirmation h3');

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

        document.querySelector('.confirmation').classList.remove('hide');
        username.innerText = username.innerText + "\t" + loadName();

    };

    if(hasClass(e.target, 'sendConfirmation')) {
        e.preventDefault()
        const passwordToConfirm = document.querySelector('#passwordConfirmation').value

        fetch('/accounts/confirm', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    password: passwordToConfirm
                })  
        })
            .then(res => {
                if(res.redirected) {
                    return data = res.url
                } else {
                    return data = res.json()
                }})
            .then(data => {
                if(data.confirm) {
                    document.querySelector('.confirmation').classList.add('hide');
                    const name = document.getElementById('name').value;
                    const password = document.getElementById('password').value;
                    const permissions = document.getElementById('permissions').checked;
                    const info = document.querySelector('.infoBox p');

                    fetch('/accounts/add', {
                        method: 'POST',
                        headers: {'Content-Type' : 'application/json'},
                            body: JSON.stringify({
                                name,
                                password,
                                permissions
                            })  
                    })
                    .then(res => {
                        if(res.redirected) {
                            return urlData = res.url
                        } else {
                            return urlData = res.json()
                        }
                    })
                    .then(data => {
                        if(data.ok) {
                            info.innerText = 'Użytkownik został dodany';
                            info.style.color = 'green';
                            setTimeout(()=> {
                                window.location.href = '/accounts/add';
                            }, 1800)
                        } else {
                            window.location.href = data;
                        }
                    });
                } else {
                    window.location.href = data;
                }
            })
    }

    if(hasClass(e.target, 'cancel')) {
        e.preventDefault();
        document.querySelector('.confirmation').classList.add('hide');
    }

    if(hasClass(e.target, 'clearErrorLog')) {
        if(confirm('Wczyścić zapis wszystkich błędów? ')) {
            fetch('/accounts/clear-error', {
                method: "GET"
            })
                .then(res => {
                    if(res.redirected) {
                        return data = res.url;
                    } else {
                        return data = 'ok'
                    }
                })
                .then(data => {
                    if(data === 'ok') {
                        window.location.reload();
                    } else {
                        window.location.href = data;
                    }
                })
        } else {
            return;
        }
    }
});

window.addEventListener('load', loadName);