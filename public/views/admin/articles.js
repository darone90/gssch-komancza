import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Artykuły');
    }

    articleLoad(data) {

        const articlesBox = document.querySelector('.actualArticles');
        const archivedArticlesBox = document.querySelector('.archivedArticles');

        const dataToShow = [...data];

        const actualData = dataToShow.filter(el => el.archived === false);
        const archivedData = dataToShow.filter(el => el.archived === true);


        if(actualData.length > 0) {

            for(let i = 0; i < actualData.length; i++){

                const article = document.createElement('div')
                article.classList.add('articleShort');
                const {title, date, created, _id} = actualData[i];

                article.innerHTML = `
                    <h1>Tytuł: ${title} czas wydarzenia: ${date} utworzony: ${new Date(Number(created)).toISOString().slice(0,10)}</h1>
                    <button class='editArticle ${_id}' id='${_id}'>Edytuj</button>
                    <button class='moveToArchive ${_id}'>Archiwizuj</button>
                    <button class='removeArticle ${_id}' id='${_id}'>Usuń</button>
                `;

                articlesBox.appendChild(article);
            };
        } else {

            const noArticle = document.createElement('div');
            noArticle.classList.add('noAnno');

            noArticle.innerHTML = `
                <h1>Aktualnie brak opublikowanych artykułów</h1>
            `;

            articlesBox.appendChild(noArticle);

        };

        if(archivedData.length > 0) {

            for(let i = 0; i < archivedData.length; i++){

                const article = document.createElement('div')
                article.classList.add('articleShort');
                const {title, date, created, _id} = archivedData[i];

                article.innerHTML = `
                    <h1>Tytuł: ${title} czas wydarzenia: ${date} utworzony: ${new Date(Number(created)).toISOString().slice(0,10)}</h1>
                    <button class='returnArticle ${_id}'>Przywróć</button>
                    <button class='removeArticle ${_id}' id='${_id}'>Usuń</button>
                `;

                archivedArticlesBox.appendChild(article);
            };
        } else {

            const noArticle = document.createElement('div');
            noArticle.classList.add('noAnno');

            noArticle.innerHTML = `
                <h1>Aktualnie brak artykułów archiwalnych</h1>
            `;

            archivedArticlesBox.appendChild(noArticle);

        };

        const loading = document.querySelector('.loadingBox');
        loading.classList.remove('onload');
    };

    async getHtml() {

        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');

        fetch('/admin/news-get', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => this.articleLoad(data));

        return `
        <button class='addArticle active'>Dodaj artykuł</button>
        <button class='showArticles'>Opublikowane artykuły</button>
        <button class='showArchivedArticles'>Archiwum</button>
        <button class='mainPage hide'><a href="/">Podgląd strony głównej</a></button>
        <button class='refreshArticle hide'>Odśwież aby zobaczyć zmiany</button>
        <div class='addingArticle'>
            <form>
                <label for="titleArt" id='titleArtLab'>Tytuł artykułu</label>
                <input type="text" id='titleArt' placeholder='Co się wydarzyło'>
                <label for="dateArt">Data wydarzenia</label>
                <input type="text" id='dateArt' placeholder='Kiedy?'>
                <h1>Paragrafy artykułu: </h1>
                <div class='paragraphBox'>
                    
                    <button class="addParagraph">Dodaj paragraf</button>
                </div>
                <button class='removeParagraph hide'>Usuń paragraf</button>
                <label for="fileInput">Dodaj zdjęcie</label>
                <input name='fileInput' type="file" id="fileInput" accept=".jpg,.png">
                <button class='sendArticle'>Opublikuj artykuł</button>
            </form>
                <button class='clearArt'>Wyczyść formularz</button>
                <div class='infoBoxArticle hide'></div>
            </div>
            <div class='actualArticles hide'>
                <h1>Aktualnie opublikowane artykuły: </h1>
            </div>
            <div class='archivedArticles hide'>
                <h1>Artykuły archiwalne: </h1>
            </div>
            <div class='popupFormNews hide'>
                    <form>
                        <label for="titleArtEdit">Tytuł artykułu</label>
                        <input type="text" id='titleArtEdit'>
                        <label for="dateArtEdit">Data wydarzenia</label>
                        <input type="text" id='dateArtEdit'>
                        <h1>Paragrafy artykułu</h1>
                        <div class='paragrapfBoxEdit'>
                            <button class="addParagrapfEdit">Dodaj paragraf</button>
                            <button class='removeParagraphEdit'>Usuń paragraf</button>
                        </div>
                        <label for="fileInput">Zmień zdjęcie</label>
                        <input type="file" id="fileInputEdit" accept=".jpg,.png">
                        <button class='editArticleSend'>Wprowadź zmiany</button>
                        <button class='closeEditor'>Zamknij edytor</button>
                    </form>
                        <h1 class='fotoTitle'>Zdjęcie aktualne: </h1>
                        <img class='img' src="">
                        <h1 class='articleId'></h1>
                        <button class='removeFoto'>Usuń zdjęcie</button>
                    <div class='infoBoxEdit hide'></div>
                </div>
        </div>
        `
    }
}