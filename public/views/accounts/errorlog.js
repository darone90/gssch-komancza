import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Raporty błędów');
    }

    errorLoad(data) {
        data.reverse();
        const loadingBox = document.querySelector('.loading');
        const errorBox = document.querySelector('.errorBox');
        if(data.length < 1) {
            const h2 = document.createElement('h2');
            h2.innerText = 'Brak raportów o błędach';
            errorBox.appendChild(h2);
        } else {
            data.forEach(err => {
                const errorSingle = document.createElement('div');
                errorSingle.classList.add('error');
                const {error, date, info} = err;


                errorSingle.innerHTML = `
                    <h3>Typ błędu: ${info}</h3>
                    <p>Błąd zarejestrowany dnia: ${new Date(date)}</p>
                    <h3>Opis błędu:</h3>
                    <p>${error === undefined || null ? "Brak informacji": error}</p>
                `;

                errorBox.appendChild(errorSingle);
                
            })
        }
        loadingBox.classList.add('hide');
    }

    async getHtml() {
        const loadingBox = document.querySelector('.loading');
        loadingBox.classList.remove('hide');
        fetch('/accounts/errorlog/all', {
            method: 'GET',
        })
            .then(res=> res.json())
            .then(data=> this.errorLoad(data));

        return `
        <div class='errorCatalog'>
            <h2>W bazie znajdują się następujące błędy systemu:</h2>
            <div class='errorBox'></div>
            <button class='all clearErrorLog'>Wyczyść log błędów</button>
        </div>`
    }
}