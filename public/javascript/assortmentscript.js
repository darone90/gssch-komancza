

document.addEventListener('click', (e) => {

    if(hasClass(e.target, 'addProduct')) {
                
        e.preventDefault();
        e.target.classList.add('active');

        document.querySelector('.showProducts').classList.remove('active');
        document.querySelector('.bakery-info').classList.remove('active');
        document.querySelector('.addingArticle').classList.remove('hide');
        document.querySelector('.editing-informations').classList.add('hide');
        document.querySelector('.actualProducts').classList.add('hide');
        document.querySelector('.editArticle').classList.add('hide');
    };

    if(hasClass(e.target, 'showProducts')) {

        e.preventDefault();
        e.target.classList.add('active');

        document.querySelector('.addProduct').classList.remove('active');
        document.querySelector('.bakery-info').classList.remove('active');
        document.querySelector('.addingArticle').classList.add('hide');
        document.querySelector('.actualProducts').classList.remove('hide');
        document.querySelector('.editArticle').classList.add('hide');
        document.querySelector('.editing-informations').classList.add('hide');

    };

    if(hasClass(e.target, 'bakery-info')) {

        e.preventDefault();
        e.target.classList.add('active');

        document.querySelector('.addProduct').classList.remove('active');
        document.querySelector('.showProducts').classList.remove('active');
        document.querySelector('.addingArticle').classList.add('hide');
        document.querySelector('.actualProducts').classList.add('hide');
        document.querySelector('.editArticle').classList.add('hide');
        document.querySelector('.editing-informations').classList.remove('hide');

        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');

        fetch('/shop/change/bakery', {
            method : "GET"
        })
            .then(res => res.json())
            .then(data => {
                document.querySelector('.bakery-information-input').textContent = data.text;
                document.querySelector('.bakery-informations-hours').textContent = data.hours;
                document.querySelector('#bakery-inform-tel').value = data.tel;
                document.querySelector('#bakery-inform-mail').value = data.mail;
                document.querySelector('#bakery-inform-addres').value = data.addres;

                if(data.foto) {
                    document.querySelector('.editing-informations__fotowrap img').src = `../public/images/imagesDB/${data.foto}`
                } else {
                    document.querySelector('.editing-informations__fotowrap img').src = `../public/images/noFoto.jpg`
                }
                loading.classList.remove('onload');
            })
            .catch(err => {
                errorFunction();
            });
    };

    if(hasClass(e.target, 'sendProduct')) {
                
        e.preventDefault()
        
        const name = document.querySelector('#prodName');
        const description = document.querySelector('#prodDescription');
        const nameLabel = document.querySelector('#prodNameLab');
        const descLabel = document.querySelector('#prodDescriptionLab');
        const infoBox = document.querySelector('.infoBoxArticle')

        infoBox.classList.add('hide');
        nameLabel.style.color = 'black';
        descLabel.style.color = "black";

        if(!name.value || !description.value) {
            infoBox.classList.remove('hide');
            infoBox.style.color = 'red';
            infoBox.innerText = 'Proszę uzupełnić wymagane pola'

            if(!name.value) {
                nameLabel.style.color = 'red';
            };

            if(!description.value) {
                descLabel.style.color = "red";                    
            }
            return;
        };

        if(window.confirm('Produkt gotowy do publikacji, kontynuować?')){
            const loading = document.querySelector('.loadingBox');
            scrollContent(0);
            loading.classList.add('onload');
            const fotodata = document.querySelector('#fileInput');
            const foto = fotodata.files[0];
            const formData = new FormData();

            formData.append('title', name.value);
            formData.append('description', description.value);
            formData.append('foto', foto);

            fetch('/admin/products-add', {
                method: 'POST',
                body: formData,
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
                        
                        loading.classList.remove('onload');
                        infoBox.classList.remove('hide');
                        infoBox.style.color = 'green';
                        infoBox.innerText = 'Produkt został dodany!'
                        fotodata.value = '';
                        name.value = '';
                        description.value = '';
                        setTimeout(()=> {
                            window.location.pathname = '/admin/assortment';
                        },1800);
                    } else {
                        window.location.href = data;
                    };
                })
                .catch(err => {
                    errorFunction();
                });
            };
    };

    

    if(hasClass(e.target, 'removeProduct')) {
        e.preventDefault();
        if(window.confirm('Czy na pewno chcesz usunąć element?')){
            const loading = document.querySelector('.loadingBox');
            loading.classList.add('onload');
            const _id = e.target.classList[1];

            fetch(`/admin/products-delete/${_id}`, {
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
                        loading.classList.remove('onload');
                        e.target.innerText = 'Element zostanie usunięty';
                        e.target.style.color = 'red';
                        const buttons = [...document.getElementsByClassName(`${_id}`)];
                        buttons.forEach(btn=> btn.disabled = true)
                    } else {
                        window.location.href = data;
                    };
                }).catch(err => {
                    errorFunction();
                })
        } else {return};
        

    };

    if(hasClass(e.target, 'editProduct')) {
        
        e.preventDefault();
        
        document.querySelector('.editArticle').classList.remove('hide');
        document.querySelector('.showProducts').classList.remove('active');
        document.querySelector('.addingArticle').classList.add('hide');
        document.querySelector('.actualProducts').classList.add('hide');
        document.querySelector('.editArticle').classList.remove('hide');
        document.querySelector('.addProduct').classList.remove('active');

        const _id = e.target.classList[1];

        fetch(`/admin/products-find/${_id}`, {
            method: 'GET'
                })
                .then(res => res.json())
                .then(data => {

                    const {title, description, foto, _id} = data; 
                    document.querySelector('#prodNameEdit').value = title;
                    document.querySelector('#prodDescriptionEdit').value = description;
                    const fotoImg = document.querySelector('.img');
                    const btn = document.querySelector('.removeProductFoto');

                    if (foto) {  
                        fotoImg.src = `../public/images/imagesDB/${foto}`;
                        btn.disabled = false;
                    } else {
                        fotoImg.src = `../public/images/noFoto.jpg`;
                        btn.disabled = true;
                    };
                    document.querySelector('.idBox').innerText = `idnetyfikator: ${data._id}`
        }).catch(err => {
            errorFunction();
        });

    };

    if(hasClass(e.target, 'closeEditProduct')) {
        window.location.href = '/admin/assortment';
    };


    if(hasClass(e.target, 'removeProductFoto')) {
        if(window.confirm('Zdjęcie zostanie trwale usunięte, kontynuować ? ')){
            const loading = document.querySelector('.loadingBox');
            loading.classList.add('onload');
            const path = document.querySelector('.img').src;
            const pathArr = path.split('/');
            const foto = pathArr.reverse()[0];
            const h1 = document.querySelector('.labelToFoto');
            
            fetch('/admin/products-foto-delete', {
                method: 'PATCH',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({foto}),
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
                        
                        loading.classList.remove('onload');
                        h1.innerText = 'Zdjęcie zostanie usunięte';
                        h1.style.color = 'red';
                    } else {
                        window.location.href = data;
                    };
                }).catch(err => {
                    errorFunction();
                });
            }else{return};
    };

    if(hasClass(e.target, 'editSendProduct')) {
        e.preventDefault();

        const title = document.querySelector('#prodNameEdit');
        const paragraph = document.querySelector("#prodDescriptionEdit");
        const infoBox = document.querySelector('.infoBoxArticle');
        infoBox.classList.add('hide');

        if (title.value ==='' || paragraph.value === '') {
            infoBox.classList.remove('hide');
            infoBox.innerText = 'Niektóre wymagane pola pozostały puste, zmiany nie zostaną zapisane';
            infoBox.style.color = 'red';
        } else {
            if(window.confirm("Wprowadzić zmiany dla produktu ? ")) {
                const loading = document.querySelector('.loadingBox');
                loading.classList.add('onload');
                getTop();
                const _id = document.querySelector('.idBox').innerText.split(' ')[1];
                const newTitle = title.value;
                const description = paragraph.value;
                
                const foto = document.querySelector('#fileInput');
                const data = foto.files[0];
                
                const formData = new FormData()
                formData.append('_id' , _id);
                formData.append('title' , newTitle);
                formData.append('description', description);
                formData.append('foto', data);

                fetch('/admin/products-edit', {
                    method: 'PUT',
                    body: formData,
                }).then(res => {
                    if(res.redirected) {
                        return data = res.url
                    } else {
                        return data = res.json()
                    } 
                })
                .then(data => {
                    if(data.ok) {
                        
                        loading.classList.remove('onload');
                        infoBox.classList.remove('hide');
                        infoBox.style.color = 'green';
                        infoBox.innerText = 'Zmiany zostały wprowadzone';
                        title.value = '';
                        description.value = '';
                        foto.value = '';
                        setTimeout(()=> {
                            window.location.pathname = '/admin/assortment';
                        },1800);
                    } else {
                        window.location.href = data;
                    };
                }).catch(err => {
                    errorFunction();
                })
            } else {return};
        }
    };

    if(hasClass(e.target, 'bakery-info-edit')) {
        e.preventDefault();
        if(window.confirm('Opublikować zmiany?')){
            const text = document.querySelector('.bakery-information-input').value;
            const hours = document.querySelector('.bakery-informations-hours').value;
            const tel = document.querySelector('#bakery-inform-tel').value;
            const mail = document.querySelector('#bakery-inform-mail').value;
            const addres = document.querySelector('#bakery-inform-addres').value;
            const foto = document.querySelector('#bakery-information-foto').files[0];

            if(!foto){
                const loading = document.querySelector('.loadingBox');
                loading.classList.add('onload');
                getTop();
                fetch('/admin/shop/change', {
                    method: 'PATCH',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({
                        text,
                        hours,
                        tel,
                        mail,
                        addres,
                        title: 'bakery',
                    }),
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
                        loading.classList.remove('onload');
                        document.querySelector('.saving-info').classList.remove('hide');
                        setTimeout(()=> {
                            window.location.pathname = '/admin/assortment';
                        },1800);
                    } else {
                        window.location.href = data;
                    };
                }).catch(err => {
                    errorFunction();
                });
                    

            } else {

                const loading = document.querySelector('.loadingBox');
                loading.classList.add('onload');
                getTop();
                const formData = new FormData()
                formData.append('title', 'bakery');
                formData.append('text' , text);
                formData.append('hours' , hours);
                formData.append('tel', tel);
                formData.append('mail', mail);
                formData.append('addres', addres);
                formData.append('foto', foto);

                fetch('/admin/shop/changewithfoto', {
                    method: 'PATCH',
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
                        loading.classList.remove('onload');
                        document.querySelector('.saving-info').classList.remove('hide');
                        setTimeout(()=> {
                            window.location.pathname = '/admin/assortment';
                        },1800);
                    } else {
                        window.location.href = data;
                    };
                }).catch(err => {
                    errorFunction();
                });
            }
        }
        return;
    };
});