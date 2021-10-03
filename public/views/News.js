
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
        const article = document.createElement('article');
        article.classList.add('fullsize');
        article.innerHTML = `
                            <h1 class='date'></h1>
                            <h2 class='title'></h2>
                            <div class='fullSizeImg'></div>`;
                            
        popup.innerHTML =   `<button class='next'>Następny >></button>
                            <button class='perview'><< Poprzedni</button>
                            <div class='close'>X</div>`;
        
        popup.appendChild(article);
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
            const { title, date, description, foto} = data[index];
            const {p1} = description;
            article.innerHTML = `<div class='description'>
                                <h1 class='date'>${date}</h1>
                                <h2 class='title'>${title}</h2>
                                <h3 class='text'>${p1}</h3> 
                                </div>
                                <div class='imageInfo'>
                                <img src="data:image/jpg;base64,${foto}" alt="Nagroda w konkursie Dobra Firma">
                                </div>
                                <button class='moreNews ${index}'>Czytaj więcej</button>
                                </div>`;
            news.appendChild(article);
        }
        section.appendChild(news);
        section.appendChild(popup);
        wrap.appendChild(section);
        
        return (wrap.innerHTML).toString();
    }
    getHtml () {
        
        return fetch('/newsdata', {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            return (this.dataFromDatabase(data))
           
        });
    };
}
