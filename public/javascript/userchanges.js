document.addEventListener('click', (e) => {

    if(hasClass(e.target, 'changePassword')) {
        e.preventDefault();
        const infoBox = document.querySelector('.userPasswordInfoBox');
        const oldPassword = document.getElementById('oldPassword');
        const newPassword = document.getElementById('newPassword');
        const confirmPassword = document.getElementById('newPasswordAgain');

        infoBox.innerText = 'Hasło musi składać się conajmniej z 6 znaków';

        if(oldPassword.value.length < 6) {
            infoBox.innerText = 'Proszę wprowadzić poprawne aktualne hasło!';
            infoBox.style.color = 'red';
            return;
        };

        if(confirmPassword.value.length < 6 || newPassword.value.length < 6) {
            infoBox.innerText = 'Nowe hasło musi się składać z conajmniej 6 zanków !!!';
            infoBox.style.color = 'red';
            return;
        };

        if(confirmPassword.value !== newPassword.value) {
            infoBox.innerText = 'Powtórzone hasło nie jest takie samo jak podane!';
            infoBox.style.color = 'red';
            return;
        };

        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');

        fetch('/admin/user-password-change', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                oldPassword : oldPassword.value,
                newPassword : newPassword.value
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
                    loading.classList.remove('onload');
                    infoBox.innerText = 'Hasło zostało zmienione';
                    infoBox.style.color = 'green';
                    oldPassword.value = '';
                    newPassword.value = '';
                    confirmPassword.value = '';
                    
                    setTimeout(()=> {
                        window.location.href = '/admin';
                    }, 2000)
                } else {
                    window.location.href = data;
                }
            })




    };


});