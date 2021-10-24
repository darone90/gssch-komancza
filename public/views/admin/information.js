import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Ogłoszenia');
    }

    loadAnnoucements(data) {

        const annoBox = document.querySelector('.actualAnno');

        if(data.length > 0) {

        for(let i = 0; i < data.length; i++) {

            const anno = document.createElement('div');
            anno.classList.add('annoucement');

            anno.innerHTML = `
                <h1>${data[i].title}</h1>
                <h2>${data[i].date}</h2>
                <p>${data[i].description}</p>
                <p>Utworzono dnia ${new Date(Number(data[i].created)).toISOString().slice(0,10)}</p>
                <button class='editAnno'>Edytuj</button>
                <button class='deleteAnno'>Usuń</button>
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
            <div class='addingAnno'>
                <form>
                    <label for="title" id='forTitle'>Tytuł ogłoszenia</label>
                    <input type="text" id='title' placeholder='Proszę wprowadzić tytuł ogłoszenia'>
                    <label for="date" id='forDate'>Data</label>
                    <input type="date" id="date">
                    <label for="description" id='forDescription'>Treść ogłoszenia</label>
                    <textarea id="description" cols="30" rows="10" placeholder='Proszę wprowadzić treść'></textarea>
                    <button class="public">Publikuj</button>
                    <button class='clear'>Wyczyść formularz</button>
                </form>
                <div class='infoBox hide'></div>
            </div>
            <div class='actualAnno hide'>
                <h1>Aktualnie zamieszczone ogłoszenia: </h1>
            </div>
        </div>
        `
    };
};