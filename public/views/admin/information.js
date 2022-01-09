import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Ogłoszenia');
    }

    loadAnnoucements(data) {

        const annoBox = document.querySelector('.actualAnno');
        const archivedAnnoBox = document.querySelector('.archiveAnno');

        const dataToShow = [...data].reverse();
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
                <button class='editAnno ${actualAnno[i]._id}'>Edytuj</button>
                <button class='deleteAnno ${actualAnno[i]._id}'>Usuń</button>
                <button class='archiveAnnoOn ${actualAnno[i]._id}'>Archiwizuj</button>
            `;
            if (actualAnno[i].attachements.length > 0) {
            const attachements = actualAnno[i].attachements
            const attBox = document.createElement('div');
            const titleAtt = document.createElement('h3');
            titleAtt.innerText = 'Lista załączników: ';
            attBox.appendChild(titleAtt);
            attachements.forEach(el => {
                const p = document.createElement('p');
                p.innerText = `${el.oldName}`
                attBox.appendChild(p);
            })
            anno.appendChild(attBox);

            };
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
                <button class='unArchiveAnno ${archivedAnno[i]._id}'>Przywróć</button>
                <button class='deleteAnno ${archivedAnno[i]._id}'>Usuń</button>
            `;

            if (archivedAnno[i].attachements.length > 0) {

            const attachements = archivedAnno[i].attachements
                const attBox = document.createElement('div');
                const titleAtt = document.createElement('h3');
                titleAtt.innerText = 'Lista załączników: ';
                attBox.appendChild(titleAtt);
                attachements.forEach(el => {
                    const p = document.createElement('p');
                    p.innerText = `${el.oldName}`;
                    p.classList.add(`${el.newName}`);
                   
                    const downloadbtn = document.createElement('button');
                    downloadbtn.classList.add('dwlatt');
                    downloadbtn.classList.add(`${el.newName}`);
                    downloadbtn.innerText = 'Pobierz'
                    
                    attBox.appendChild(p);
                    attBox.appendChild(downloadbtn);
                    anno.appendChild(attBox);
                });
            };
           
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

        fetch('/admin/anno-get', {
            method: 'GET',
            redirect: 'follow'
        })
            .then(res => {
                if(res.redirected) {
                    window.location.href = res.url;
                    return [];
                } else {
                    return res.json()}
            })
            .then(data => this.loadAnnoucements(data));

        return `
        <div class='annoucementsBox'>
            <button class='addAnno active'>Dodaj ogłoszenie</button>
            <button class='showAnno'>Aktualne ogłoszenia</button>
            <button class='archivedAnno'>Ogłoszenia archiwalne</button>
            <button class='mainPage'><a href="/announcements">Podgląd strony głównej</a></button>
        <button class='refresh'><a href="/admin/info"><i class="fas fa-sync-alt"></i>Odśwież</a></button>
            <div class='addingAnno'>
                <form>
                    <label for="title" id='forTitle'>Tytuł ogłoszenia</label>
                    <input type="text" id='title' placeholder='Proszę wprowadzić tytuł ogłoszenia'>
                    <label for="date" id='forDate'>Data</label>
                    <input type="date" id="date">
                    <label for="description" id='forDescription'>Treść ogłoszenia</label>
                    <textarea id="description" cols="30" rows="10" placeholder='Proszę wprowadzić treść'></textarea>
                    <h3>Akceptowane formaty załączników to: .pdf, .doc, .docx, .odt</h3>
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
                        <button class="addAtachementPopup">Dodaja załącznik</button>
                        <button class="publicEdit">Zapisz zmiany</button>
                        <button class='close'>Zamknij edytor</button>
                    </form>
                    <h2>Lista załączników :</h2>
                    <div class='infoBoxEdit hide'></div>
                </div>
        </div>
        `
    };
};