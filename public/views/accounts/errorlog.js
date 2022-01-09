import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Raporty błędów');
    }

    errorLoad(data) {
        const errorBox = document.querySelector('.errorBox');
        if(data.length < 1) {
            const h2 = document.createElement('h2');
            h2.innerText = 'Brak raportów o błędach';
            errorBox.appendChild(h2);
        } else {
            data.forEach(err => {
                const error = document.createElement('div');
                error.classList.add('error');

                error.innerHTML = `
                    
                `;
            })
        }
    }

    async getHtml() {



        return `
        <div class='errorCatalog'>
            <h2>W bazie znajdują się następujące błędy systemu:</h2>
            <div class='errorBox'></div>
        </div>`
    }
}