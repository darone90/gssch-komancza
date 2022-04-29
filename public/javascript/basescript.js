document.addEventListener('click', (e) => {

    if(hasClass(e.target, 'documentadd')) {
        const documnetLoaded = document.querySelector('#fileInput');
        const file = documnetLoaded.files[0];
        const userName = document.querySelector('.nameFromCookie').innerText;
        const info = document.querySelector('.addDocument p');
        const addBox = document.querySelector('.addDocument');

        if(!file) {
            window.alert('Nie został dodany żaden plik do przesłania!');
            return;
        };
        const formData = new FormData();
        formData.append('user', userName);
        formData.append('doc', file);

        fetch('/admin/documents-add', {
            method: 'POST',
            body: formData
        })
            .then(res => {
                if(res.redirected) {
                    return data = res.url
                } else {
                    return data = res.json()
                } 
            })
            .then(data => {
                if(data.ok) {
                    info.innerText = 'Dokument został pomyślnie przesłany do bazy';
                    info.style.color = "green";
                    e.target.disabled = true;
                    documnetLoaded.value = '';
                    documnetLoaded.disabled = true;
                    const rfrbtn = document.createElement('button');
                    rfrbtn.innerText = 'Dodaj kolejny dokumnet';
                    rfrbtn.classList.add('refresh');
                    addBox.appendChild(rfrbtn);
                } else {
                    window.location.href = data;
                };
            }).catch(err => {
                errorFunction();
            })

    }; 

    if(hasClass(e.target, 'deleteDocument')) {
        const _id = e.target.classList[1];
        const btn = [...document.getElementsByClassName(`${_id}`)];

        if(window.confirm('Trwałe usunięcie dokumentu z bazy danych, kontynuować?')) {
            fetch(`/admin/documents-delete/${_id}`,{
                method: 'DELETE',
            })
                .then(res => {
                    if(res.redirected) {
                        return data = res.url
                    } else {
                        return data = res.json()
                    } 
                })
                .then(data => {
                    if(data.ok) {
                        e.target.innerText = 'Dokument usunięty';
                        e.target.style.color = 'red';
                        btn.forEach(btn => btn.disabled = true);
                    } else {
                        window.location.href = data;
                    }
                }).catch(err => {
                    errorFunction();
                })
        }
    };

    if(hasClass(e.target, 'refresh')) {
        window.location.href = '/admin/base';
    }


});