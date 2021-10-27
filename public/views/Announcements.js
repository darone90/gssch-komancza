import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Ogłoszenia');
    }
    getAnno(data) {
        const loading = document.querySelector('div.databaseload');
        const section = document.querySelector('.anno');
        const length = data.length;
        
        if (length === 0) {

             section.innerHTML = `<h1>Aktualnie brak ogłoszeń</h1>`
            
        } else {

            const dataArr = Object.values(data);
            dataArr.forEach(anno => {
                const {title, date, description} = anno;
                const annoucement = document.createElement('div');
                annoucement.classList.add('annocontent');
                annoucement.innerHTML = `<h2>${date}</h2>
                                        <h1>${title}</h1>    
                                        <div>${description}</div>
                                        `;
                section.prepend(annoucement);
            });
            
        }
        loading.classList.remove('progress');
    }

    getHtml() {
        const loading = document.querySelector('div.databaseload');
        loading.classList.add('progress');

        fetch('/readanno', {
            method: "GET",
        }).then(res => res.json()).then(data => this.getAnno(data));

        return `<section class='anno'></section>`
    };
    
};
