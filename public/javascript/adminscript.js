const loading = document.querySelector('.loadingBox');
const  nameBox = document.querySelector('.nameFromCookie');
const cookies = document.cookie.split(';')

let currentObjectId;

const hasClass = (elem, className) => {
    return elem.classList.contains(className);
};

const loadName= () => {
    const name = cookies[2].substr(11);
    nameBox.innerText = name;
}

const loadSpaceBars = () => {
    const content = cookies[0].substr(15);
    const valuesC = content.split('%3F');
    const contentValue = Number(valuesC[0]);
    const contentLimit = Number(valuesC[1]);

    const database = cookies[1].substr(12);
    const valuesD = database.split('%3F');
    const databaseValue = Number(valuesD[0]);
    const databaseLimit = Number(valuesD[1]);

    const percentC = Math.round(contentValue/(contentLimit/100));
    const barC = document.querySelector('.contentbar div');
    barC.style.width = `${percentC}%`

    const percentD = Math.round(databaseValue/(databaseLimit/100));
    const barD = document.querySelector('.databasebar div');
    barD.style.width = `${percentD}%`;

    
}

const removeParagraph = (e) => {

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



document.addEventListener('click', (e) => {
    if (hasClass(e.target, 'read')) {
        
        loading.classList.add('onload');
        const id = e.target.classList[1];
        const messageBox = document.getElementById(`${id}`);

        fetch(`/admin/messages-readed/${id}`, {

            method: 'PATCH',

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


        fetch(`/admin/messages-delete/${id}`, {

            method: 'DELETE',
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
                
                const oppositeBtns = [document.querySelector('.showAnno'), document.querySelector('.archivedAnno')];
                oppositeBtns.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                document.querySelector('.addingAnno').classList.remove('hide');
                document.querySelector('.actualAnno').classList.add('hide');
                document.querySelector('.popupForm').classList.add('hide');
                document.querySelector('.archiveAnno').classList.add('hide');

            };

            if(hasClass(e.target, 'showAnno') || hasClass(e.target, 'close')) {
                e.preventDefault()

                const oppositeBtns = [document.querySelector('.addAnno'), document.querySelector('.archivedAnno')];
                oppositeBtns.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                document.querySelector('.actualAnno').classList.remove('hide');
                document.querySelector('.addingAnno').classList.add('hide');
                document.querySelector('.popupForm').classList.add('hide');
                document.querySelector('.archiveAnno').classList.add('hide');

            };

            if(hasClass(e.target, 'archivedAnno')) {
                
                const oppositeBtns = [document.querySelector('.addAnno'), document.querySelector('.showAnno')];
                oppositeBtns.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                
                document.querySelector('.addingAnno').classList.add('hide');
                document.querySelector('.popupForm').classList.add('hide');
                document.querySelector('.actualAnno').classList.add('hide');
                document.querySelector('.archiveAnno').classList.remove('hide');

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
            if(hasClass(e.target, 'delatt')) {
                if(window.confirm("Załącznik zostanie trwale usunięty, kontynuować ?")) {
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
                                    e.target.innerText = "załącznik usunięty";
                                    e.target.style.color = 'red';
                                    const buttons = [...document.getElementsByClassName(`${e.target.classList[1]}`)];
                                    buttons.forEach(el => el.disabled = true);
                                } else {
                                    e.target.innerText = 'Wystąpił błąd';
                                    e.target.style.color = 'red';
                                }
                            });
                } else {
                    return;
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
                            info.classList.remove('hide');
                            info.style.color = 'green';
                            info.innerText = 'zmiany zostały wprowadzone';
                            document.querySelector('.popupForm form').style.display = 'none';
                            document.querySelector('.attBox').style.display = 'none';
                            window.scrollTo(0,0);
                        } else {
                            info.classList.remove('hide');
                            info.style.color = 'red';
                            info.innerText = 'W trakcie publikacji wystąpił błąd! Odśwież stronę';
                        };
                    });
                } else {
                    return;
                }
            };
            if(hasClass(e.target, 'archiveAnnoOn')) {

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
                            btn.innerText = 'Ogłoszenie przeniesione do archiwum';
                            btn.style.color = 'red';
                            const buttons = [...document.getElementsByClassName(`${_id}`)];
                            buttons.forEach(el => el.disabled = true);
                        }
                    })
            };

            if(hasClass(e.target, 'moveToArchive')) {

                const archive = true;
                const _id = e.target.classList[1];
                const btn = e.target;

                fetch('/admin/archive/news', {

                    method: 'PATCH',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({_id, archive})
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.ok === true) {
                            btn.innerText = 'Ogłoszenie przeniesione do archiwum';
                            btn.style.color = 'red';
                            const buttons = [...document.getElementsByClassName(`${_id}`)];
                            buttons.forEach(btn => btn.disabled = true);
                        }
                    })
            };

            if(hasClass(e.target, 'unArchiveAnno')) {

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
                            btn.innerText = 'Ogłoszenie przywrócone';
                            btn.style.color = 'green';
                            const buttons = [...document.getElementsByClassName(`${_id}`)];
                            buttons.forEach(el => el.disabled = true);
                        }
                    })
            };

            if(hasClass(e.target, 'returnArticle')) {

                const archive = false;
                const _id = e.target.classList[1];
                const btn = e.target;

                fetch('/admin/archive/news', {

                    method: 'PATCH',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({_id, archive})
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.ok === true) {
                            btn.innerText = 'Ogłoszenie przywrócone';
                            btn.style.color = 'green';
                            const buttons = [...document.getElementsByClassName(`${_id}`)];
                            buttons.forEach(btn => btn.disabled = true);
                        }
                    })
            };

            if(hasClass(e.target, 'dwlatt')) {

                const id = e.target.classList[1];
                const table = document.getElementsByClassName(`${id}`);
                const name = table[0].innerText
                window.location.href =  `/admin/download/${id}/${name}`;
            };

            if(hasClass(e.target, 'dwldoc')) {
                const id = e.target.classList[1];
                const table = document.getElementsByClassName(`${id}`);
                const name = table[0].innerText;
                window.location.href = `/admin/downloaddoc/${id}/${name}`;

            }
            if(hasClass(e.target, 'deleteAnno')) {

                const _id = e.target.classList[1];

                if(window.confirm('Ogłoszenie zostanie trwale usunięte, czy chcesz kontynuować ?')) {

                    fetch(`/admin/anno-delete/${_id}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            if(data.ok) {
                                e.target.innerText = 'Ogłoszenie zostanie usunięte';
                                e.target.style.color = 'red';
                                e.target.style.fontSize = '2rem';

                                const buttons = [...document.getElementsByClassName(`${_id}`)];
                                buttons.forEach(el => el.disabled = true);
                                
                            } else {
                                h1.innerText = 'Nastąpił nieoczekiwany błąd'
                                annobox.appendChild(h1);
                            }
                        })
                }
            };
            if(hasClass(e.target, 'deleteDocument')) {
                const _id = e.target.classList[1];
                const btn = [...document.getElementsByClassName(`${_id}`)];

                if(window.confirm('Trwałe usunięcie dokumentu z bazy danych, kontynuować?')) {
                    fetch(`/admin/documents-delete/${_id}`,{
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            if(data.ok) {
                                e.target.innerText = 'Dokument usunięty';
                                e.target.style.color = 'red';
                                btn.forEach(btn => btn.disabled = true);
                            }
                        })
                }
            };
            if(hasClass(e.target, 'addArticle')) {

                e.preventDefault();
                e.target.classList.add('active');

                document.querySelector('.showArticles').classList.remove('active');
                document.querySelector('.showArchivedArticles').classList.remove('active');
                document.querySelector('.addingArticle').classList.remove('hide');
                document.querySelector('.actualArticles').classList.add('hide');
                document.querySelector('.popupFormNews').classList.add('hide');
                document.querySelector('.archivedArticles').classList.add('hide');
                
            };

            if(hasClass(e.target, 'showArticles') || hasClass(e.target, 'closeEditor')) {

                e.preventDefault();

                document.querySelector('.addArticle').classList.remove('active');
                document.querySelector('.showArchivedArticles').classList.remove('active');
                document.querySelector('.showArticles').classList.add('active');
                document.querySelector('.actualArticles').classList.remove('hide');
                document.querySelector('.addingArticle').classList.add('hide');
                document.querySelector('.popupFormNews').classList.add('hide');
                document.querySelector('.archivedArticles').classList.add('hide');
            };

            if(hasClass(e.target, 'showArchivedArticles')) {

                e.preventDefault();

                document.querySelector('.addArticle').classList.remove('active');
                document.querySelector('.showArticles').classList.remove('active');
                document.querySelector('.showArchivedArticles').classList.add('active');
                document.querySelector('.actualArticles').classList.add('hide');
                document.querySelector('.addingArticle').classList.add('hide');
                document.querySelector('.popupFormNews').classList.add('hide');
                document.querySelector('.archivedArticles').classList.remove('hide');
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

                removeParagraph(e);
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

                        fetch('/admin/news-add', {
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

            if(hasClass(e.target, 'editArticle')) {
                
                if(document.querySelectorAll('.toArticle').length > 1) {
                    const old = document.querySelectorAll('.toArticle')
                    old.forEach(a => a.remove());
                };

                const _id = e.target.classList[1];
                const paragraphBox = document.querySelector('.paragrapfBoxEdit');
                const fotoBox = document.querySelector('.img');

                fetch(`/admin/news-find/${_id}`, {
                    method: 'GET',
                })
                    .then(res => res.json())
                    .then(data => {

                        const {title, date, description, foto, _id} = data;
                        document.querySelector('#titleArtEdit').value = title;
                        document.querySelector('#dateArtEdit').value = date;
                        document.querySelector('.articleId').innerText = `idnetyfikator: ${_id}`;
                        description.forEach(p => {
                            const textarea = document.createElement('textarea');
                            textarea.classList.add('toArticle')
                            textarea.value = p;
                            paragraphBox.appendChild(textarea);
                        });

                        if(foto) {
                           fotoBox.src = `../public/images/imagesDB/${foto}`;
                        } else {
                            fotoBox.src = `../public/images/noFoto.jpg`;
                            document.querySelector('.removeFoto').disabled = true;
                        }

                        document.querySelector('.popupFormNews').classList.remove('hide');
                        document.querySelector('.showArticles').classList.remove('active');
                        document.querySelector('.actualArticles').classList.add('hide');
                        document.querySelector('.addArticle').classList.remove('active');
                        document.querySelector('.addingArticle').classList.add('hide');


                    })

            };

            if(hasClass(e.target, 'removeParagraphEdit')) {
                removeParagraph(e);
            };

            if(hasClass(e.target, 'addParagrapfEdit')) {
                
                e.preventDefault();
                const paragraphBox = document.querySelector('.paragrapfBoxEdit');
                const removeBtn = document.querySelector('.removeParagraphEdit');
                const textarea = document.createElement('textarea');
                textarea.classList.add('toArticle')

                paragraphBox.appendChild(textarea);
                removeBtn.classList.remove('hide');
            };

            if(hasClass(e.target, 'removeFoto')) {
                
                    if(window.confirm('Zdjęcie zostanie trwale usunięte, kontynuować ? ')){
                    const path = document.querySelector('.img').src;
                    const pathArr = path.split('/');
                    const foto = pathArr.reverse()[0];
                    const h1 = document.querySelector('.fotoTitle');
                    
                    fetch('/admin/news-foto-delete', {
                        method: 'PATCH',
                        headers: {'Content-Type' : 'application/json'},
                        body: JSON.stringify({foto}),
                    })
                        .then(res => res.json())
                        .then(data => {
                            if(data.ok) {
                               
                                h1.innerText = 'Zdjęcie zostanie usunięte';
                                h1.style.color = 'red';
                            } else {
                                h1.innerText = 'Wystąpił problem przy usuwaniu';
                                h1.style.color = 'red';
                            }
                        });
                    }else{return};
            };

            if(hasClass(e.target, 'editArticleSend')) {

                e.preventDefault();

                const title = document.querySelector('#titleArtEdit');
                const paragraphs = document.querySelectorAll(".toArticle");
                const infoBox = document.querySelector('.infoBoxEdit');
                infoBox.classList.add('hide');

                if (title.value ==='' || paragraphs.length < 1) {
                    infoBox.classList.remove('hide');
                    infoBox.innerText = 'Niektóre wymagane pola pozostały puste, zmiany nie zostaną zapisane';
                    infoBox.style.color = 'red';
                } else {
                    if(window.confirm("Wprowadzić zmiany w artykule? ")) {
                        const _id = document.querySelector('.articleId').innerText.split(' ')[1];
                        const newTitle = title.value;
                        const newDate = document.querySelector('#dateArtEdit').value;
                        const paragrafs = document.querySelectorAll('.toArticle')
                        arr=[]
                        let i = paragrafs.length
                        paragrafs.forEach(p => {
                            if(i>1){
                            arr.push(p.value + '<');
                            i--
                            } else {
                                arr.push(p.value);
                            };
                        });
                        const foto = document.querySelector('#fileInputEdit');
                        const data = foto.files[0];
                        
                        const formData = new FormData()
                        formData.append('_id' , _id);
                        formData.append('title' , newTitle);
                        formData.append('date', newDate);
                        formData.append('description', arr);
                        formData.append('foto', data);

                        fetch('/admin/news-edit', {
                            method: 'PUT',
                            body: formData,
                        }).then(res => res.json())
                        .then(data => {
                            if(data.ok) {
                                infoBox.classList.remove('hide');
                                infoBox.style.color = 'green';
                                infoBox.innerText = 'Zmiany zostały wprowadzone';
                                paragrafs.forEach(parag=> parag.remove());
                                document.querySelector('#dateArtEdit').value = '';
                                title.value = '';
                                foto.value = ''
                            } else {
                                infoBox.classList.remove('hide');
                                infoBox.style.color = 'red';
                                infoBox.innerText = 'W trakcie zapisu wystapił błąd';
                            };
                        })
                    } else {return};
                }


            };

            if(hasClass(e.target, 'removeArticle')) {
                const _id = e.target.classList[1];
                
                if(window.confirm('Artykuł zostanie trwale usunięty, kontynuować?')){
                fetch(`/admin/news-delete/${_id}`, {

                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.ok) {
                            e.target.innerText = 'Artykuł zostanie usunięty';
                            e.target.style.color = 'red';
                            e.target.disabled = true;
                            const buttons = [...document.getElementsByClassName(`${_id}`)];
                            buttons.forEach(btn => btn.disabled = true);
                        }
                    });
                } else {return};
            };

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
                    .then(res => res.json())
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
                        };
                    })

            };
            if(hasClass(e.target, 'refresh')) {
                window.location.href = '/admin/base';
            }
            if(hasClass(e.target, 'addProduct')) {
                
                e.preventDefault();
                e.target.classList.add('active');

                document.querySelector('.showProducts').classList.remove('active');
                document.querySelector('.addingArticle').classList.remove('hide');
                document.querySelector('.actualProducts').classList.add('hide');
                document.querySelector('.editArticle').classList.add('hide');
            };

            if(hasClass(e.target, 'showProducts')) {

                e.preventDefault();
                e.target.classList.add('active');

                document.querySelector('.addProduct').classList.remove('active');
                document.querySelector('.addingArticle').classList.add('hide');
                document.querySelector('.actualProducts').classList.remove('hide');
                document.querySelector('.editArticle').classList.add('hide');

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
                        .then(res => res.json())
                        .then(data => {
                            if(data.ok) {
                                infoBox.classList.remove('hide');
                                infoBox.style.color = 'green';
                                infoBox.innerText = 'Produkt został dodany!'
                                fotodata.value = '';
                                name.value = '';
                                description.value = ';'
                            } else {
                                infoBox.classList.remove('hide');
                                infoBox.style.color = 'red';
                                infoBox.innerText = 'Wystąpił nieoczekiwany błąd!'
                            };
                        });
                    };
            };

            if(hasClass(e.target, 'clearArtAsso')) {
                document.querySelector('.infoBoxArticle').classList.add('hide');
                document.querySelector('#prodNameLab').style.color = 'black';
                document.querySelector('#prodDescriptionLab').style.color = 'black';
                document.querySelector('#prodName').value = '';
                document.querySelector('#prodDescription').value = '';
            };

            if(hasClass(e.target, 'removeProduct')) {
                e.preventDefault();
                if(window.confirm('Czy na pewno chcesz usunąć element?')){
                    const _id = e.target.classList[1];

                    fetch(`/admin/products-delete/${_id}`, {
                        method: 'DELETE',
                    })
                        .then(res => res.json())
                        .then(data => {
                            if(data.ok) {
                                e.target.innerText = 'Element zostanie usunięty';
                                e.target.style.color = 'red';
                                e.target.disabled = true;
                                document.querySelector('.editProduct').disabled = true;
                            } else {
                                e.target.innerText = 'Wystąpił  błąd zapisu';
                                e.target.style.color = 'red';
                            };
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
                });

            };

            if(hasClass(e.target, 'closeEditProduct')) {
                e.preventDefault();
                
                document.querySelector('.editArticle').classList.add('hide');
                document.querySelector('.showProducts').classList.add('active');
                document.querySelector('.addingArticle').classList.add('hide');
                document.querySelector('.actualProducts').classList.remove('hide');
                document.querySelector('.editArticle').classList.add('hide');
                document.querySelector('.addProduct').classList.remove('active');
            };


            if(hasClass(e.target, 'removeProductFoto')) {
                if(window.confirm('Zdjęcie zostanie trwale usunięte, kontynuować ? ')){
                    const path = document.querySelector('.img').src;
                    const pathArr = path.split('/');
                    const foto = pathArr.reverse()[0];
                    const h1 = document.querySelector('.labelToFoto');
                    
                    fetch('/admin/products-foto-delete', {
                        method: 'PATCH',
                        headers: {'Content-Type' : 'application/json'},
                        body: JSON.stringify({foto}),
                    })
                        .then(res => res.json())
                        .then(data => {
                            if(data.ok) {
                               
                                h1.innerText = 'Zdjęcie zostanie usunięte';
                                h1.style.color = 'red';
                            } else {
                                h1.innerText = 'Wystąpił problem przy usuwaniu';
                                h1.style.color = 'red';
                            }
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
                        }).then(res => res.json())
                        .then(data => {
                            if(data.ok) {
                                infoBox.classList.remove('hide');
                                infoBox.style.color = 'green';
                                infoBox.innerText = 'Zmiany zostały wprowadzone';
                                title.value = '';
                                description.value = '';
                                foto.value = ''
                            } else {
                                infoBox.classList.remove('hide');
                                infoBox.style.color = 'red';
                                infoBox.innerText = 'W trakcie zapisu wystapił błąd';
                            };
                        })
                    } else {return};
                }


            };


            
});

window.addEventListener('load', loadName);
window.addEventListener('load', loadSpaceBars);
