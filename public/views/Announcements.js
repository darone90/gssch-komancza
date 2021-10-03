import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Ogłoszenia');
    }
    getAnno(data) {
        const length = data.length;
        if (length === 0) {
            return (
                `<section class='anno'><h1>Aktualnie brak ogłoszeń</h1></section>`
            )
        } else {
            const wrapp = document.createElement('div');
            const section = document.createElement('section');
            section.classList.add('anno');
            const dataArr = Object.values(data);
            dataArr.forEach(anno => {
                const {title, date, description} = anno;
                const annoucement = document.createElement('div');
                annoucement.classList.add('annocontent');
                annoucement.innerHTML = `<h2>${date}</h2>
                                        <h1>${title}</h1>    
                                        <div>${description}</div>
                                        `;
                section.appendChild(annoucement);
            });
            wrapp.appendChild(section);
            return (wrapp.innerHTML).toString()
        }
    }

    getHtml() {
        return fetch('/readanno', {
            method: "GET",
        }).then(res => res.json()).then(data => { return (this.getAnno(data))});
    };
    
};
