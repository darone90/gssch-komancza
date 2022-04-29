import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Piekarnia');
    }

    getInformation(data) {

        const loading = document.querySelector('div.databaseload');
        const mainInfo = document.querySelector('.cf main');
        const hours = document.querySelector('.work-hours p');
        const img = document.querySelector('.shopBanner img');
        const tel = document.querySelector('.bakery-tel');
        const mail = document.querySelector('.bakery-mail');
        const addres = document.querySelector('.bakery-addres');

        mainInfo.innerText = data.text;
        hours.innerText = data.hours;
        img.src = `../public/images/imagesDB/${data.foto}`;
        tel.innerHTML = `<i class="fas fa-phone-square-alt"></i> ${data.tel}`;
        mail.innerHTML = `<i class="fas fa-envelope"></i> ${data.mail}`;
        addres.innerHTML = `<i class="fa fa-home"></i> ${data.addres}`;

        loading.classList.remove('progress');
    }

    getAssoData(data) {
        const app = document.querySelector('#app');
        const length = data.length;
        const loading = document.querySelector('div.databaseload');

        if(length > 0) {
            const btn = document.querySelector('.toassortment');
            const wall =  document.querySelector('.wall');
            btn.classList.add('active');
            wall.classList.add('active');
        };

        const dataArr = Object.values(data);

        dataArr.forEach(asso => {
            const article = document.createElement('div');
            article.classList.add('assortment');
            const {title, description, foto} = asso;
            console.log(foto);

            article.innerHTML = `
                                    <h1>${title}</h1>
                                    <article>${description}</article>
                                    <div class='assortmentFoto ${foto ? '' : 'nofoto'}'>
                                    <img src="./public/images/imagesDB/${foto}">
                                    </div>
                                    `;
            app.appendChild(article);
        })
        loading.classList.remove('progress');
    }

    async getHtml() {

        const loading = document.querySelector('div.databaseload');
        loading.classList.add('progress');

        fetch('/assortmentdata', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => this.getAssoData(data))
        .catch(err => {
            document.querySelector('.errorinfo').classList.remove('hide');
        })



        fetch('/shop/change/bakery', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => this.getInformation(data))
        .catch(err => {
            document.querySelector('.errorinfo').classList.remove('hide');
        })


        return `
        <div class="shops cf">
        <button class='toassortment'>Nasz asortyment</button>
        <h1> Piekarnia i ciastkarnia</h1>
    <main>
        
    </main>
    <div class='btn-descript'>Informacje i godziny otwarcia</div>
        <div class='shopBanner bakery'>
            <img src="" alt="zdjęcie piekarnia">
        </div>
        <div class='moreBtn e'><i class="e fas fa-angle-double-up"></i></div>
        <div class='extends'>
            <div class='adreses'>
            <p>Kontakt: </p>
            <a class='bakery-tel'></a>
            <a class='bakery-mail'></a>
            <a class='bakery-addres'></a>
            </div>
        <div class='work-hours'>
            <h3>Godziny otwarcia :</h3>
            <p>

            </p>
        </div>
    </div>
        <div class='wall'><h1>Nasz asortyment</h1></div>`

    }
};
