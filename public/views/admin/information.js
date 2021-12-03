import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Ogłoszenia');
    }

    loadAnnoucements(data) {

        const annoBox = document.querySelector('.actualAnno');
        const archivedAnnoBox = document.querySelector('.archiveAnno');

        const dataToShow = [...data];
        const actualAnno = dataToShow.filter(el => el.archived === false);
        const archivedAnno = dataToShow.filter(el => el.archived === true);

        if(actualAnno.length > 0) {

        for(let i = 0; i < actualAnno.length; i++) {

            const anno = document.createElement('div');
            anno.classList.add('annoucement');
            anno.classList.add(`${actualAnno[i]._id}`);

            anno.innerHTML = `
                <h1>${actualAnno[i].title}</h1>
                <h2>${actualAnno[i].date}</h2>
                <p>${actualAnno[i].description}</p>
                <p>Utworzono dnia ${new Date(Number(actualAnno[i].created)).toISOString().slice(0,10)}</p>
                <button class='editAnno ${actualAnno[i]._id}' id='${actualAnno[i]._id}'>Edytuj</button>
                <button class='deleteAnno ${actualAnno[i]._id}'>Usuń</button>
                <button class='archiveAnno ${actualAnno[i]._id}'>Archiwizuj</button>
            `;

            annoBox.appendChild(anno);
        };
    } else {

        const noAnno = document.createElement('div');
        noAnno.classList.add('noAnno');

        noAnno.innerHTML = `
            <h1>Aktualnie brak opublikowanych ogłoszeń</h1>
        `;

        annoBox.appendChild(noAnno)
    };

    if(archivedAnno.length > 0) {

        for(let i = 0; i < archivedAnno.length; i++) {

            const anno = document.createElement('div');
            anno.classList.add('annoucement');
            anno.classList.add(`${archivedAnno[i]._id}`);

            anno.innerHTML = `
                <h1>${archivedAnno[i].title}</h1>
                <h2>${archivedAnno[i].date}</h2>
                <p>${archivedAnno[i].description}</p>
                <p>Utworzono dnia ${new Date(Number(archivedAnno[i].created)).toISOString().slice(0,10)}</p>
                <button class='unArchiveAnno ${archivedAnno[i]._id}' id='${archivedAnno[i]._id}'>Przywróć</button>
                <button class='deleteAnno ${archivedAnno[i]._id}'>Usuń</button>
            `;

            archivedAnnoBox.appendChild(anno);
        };
    } else {

        const noAnno = document.createElement('div');
        noAnno.classList.add('noAnno');

        noAnno.innerHTML = `
            <h1>Aktualnie brak archiwalnych ogłoszeń</h1>
        `;

        archivedAnnoBox.appendChild(noAnno)
    };

        const loading = document.querySelector('.loadingBox');
        loading.classList.remove('onload');
    };

    async getHtml() {

        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');

        fetch('/admin/get-anno', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => this.loadAnnoucements(data));

        return `
        <div class='annoucementsBox'>
            <button class='addAnno active'>Dodaj ogłoszenie</button>
            <button class='showAnno'>Aktualne ogłoszenia</button>
            <button class='archivedAnno'>Ogłoszenia archiwalne</button>
            <div class='addingAnno'>
                <form>
                    <label for="title" id='forTitle'>Tytuł ogłoszenia</label>
                    <input type="text" id='title' placeholder='Proszę wprowadzić tytuł ogłoszenia'>
                    <label for="date" id='forDate'>Data</label>
                    <input type="date" id="date">
                    <label for="description" id='forDescription'>Treść ogłoszenia</label>
                    <textarea id="description" cols="30" rows="10" placeholder='Proszę wprowadzić treść'></textarea>
                    <h1>Akceptowane formaty załączników to: .pdf, .doc, .docx, .odt</h1>
                    <button class="addAtachement">Dodaja załącznik</button> 
                    <button class="public">Publikuj</button>
                    <button class='clear'>Wyczyść formularz</button>
                </form>
                <div class='infoBox hide'></div>
            </div>
            <div class='actualAnno hide'>
                <h1>Aktualnie zamieszczone ogłoszenia: </h1>
            </div>
            <div class='archiveAnno hide'>
                <h1>Ogłoszenia archiwalne: </h1>
            </div>
            <div class='popupForm hide'>
                    <form>
                        <label for="titleEdit" id='forTitleEdit'>Tytuł ogłoszenia</label>
                        <input type="text" id='titleEdit'>
                        <label for="dateEdit" id='forDateEdit'>Data</label>
                        <input type="date" id="dateEdit">
                        <label for="descriptionEdit" id='forDescriptionEdit'>Treść ogłoszenia</label>
                        <textarea id="descriptionEdit" cols="30" rows="10"></textarea>
                        <button class="publicEdit">Zapisz zmiany</button>
                        <button class='close'>Zamknij edytor</button>
                    </form>
                    <div class='infoBoxEdit hide'></div>
                </div>
        </div>
        `
    };
};