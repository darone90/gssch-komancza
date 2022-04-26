

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

const showhideArticles = (e, className) => {
    const buttonArray = ['addArticle','showArchivedArticles','showArticles'];
    const oppositeBtn = buttonArray.filter(name => name !== e.target.classList[0]);
    e.target.classList.add('active');
    oppositeBtn.forEach(name => document.querySelector(`.${name}`).classList.remove('active'));
    const classArray = ['.addingArticle', '.actualArticles', '.popupFormNews','.archivedArticles'];
    const opositeClass = classArray.filter(name => name !== className);
    document.querySelector(`${className}`).classList.remove('hide');
    opositeClass.forEach(name =>  document.querySelector(`${name}`).classList.add('hide'));

}

document.addEventListener('click', (e) => {

    if(hasClass(e.target, 'addArticle')) {

        e.preventDefault();
        showhideArticles(e, '.addingArticle');
    };

    if(hasClass(e.target, 'showArticles')) {
                
        e.preventDefault()
        showhideArticles(e, '.actualArticles');
    };

    if(hasClass(e.target, 'showArchivedArticles')) {

        e.preventDefault();
        showhideArticles(e, '.archivedArticles');
    };

    if(hasClass(e.target, 'removeParagraph')) {

        removeParagraph(e);
    };

    if(hasClass(e.target, 'removeParagraphEdit')) {

        removeParagraph(e);
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

    if(hasClass(e.target, 'addParagrapfEdit')) {
                
        e.preventDefault();
        const paragraphBox = document.querySelector('.paragrapfBoxEdit');
        const removeBtn = document.querySelector('.removeParagraphEdit');
        const textarea = document.createElement('textarea');
        textarea.classList.add('toArticle')

        paragraphBox.appendChild(textarea);
        removeBtn.classList.remove('hide');
    };

    if(hasClass(e.target, 'sendArticle')) {

        e.preventDefault();
        
        const title = document.querySelector('#titleArt');
        const paragrafs = document.querySelectorAll('.toArticle');
        let paragraphIsEmpty = false;

        const titleLabel = document.querySelector('#titleArtLab');
        titleLabel.style.color = 'black';
        const descriptlabel = document.querySelector('div.addingArticle form h2');
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

                const loading = document.querySelector('.loadingBox');
                scrollContent(0);
                loading.classList.add('onload');

                const foto = document.querySelector('#fileInput');
                const dataFile = foto.files[0];
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
                formData.append("foto", dataFile);

                fetch('/admin/news-add', {
                    method: 'POST',
                    body: formData,
                })
                    .then(res => {
                        if(res.redirected) {
                            return data = res.url;
                        } else {
                            return data = res.json();
                        } 
                    })
                    .then(data => {
                        if(data.ok) {
                            loading.classList.remove('onload');
                            infoBox.classList.remove('hide');
                            infoBox.style.color = 'green';
                            infoBox.innerText = 'Artykuł został opublikowany';
                            paragrafs.forEach(parag=> parag.remove());
                            document.querySelector('#dateArt').value = '';
                            title.value = '';
                            foto.value = '';
                            setTimeout(()=> {
                                window.location.pathname = '/admin/articles';
                            },1500);
                        } else {
                            window.location.href = data;
                        }
                    })
            } else {
                return;
            }
        };
    };

    if(hasClass(e.target, 'editArticle')) {
                
        if(document.querySelectorAll('.toArticle').length > 0) {
            const old = document.querySelectorAll('.toArticle')
            console.log(old)
            old.forEach(a => {a.remove()});
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
                   document.querySelector('.removeFoto').disabled = false;
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
                const loading = document.querySelector('.loadingBox');
                loading.classList.add('onload');

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
                        paragrafs.forEach(parag=> parag.remove());
                        document.querySelector('#dateArtEdit').value = '';
                        title.value = '';
                        foto.value = ''
                        setTimeout(()=> {
                            window.location.pathname ="/admin/articles";
                        }, 1500)
                    } else {
                        window.location.href = data;
                    };
                })
            } else {return};
        }


    };

    if(hasClass(e.target, 'removeArticle')) {
        const _id = e.target.classList[1];
        
        if(window.confirm('Artykuł zostanie trwale usunięty, kontynuować?')){
            const loading = document.querySelector('.loadingBox');
            loading.classList.add('onload');

        fetch(`/admin/news-delete/${_id}`, {

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
                    e.target.innerText = 'Artykuł zostanie usunięty';
                    e.target.style.color = 'red';
                    e.target.disabled = true;
                    const buttons = [...document.getElementsByClassName(`${_id}`)];
                    buttons.forEach(btn => btn.disabled = true);
                } else {
                    window.location.href = data;
                }
            });
        } else {return};
    };

    if(hasClass(e.target, 'clearArt')) {

        document.querySelector('#titleArt').value = '';
        const paragrafs = document.querySelectorAll('.toArticle');
        paragrafs.forEach(p => p.remove());
        document.querySelector('#titleArtLab').style.color = 'black';;
        document.querySelector('div.addingArticle form h2').style.color = 'black';
        document.querySelector('.infoBoxArticle').classList.add('hide');
        document.querySelector('#dateArt').value = '';
        document.querySelector('.removeParagraph').classList.add('hide');
        document.querySelector('#fileInput').value = '';
        
    };

    if(hasClass(e.target, 'removeFoto')) {
                
        if(window.confirm('Zdjęcie zostanie trwale usunięte, kontynuować ? ')){
            const loading = document.querySelector('.loadingBox');
            loading.classList.add('onload');
        const path = document.querySelector('.img').src;
        const pathArr = path.split('/');
        const foto = pathArr.reverse()[0];
        const h1 = document.querySelector('.fotoTitle');
        
        fetch('/admin/news-foto-delete', {
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
                }
            });
        }else{return};
    };

    if(hasClass(e.target, 'moveToArchive')) {
        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');
    const archive = true;
    const _id = e.target.classList[1];
    const btn = e.target;

    fetch('/admin/archive/news', {

        method: 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({_id, archive})
    })
        .then(res => {
            if(res.redirected) {
                return data = res.url
            } else {
                return data = res.json()
            } 
        })
        .then(data => {
            if(data.ok === true) { 
                loading.classList.remove('onload');
                btn.innerText = 'Ogłoszenie przeniesione do archiwum';
                btn.style.color = 'red';
                const buttons = [...document.getElementsByClassName(`${_id}`)];
                buttons.forEach(btn => btn.disabled = true);
            } else {
                window.location.href = data;
            }
        })
    };

    if(hasClass(e.target, 'returnArticle')) {

        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');

        const archive = false;
        const _id = e.target.classList[1];
        const btn = e.target;

        fetch('/admin/archive/news', {

            method: 'PATCH',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({_id, archive})
        })
            .then(res => {
                if(res.redirected) {
                    return data = res.url
                } else {
                    return data = res.json()
                } 
            })
            .then(data => {
                if(data.ok === true) {

                    loading.classList.remove('onload');
                    btn.innerText = 'Ogłoszenie przywrócone';
                    btn.style.color = 'green';
                    const buttons = [...document.getElementsByClassName(`${_id}`)];
                    buttons.forEach(btn => btn.disabled = true);
                } else {
                    window.location.href = data;
                }
            })
    };

});

