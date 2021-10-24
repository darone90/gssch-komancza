const loading = document.querySelector('.loadingBox');
const  nameBox = document.querySelector('.nameFromCookie');

const hasClass = (elem, className) => {
    return elem.classList.contains(className);
};

const loadName= () => {
    const name = document.cookie.substr(10);
    nameBox.innerText = name;
}

document.addEventListener('click', (e) => {
    if (hasClass(e.target, 'read')) {
        
        loading.classList.add('onload');
        const id = e.target.classList[1];
        const messageBox = document.getElementById(`${id}`);

        fetch('/admin/unread-read', {

            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({id}),

        }).then(res => res.json()).then(data => {

            if (data.ok === true) {
                const info = document.createElement('div');
                info.classList.add('replace')
                info.innerText = 'Wiadomość zostanie przeniesiona do zakładki "Wiadomości przeczytane"';

                messageBox.appendChild(info)
                loading.classList.remove('onload');

                e.target.disabled = true;

            } else {

                const info = document.createElement('div');
                info.classList.add('replace')
                info.innerText = 'Wystąpił błąd podczas zapisu';
                loading.classList.remove('onload');
            };

        });
        
        
    };
    if (hasClass(e.target, 'showReaded')) {

        const oppositbtn = document.querySelector('.showUnreaded');
        const readed = document.querySelector('.readed');
        const unreaded = document.querySelector('.unreaded');

        e.target.classList.add('active');
        oppositbtn.classList.remove('active');

        unreaded.classList.add('hide');
        readed.classList.remove('hide');
    };

    if (hasClass(e.target, 'showUnreaded')) {

        const oppositbtn = document.querySelector('.showReaded');
        const readed = document.querySelector('.readed');
        const unreaded = document.querySelector('.unreaded');

        e.target.classList.add('active');
        oppositbtn.classList.remove('active');

        unreaded.classList.remove('hide');
        readed.classList.add('hide');
    };

    if (hasClass(e.target, 'delete')) {

        if(window.confirm('Wiadomość zostanie usunięta definitywnie, kontynuować ?')){
        loading.classList.add('onload');
        const id = e.target.classList[1];
        const messageBox = document.getElementById(`${id}`);


        fetch('/admin/delete', {

            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({id}),

        }).then(res => res.json()).then(data => {

            if (data.ok === true) {
                const info = document.createElement('div');
                info.classList.add('remove')
                info.innerText = 'Wiadomość zostanie usunięta"';
                
                messageBox.appendChild(info)
                loading.classList.remove('onload');
                e.target.disabled = true;

            } else {

                const info = document.createElement('div');
                info.classList.add('remove')
                info.innerText = 'Wystąpił błąd podczas usuwania';
                loading.classList.remove('onload');

            };
        });    
            } else {return}};

            if(hasClass(e.target, 'addAnno')) {
                
                const oppositeBtn = document.querySelector('.showAnno');
                oppositeBtn.classList.remove('active');
                e.target.classList.add('active');

                const addingForm = document.querySelector('.addingAnno');
                addingForm.classList.remove('hide');
                const showingAnno =  document.querySelector('.actualAnno');
                showingAnno.classList.add('hide');

            };

            if(hasClass(e.target, 'showAnno')) {
                
                const oppositeBtn = document.querySelector('.addAnno');
                oppositeBtn.classList.remove('active');
                e.target.classList.add('active');

                const addingForm = document.querySelector('.addingAnno');
                addingForm.classList.add('hide');
                const showingAnno =  document.querySelector('.actualAnno');
                showingAnno.classList.remove('hide');

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
                        const dataToSend = {
                            title,
                            date,
                            description,
                        };

                        fetch('/admin/add-annoucement', {
                            method: 'POST',
                            headers: {'Content-Type' : 'application/json'},
                            body: JSON.stringify(dataToSend),
                        })
                            .then(res => res.json())
                            .then(data => {
                                if(data.ok) {
                                    infoBox.classList.remove('hide');
                                    infoBox.style.color = 'green';
                                    infoBox.innerText = 'Ogłoszenie zostało opublikowane';
                                    labTitle.style.color = 'black';
                                    labDate.style.color = 'black';
                                    labDescription.style.color = 'black';
                                    document.querySelector('#title').value = '';
                                    document.querySelector('#date').value ='';
                                    document.querySelector('#description').value = ''
                                } else {
                                    infoBox.classList.remove('hide');
                                    infoBox.style.color = 'red';
                                    infoBox.innerText = 'W trakcie publikacji wystąpił błąd!';
                                };
                            });
                    } else { return };
                };
            };
});

window.addEventListener('load', loadName);