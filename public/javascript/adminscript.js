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

            if(hasClass(e.target, 'showArticles') || hasClass(e.target, 'closeEditor')) {

                e.preventDefault();

                document.querySelector('.addArticle').classList.remove('active');
                document.querySelector('.showArticles').classList.add('active');
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

            if(hasClass(e.target, 'editArticle')) {
                
                if(document.querySelectorAll('.toArticle').length > 1) {
                    const old = document.querySelectorAll('.toArticle')
                    old.forEach(a => a.remove());
                };

                const _id = e.target.classList[1];
                const paragraphBox = document.querySelector('.paragrapfBoxEdit');
                const fotoBox = document.querySelector('.img');

                fetch('/admin/get-article', {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({_id})
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
                    
                    fetch('/admin/remove-foto', {
                        method: 'POST',
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

                        fetch('/admin/update-article', {
                            method: 'POST',
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
                fetch('/admin/remove-article', {

                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({_id})
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.ok) {
                            e.target.innerText = 'Artykuł zostanie usunięty';
                            e.target.style.color = 'red';
                            e.target.disabled = true;
                            document.querySelector('.editArticle').disabled = true;
                        }
                    });
                } else {return};
            };

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

                    fetch('/admin/add-assortment', {
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
                    fetch('/admin/remove-product', {
                        method: 'POST',
                        headers: {'Content-Type' : 'application/json'},
                        body: JSON.stringify({_id})
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

                fetch('/admin/find-product', {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({_id})
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
                    
                    fetch('/admin/remove-product-foto', {
                        method: 'POST',
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

                        fetch('/admin/update-product', {
                            method: 'POST',
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