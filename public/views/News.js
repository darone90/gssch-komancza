
import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Aktualności');
    }
    

    dataFromDatabase(data) {
        const length = data.length
        const wrap = document.createElement('div');
        const section = document.createElement('section');
        section.classList.add('content');
        const news = document.createElement('div');
        news.classList.add('news');
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `<article class='fullsize'>
                            <h1 class='date'>5 Listopada 2020</h1>
                            <h2 class='title'>Nagroda Z P P  Dobra Firma</h2>
                            <p class='content first'>5 listopada 2020 roku odbyła się uroczysta Gala rozdania nagród Dobra Firma województwa
                            Podkarpackiego organizowana przez Związek Przedsiębiorców i Pracodawców. Impreza odbyłą się 
                            patronatem Wojewody Urzędu Marszałkowskiego oraz Prezydenta Miasta Rzeszów.
                            </p>
                            <p class='content second'>Nasza Spółdzielnia znalazła się w elitarnym gronie zwycięzców firm w ogólnopolskim rankingu oraz
                            została laureatem konkursu jako najbardziej efektywna Firma Województwa Podkarpackiego w kategorii 
                            Mała Firma</p>
                            <div class='fullSizeImg'></div>
                            </article>
    
                            <button class='next'>Następny >></button>
                            <button class='perview'><< Poprzedni</button>
    
                            <div class='close'>X</div>
                            `;
        for(let i = 1; i <= length; i++ ){
            const index = i-1;
            const article = document.createElement('div');
            let articleClass = '';
            if (i%2 !== 0) {
                articleClass = 'infoLeft';
            } else {
                articleClass = 'infoRight';
            };
            article.classList.add(articleClass);
            const { title, date, description } = data[index];
            article.innerHTML = `<div class='description'>
                                <h1 class='date'>${date}</h1>
                                <h2 class='title'>${title}</h2>
                                <h3 class='text'>${description}</h3> 
                                </div>
                                <div class='imageInfo'>
                                <img src="./public/images/DFnagroda.png" alt="Nagroda w konkursie Dobra Firma">
                                </div>
                                <button class='moreNews' data-index='1'>Czytaj więcej</button>
                                </div>`;
            news.appendChild(article);
        }
        section.appendChild(news);
        section.appendChild(popup);
        wrap.appendChild(section);
        
    
        return (wrap.innerHTML).toString();
    }
    async getHtml () {
        
        return fetch('/newsdata', {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            return (this.dataFromDatabase(data))
           
        });
    };
}
