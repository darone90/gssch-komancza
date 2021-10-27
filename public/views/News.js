
import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Aktualności');
    }
    

    dataFromDatabase(data) {
        const loading = document.querySelector('div.databaseload');
        const length = data.length

        if(length < 1) {
            const newsElement = document.querySelector('.news');
            const information = document.createElement('h1');
            information.classList.add('noArticles');
            information.innerText = 'Aktualnie brak wiadomości';
            newsElement.appendChild(information);
        };

        const dataArr = Object.values(data);
        let flag = true;


        dataArr.forEach( news => {
            const newsElement = document.querySelector('.news');
            const article = document.createElement('div');

            if (flag === true) {
                article.classList.add('infoLeft');
                flag = false;
            } else {
                article.classList.add('infoRight');
                flag = true;
            };

            const { title, date, description, foto, _id} = news;
            const {0:par} = description;

            article.innerHTML = `<div class='description'>
                                <h1 class='date'>${date}</h1>
                                <h2 class='title'>${title}</h2>
                                <h3 class='text'>${par}</h3> 
                                </div>
                                <div class='imageInfo'>
                                <img src="./public/images/imagesDB/${foto}">
                                </div>
                                <button class='moreNews ${_id}'>Czytaj więcej</button>
                                </div>`;
            index --;
            newsElement.prepend(article);
            loading.classList.remove('progress');
        });
    };
    async getHtml () {
        const loading = document.querySelector('div.databaseload');
        loading.classList.add('progress');
        fetch('/newsdata', {
            method: 'GET',
        }).then(res => res.json()).then(data => {
            this.dataFromDatabase(data)
        });

        return `
            <section class='content'>
                <div class='news'></div>
                <div class='popup'>
                    <button class='next'>Następny</button>
                    <button class='perview'>Poprzedni</button>
                    <div class='close'>X</div>
                    <article class='fullsize'>
                        <h1 class='date'></h1>
                        <h2 class='title'></h2>
                        <div class='fullsizeImg'><img class='popupimg' src=""></div>
                    </article>
                </div>
            </section>
        `
    };
}
