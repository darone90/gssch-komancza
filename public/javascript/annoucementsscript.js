   
   const buttonsHandler = (target, className) => {
        const mainButtons = [document.querySelector('.showAnno'), document.querySelector('.archivedAnno'), document.querySelector('.addAnno')];
        mainButtons.forEach( btn => btn.classList.remove('active'));
        target.classList.add('active');

        const views = ['.addingAnno','.actualAnno','.popupForm','.archiveAnno'];
        document.querySelector(`${className}`).classList.remove('hide');
        const toHide = views.filter(view => view !== className);
        toHide.forEach(view => document.querySelector(`${view}`).classList.add('hide'));
    }


document.addEventListener('click', (e) => {
    if(hasClass(e.target, 'addAnno')) {
        e.preventDefault();
        buttonsHandler(e.target, '.addingAnno');
    };

    if(hasClass(e.target, 'showAnno') || hasClass(e.target, 'close')) {
        e.preventDefault()
        buttonsHandler(e.target, '.actualAnno');
    };

    if(hasClass(e.target, 'archivedAnno')) {
        e.preventDefault();
        buttonsHandler(e.target, '.archiveAnno')
    };

    if(hasClass(e.target, 'public')) {
        e.preventDefault();

        const title = document.querySelector('#title').value;
        const date = document.querySelector('#date').value;
        const description = document.querySelector('#description').value;
        const labTitle = document.querySelector('#forTitle');
        const labDate = document.querySelector('#forDate');
        const labDescription = document.querySelector('#forDescription');
        const infoBox = document.querySelector('.infoBox');

        if (!title || !date || !description){

            if(!title) {
                labTitle.style.color = 'red';
            } else {
                labTitle.style.color = 'black'
            };
            if(!date) {
                labDate.style.color = 'red';
            } else {
                labDate.style.color = 'black';
            };
            if(!description) {
                labDescription.style.color = 'red';
            } else {
                labDescription.style.color = 'black'
            };

            infoBox.classList.remove('hide');
            infoBox.style.color = 'red';
            infoBox.innerText = 'Proszę uzupełnić wymagane pola'

            return;
        } else {

            if(window.confirm('Ogłoszenie przygotowane do wysłania. Opublikować?')){
                const loading = document.querySelector('.loadingBox');
                loading.classList.add('onload');

                const attachements = [...document.querySelectorAll('.attachementInput')];

                const formData = new FormData();
                
                formData.append("title" , title);
                formData.append('date', date);
                formData.append('description', description);
                attachements.forEach(el => {
                    if(el.files[0] !== undefined) {
                    formData.append('attachements', el.files[0]);
                    };
                });
                
                fetch('/admin/anno-add', {
                    method: 'POST',
                    body: formData,
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.ok) {
                            
                            loading.classList.remove('onload');
                            infoBox.classList.remove('hide');
                            infoBox.style.color = 'green';
                            infoBox.innerText = 'Ogłoszenie zostało opublikowane';
                            labTitle.style.color = 'black';
                            labDate.style.color = 'black';
                            labDescription.style.color = 'black';
                            document.querySelector('#title').value = '';
                            document.querySelector('#date').value ='';
                            document.querySelector('#description').value = '';
                            [...document.querySelectorAll('.attBox')].forEach(el => el.remove());
                            window.scrollTo(0,0);
                            setTimeout(()=> {
                                window.location.pathname = '/admin/info';
                            },2000)
                        };
                    });
            } else { return };
        };
    };

    if(hasClass(e.target, 'publicEdit')) {

        e.preventDefault();

        const title = document.querySelector('#titleEdit').value;
        const date = document.querySelector('#dateEdit').value;
        const description = document.querySelector('#descriptionEdit').value;
        const info = document.querySelector('.infoBoxEdit');

        const attachements = [...document.querySelectorAll('.attachementInput')];

        if(!title || !date || !description) {
            window.alert('niektóre wymagane pola pozostały puste, nie zostaną w nich wprowadzone żadne zmiany');                   
        };
        if(window.confirm('Zmiany gotowe do wprowadzenia, kontynuować ? ')) {
            const loading = document.querySelector('.loadingBox');
            loading.classList.add('onload');

        const formData = new FormData();
        
        formData.append("title" , title);
        formData.append('date', date);
        formData.append('description', description);
        formData.append('_id', currentObjectId);
        attachements.forEach(el => {
            if(el.files[0] !== undefined) {
            formData.append('attachements', el.files[0]);
            };
        });
        
        fetch('/admin/anno-edit', {
            method: 'PUT',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                if(data.ok) {
                    
                    loading.classList.remove('onload');
                    info.classList.remove('hide');
                    info.style.color = 'green';
                    info.innerText = 'zmiany zostały wprowadzone';
                    document.querySelector('.popupForm form').style.display = 'none';
                    document.querySelector('.attBox').style.display = 'none';
                    window.scrollTo(0,0);
                    setTimeout(()=> {
                        window.location.pathname = '/admin/info';
                    },2000)
                }
            });
        } else {
            return;
        }
    };

    if(hasClass(e.target, 'editAnno')) {

        const popup = document.querySelector('.popupForm');
        popup.classList.remove('hide');
        const showingAnno =  document.querySelector('.actualAnno');
        showingAnno.classList.add('hide');
        document.querySelector('.infoBoxEdit').classList.add('hide');
        
        const title = document.querySelector('#titleEdit');
        const date = document.querySelector('#dateEdit')
        const description = document.querySelector('#descriptionEdit');

        const _id = e.target.classList[1];

        fetch(`/admin/anno-find/${_id}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                title.value = data.title;
                date.value = data.date;
                description.value = data.description;
                currentObjectId = data._id;

                const att = data.attachements
                const attBox = document.createElement('div');
                attBox.classList.add('attBox');
                if(att.length > 0) {
                att.forEach(el => {
                    const att = document.createElement('div')
                    att.classList.add('attgroup');
                    att.innerHTML = `
                        <p class=${el.newName}>${el.oldName}</p>
                        <button class='dwlatt ${el.newName}'>Pobierz</button>
                        <button class='delatt ${el.newName}'>Usuń</button>
                    `;
                    attBox.appendChild(att);
                })
            } else {
                const p = document.createElement('p');
                p.innerText = 'Brak załączników do tego ogłoszenia';
                attBox.appendChild(p);
            }
            popup.appendChild(attBox);

            });
    };

    if(hasClass(e.target, 'addAtachement')) {
        e.preventDefault();

        const form = document.querySelector('.addingAnno form');
        const pubBtn = document.querySelector('.public');
        const index = document.querySelectorAll('.attBox').length;

        if(index < 8) {
        const add = document.createElement('input');
        add.type = 'file';
        add.accept = '.pdf, .doc, .docx, .odt';
        add.classList.add('attachementInput');
        const remBtn = document.createElement('button'); 
        remBtn.classList.add(`removeAttachement`);
        remBtn.classList.add(`${index}`);
        remBtn.innerText = 'Usuń załącznik';
        const attBox = document.createElement('div');
        attBox.classList.add('attBox');
        attBox.classList.add(`${index}`);
        attBox.appendChild(add);
        attBox.appendChild(remBtn);
        form.insertBefore(attBox, pubBtn);
        } else {
            const warning = document.createElement('h1');
            warning.innerText = 'Nie można dodać więcej załączników';
            warning.classList.add('warning');
            warning.style.color = 'red';
            e.target.disabled = true;
            form.insertBefore(warning, pubBtn);
        };
    };

    if(hasClass(e.target, 'addAtachementPopup')) {
        e.preventDefault();

        const form = document.querySelector('.popupForm form');
        const pubBtn = document.querySelector('.publicEdit');
        const index = document.querySelectorAll('.attBox').length;
        const existedAtt = document.querySelectorAll('.attgroup');
        const no = 8 - existedAtt.length;

        if(index < no) {
        const add = document.createElement('input');
        add.type = 'file';
        add.accept = '.pdf, .doc, .docx, .odt';
        add.classList.add('attachementInput');
        const remBtn = document.createElement('button'); 
        remBtn.classList.add(`removeAttachementPopup`);
        remBtn.classList.add(`${index}`);
        remBtn.innerText = 'Usuń załącznik';
        const attBox = document.createElement('div');
        attBox.classList.add('attBox');
        attBox.classList.add(`${index}`);
        attBox.appendChild(add);
        attBox.appendChild(remBtn);
        form.insertBefore(attBox, pubBtn);
        } else {
            const warning = document.createElement('h1');
            warning.innerText = 'Nie można dodać więcej załączników';
            warning.classList.add('warning');
            warning.style.color = 'red';
            e.target.disabled = true;
            form.insertBefore(warning, pubBtn);
        };
    };

    if(hasClass(e.target, 'removeAttachement')) {
        e.preventDefault();

        const all = [...document.querySelectorAll('.attBox')];
        const index = e.target.classList[1];
        const elToRem = all.find(el => el.classList.contains(index));
        elToRem.remove();

        const addBtn = document.querySelector('.addAtachement');
        if(addBtn.disabled === true) {
            addBtn.disabled = false;
            document.querySelector('.warning').remove();
        };
    };

    if(hasClass(e.target, 'removeAttachementPopup')) {
        e.preventDefault();

        const all = [...document.querySelectorAll('.attBox')];
        const index = e.target.classList[1];
        const elToRem = all.find(el => el.classList.contains(index));
        elToRem.remove();

        const addBtn = document.querySelector('.addAtachementPopup');
        if(addBtn.disabled === true) {
            addBtn.disabled = false;
            document.querySelector('.warning').remove();
        };
    };

    if(hasClass(e.target, 'delatt')) {
        if(window.confirm("Załącznik zostanie trwale usunięty, kontynuować ?")) {
            const loading = document.querySelector('.loadingBox');
            loading.classList.add('onload');
            const name = e.target.classList[1];
            const id = currentObjectId;

            fetch('/admin/anno-attachement-delete', {
                method: 'PATCH',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    name,
                    id
                })             
            })
            .then(res => res.json())
            .then(data => {
                        if(data.ok === true) {
                            
                            loading.classList.remove('onload');
                            e.target.innerText = "załącznik usunięty";
                            e.target.style.color = 'red';
                            const buttons = [...document.getElementsByClassName(`${e.target.classList[1]}`)];
                            buttons.forEach(el => el.disabled = true);
                        }
                    });
        } else {
            return;
        };
    };

    if(hasClass(e.target, 'archiveAnnoOn')) {
        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');
        const archive = true;
        const _id = e.target.classList[1];
        const btn = e.target;

        fetch('/admin/archive/anno', {

            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({_id, archive})
        })
            .then(res => res.json())
            .then(data => {
                if(data.ok === true) {
                    
                    loading.classList.remove('onload');
                    btn.innerText = 'Ogłoszenie przeniesione do archiwum';
                    btn.style.color = 'red';
                    const buttons = [...document.getElementsByClassName(`${_id}`)];
                    buttons.forEach(el => el.disabled = true);
                }
            })
    };

    

    if(hasClass(e.target, 'unArchiveAnno')) {
        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');
        const archive = false;
        const _id = e.target.classList[1];
        const btn = e.target;

        fetch('/admin/archive/anno', {

            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({_id, archive})
        })
            .then(res => res.json())
            .then(data => {
                if(data.ok === true) {
                    
                    loading.classList.remove('onload');
                    btn.innerText = 'Ogłoszenie przywrócone';
                    btn.style.color = 'green';
                    const buttons = [...document.getElementsByClassName(`${_id}`)];
                    buttons.forEach(el => el.disabled = true);
                }
            })
    };

    if(hasClass(e.target, 'deleteAnno')) {

        const _id = e.target.classList[1];

        if(window.confirm('Ogłoszenie zostanie trwale usunięte, czy chcesz kontynuować ?')) {
            const loading = document.querySelector('.loadingBox');
            loading.classList.add('onload');

            fetch(`/admin/anno-delete/${_id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if(data.ok) {
                        
                        loading.classList.remove('onload');
                        e.target.innerText = 'Ogłoszenie zostanie usunięte';
                        e.target.style.color = 'red';
                        e.target.style.fontSize = '2rem';

                        const buttons = [...document.getElementsByClassName(`${_id}`)];
                        buttons.forEach(el => el.disabled = true);
                        
                    }
                })
        }
    };

    if(hasClass(e.target, 'clearArtAsso')) {
        document.querySelector('.infoBoxArticle').classList.add('hide');
        document.querySelector('#prodNameLab').style.color = 'black';
        document.querySelector('#prodDescriptionLab').style.color = 'black';
        document.querySelector('#prodName').value = '';
        document.querySelector('#prodDescription').value = '';
    };
});
