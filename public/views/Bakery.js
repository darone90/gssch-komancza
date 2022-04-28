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
        }). then(res => res.json()).then(data => this.getAssoData(data));



        fetch('/shop/change/bakery', {
            method: 'GET',
        }). then(res => res.json()).then(data => this.getInformation(data));


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
            <div class='shopmap'><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10399.237963662685!2d22.06144804429441!3d49.336825501490445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c05221f792c09%3A0xb207fd5ce927d0a7!2s38-543%20Koma%C5%84cza!5e0!3m2!1spl!2spl!4v1628840006315!5m2!1spl!2spl" width="480" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe></div>
            <button class='link-to-map'><a href="https://www.google.com/maps?ll=49.336812,22.070203&z=14&t=m&hl=pl&gl=PL&mapclient=embed&q=Koma%C5%84cza+38-543">Lokalizacja</a></button>
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
