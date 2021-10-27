const loading = document.querySelector('.loadingBox');
const  nameBox = document.querySelector('.nameFromCookie');

let currentObjectId;

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
                const popup = document.querySelector('.popupForm');
                popup.classList.add('hide');

            };

            if(hasClass(e.target, 'showAnno')) {
                
                const oppositeBtn = document.querySelector('.addAnno');
                oppositeBtn.classList.remove('active');
                e.target.classList.add('active');

                const addingForm = document.querySelector('.addingAnno');
                addingForm.classList.add('hide');
                const showingAnno =  document.querySelector('.actualAnno');
                showingAnno.classList.remove('hide');
                const popup = document.querySelector('.popupForm');
                popup.classList.add('hide');

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

                fetch('/admin/anno-find', {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({_id}),
                })
                    .then(res => res.json())
                    .then(data => {
                        title.value = data.title;
                        date.value = data.date;
                        description.value = data.description;
                        currentObjectId = data._id;
                    })


            };

            if(hasClass(e.target, 'publicEdit')) {

                e.preventDefault();

                const title = document.querySelector('#titleEdit').value;
                const date = document.querySelector('#dateEdit').value;
                const description = document.querySelector('#descriptionEdit').value;
                const info = document.querySelector('.infoBoxEdit');

                const update = {
                    _id : currentObjectId,
                    title,
                    date,
                    description,
                };

                fetch('/admin/anno-edit', {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(update)
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.ok) {
                            
                            info.classList.remove('hide');
                            info.innerText = 'Zmiany zostały zapisane';
                            info.style.color = 'green';

                        } else {

                            info.classList.remove('hide');
                            info.innerText = 'Wystąpił problem z zapisem';
                            info.style.color = 'red';
                        }

                    })

            };


            if(hasClass(e.target, 'deleteAnno')) {

                const _id = e.target.classList[1];


                const editBtn = document.getElementById(`${_id}`);


                if(window.confirm('Ogłoszenie zostanie trwale usunięte, czy chcesz kontynuować ?')) {

                    fetch('/admin/anno-delete', {

                        method: 'POST',
                        headers: {'Content-Type' : 'application/json'},
                        body: JSON.stringify({_id})
                    })
                        .then(res => res.json())
                        .then(data => {
                            if(data.ok) {
                                e.target.disabled = true;
                                editBtn.disabled = true;

                                e.target.innerText = 'Ogłoszenie zostanie usunięte';
                                e.target.style.color = 'red';
                                e.target.style.fontSize = '2rem';
                                
                            } else {
                                h1.innerText = 'Nastąpił nieoczekiwany błąd'
                                annobox.appendChild(h1);
                            }
                        })
                }
            };

            if(hasClass(e.target, 'addArticle')) {

                e.preventDefault();
                e.target.classList.add('active');

                document.querySelector('.showArticles').classList.remove('active');
                document.querySelector('.addingArticle').classList.remove('hide');
                document.querySelector('.actualArticles').classList.add('hide');
                document.querySelector('.popupFormNews').classList.add('hide');
            };

            if(hasClass(e.target, 'showArticles')) {

                e.preventDefault();
                e.target.classList.add('active');

                document.querySelector('.addArticle').classList.remove('active');
                document.querySelector('.actualArticles').classList.remove('hide');
                document.querySelector('.addingArticle').classList.add('hide');
                document.querySelector('.popupFormNews').classList.add('hide');
            };

            if(hasClass(e.target, 'addParagraph')) {
                
                e.preventDefault();
                const paragraphBox = document.querySelector('.paragraphBox');
                const removeBtn = document.querySelector('.removeParagraph');
                const textarea = document.createElement('textarea');
                textarea.classList.add('toArticle')

                paragraphBox.appendChild(textarea);
                removeBtn.classList.remove('hide');

            };

            if(hasClass(e.target, 'removeParagraph')) {

                e.preventDefault();
                
                const paragraphs = document.querySelectorAll('.toArticle');
                const length = paragraphs.length

                if(length === 1) {

                    paragraphs[0].remove();
                    e.target.classList.add('hide');
                } else {
                    paragraphs[length - 1].remove()
                };
            };

            if(hasClass(e.target, 'sendArticle')) {

                e.preventDefault();
                
                const title = document.querySelector('#titleArt');
                const paragrafs = document.querySelectorAll('.toArticle');
                let paragraphIsEmpty = false;

                

                const titleLabel = document.querySelector('#titleArtLab');
                titleLabel.style.color = 'black';
                const descriptlabel = document.querySelector('div.addingArticle form h1');
                descriptlabel.style.color = 'black';
                const infoBox = document.querySelector('.infoBoxArticle');
                infoBox.classList.add('hide');

                paragrafs.forEach(paragraph => {
                    if(!paragraph.value) {
                        paragraphIsEmpty = true;
                    };
                });

                if(!title.value || paragrafs.length < 1 || paragraphIsEmpty) {
                    if(!title.value) {
                        titleLabel.style.color = 'red';
                    };
                    if(paragrafs.length < 1 || paragraphIsEmpty) {
                        descriptlabel.style.color = 'red'
                    };
                    
                    infoBox.classList.remove('hide');
                    infoBox.style.color = 'red';
                    infoBox.innerText = 'Proszę wypełnić wymagane pola formularza';
                } else {
                    if(window.confirm('Artykuł gotowy do publikacji, kontynuować ?')) {

                        const foto = document.querySelector('#fileInput');
                        const data = foto.files[0];
                        const formData = new FormData();
                        
                        let i = paragrafs.length

                        arr=[]
                        paragrafs.forEach(p => {
                            if(i>1){
                            arr.push(p.value + '<');
                            i--
                            } else {
                                arr.push(p.value);
                            };
                        });
                       
                        formData.append("title" , title.value);
                        formData.append('date', document.querySelector('#dateArt').value);
                        formData.append('description', arr);
                        formData.append("foto", data);

                        fetch('/admin/add-news', {
                            method: 'POST',
                            body: formData,
                        })
                            .then(res => res.json())
                            .then(data => {
                                if(data.ok) {
                                    infoBox.classList.remove('hide');
                                    infoBox.style.color = 'green';
                                    infoBox.innerText = 'Artykuł został opublikowany';
                                    paragrafs.forEach(parag=> parag.remove());
                                    document.querySelector('#dateArt').value = '';
                                    title.value = '';
                                    foto.value = ''
                                } else {
                                    infoBox.classList.remove('hide');
                                    infoBox.style.color = 'red';
                                    infoBox.innerText = 'W trakcie zapisu wystapił błąd';
                                };
                            })
                    } else {
                        return;
                    }
                };
            };
            
        
            if(hasClass(e.target, 'clearArt')) {

                document.querySelector('#titleArt').value = '';
                const paragrafs = document.querySelectorAll('.toArticle');
                paragrafs.forEach(p => p.remove());
                document.querySelector('#titleArtLab').style.color = 'black';;
                document.querySelector('div.addingArticle form h1').style.color = 'black';
                document.querySelector('.infoBoxArticle').classList.add('hide');
                document.querySelector('#dateArt').value = '';
                document.querySelector('.removeParagraph').classList.add('hide');
                document.querySelector('#fileInput').value = '';
                
            };

            if(hasClass(e.target, 'showArticles')) {
                
            };
});

window.addEventListener('load', loadName);