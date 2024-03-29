const uploader = (key) => {
    const text = document.querySelector('.bakery-information-input').value;
    const hours = document.querySelector('.bakery-informations-hours').value;
    const foto = document.querySelector('#bakery-information-foto').files[0];
    const tel = document.querySelector('#bakery-inform-tel').value;
    const mail = document.querySelector('#bakery-inform-mail').value;
    const addres = document.querySelector('#bakery-inform-addres').value;


    if(!foto) {
        loader(true)
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
                title: key,
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
                    window.location.pathname = '/admin/shops';
                },1800);
            } else {
                window.location.href = data;
            };
            loader(false)
        }).catch(err => {
            errorFunction();
        });

    } else {
        loader(true)
        getTop();
        const formData = new FormData()
                formData.append('title', key);
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
                            window.location.pathname = '/admin/shops';
                        },1800);
                    } else {
                        window.location.href = data;
                    };
                    loader(false)
                }).catch(err => {
                    errorFunction();
                });
    }
};


const loader = (load) => {
    if(load) {
        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');
    } else {
        const loading = document.querySelector('.loadingBox');
        loading.classList.remove('onload');
    }
} 

const dataloader = (key, name) => {

    const title = document.querySelector('.editing-informations h1');
    const text = document.querySelector('.bakery-information-input');
    const hours = document.querySelector('.bakery-informations-hours');
    const foto = document.querySelector('.editing-informations__fotowrap img');
    const tel = document.querySelector('#bakery-inform-tel');
    const mail = document.querySelector('#bakery-inform-mail');
    const addres = document.querySelector('#bakery-inform-addres');

    
    const savingBtn = document.querySelector('.shops-info-edit');
    savingBtn.id = key;

    title.innerText = `Aktualne informacje o ${name}`;

    loader(true);

    fetch(`/shop/change/${key}`, {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            text.textContent = data.text;
            hours.textContent = data.hours;
            foto.src = `../public/images/imagesDB/${data.foto}`;
            tel.value = data.tel
            mail.value = data.mail
            
            if(key === 'moving') {
                addres.style.display = 'none';
            } else {
                addres.style.display = 'inline';
                addres.value = data.addres
            }
            loader(false);   
        })
        .catch(err => {
            errorFunction();
        });

}

const btnActivator = (className) => {
    const classArray = ['.delikatesy','.delikatesy2','.sklep', '.sklep2','.przemyslowy','.budowlany', '.obwozny'];
    const activated = '.'+ className;
    document.querySelector(activated).classList.add('active');
    classArray.forEach(el => {
        if(el !== activated) {
            document.querySelector(el).classList.remove('active');
        };
    });
    document.querySelector('.editing-informations').classList.remove('hide');
};

document.addEventListener('click', (e) => {

    if(hasClass(e.target, 'sklep')) {
        btnActivator('sklep');
        dataloader('food','Spożywczym Komańćza');

    };

    if(hasClass(e.target, 'sklep2')) {
        btnActivator('sklep2');
        dataloader('food2','Spożywczym Szczawme');

    };

    if(hasClass(e.target, 'delikatesy')) {
        btnActivator('delikatesy');
        dataloader('center','Delikatesach Komańcza');
    };

    if(hasClass(e.target, 'delikatesy2')) {
        btnActivator('delikatesy2');
        dataloader('center2','Delikatesach Rzepedź');
    };

    if(hasClass(e.target, 'przemyslowy')) {
        btnActivator('przemyslowy');
        dataloader('chemistry','Sklepie spożywczo - przemysłowym');
    };

    if(hasClass(e.target, 'budowlany')) {
        btnActivator('budowlany');
        dataloader('build','Sklepie budowlanym');
    };

    if(hasClass(e.target, 'obwozny')) {
        btnActivator('obwozny');
        dataloader('moving','Handlu obwoźnym');
    }

    if(hasClass(e.target, 'shops-info-edit')) {
        if(window.confirm('Zapisać zmiany? ')) {
            const key = e.target.id;
            uploader(key);
        }
    }

})
