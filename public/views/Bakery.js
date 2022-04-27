import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Piekarnia');
    }

    getAssoData(data) {
        const app = document.querySelector('#app');
        const length = data.length;

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
    }

    async getHtml() {
        fetch('/assortmentdata', {
            method: 'GET',
        }). then(res => res.json()).then(data => this.getAssoData(data))
        return `
        <div class="shops cf">
        <button class='toassortment'>Nasz asortyment</button>
        <h1> Piekarnia i ciastkarnia</h1>
    <main> Piekarnia i cistkarnia Gminnej Spółdzielni "SCH" w Komańczy posiada wyremontowany zakład, spełniający wszystkie wymogi Unii Europejskiej w zakresie produkcji spożywczej. W wypiekane u nas znakomitej jakości pieczywo oraz wyroby ciastkarskie zaopatruje się wiele sklepów. W swoim asortymencie posiadamy:
            <ul>
                <li>Chleby tradycyjne</li>
                <li>Chleby z dodatkami</li>
                <li>Chleby okolicznościowe</li>
                <li>Pieczywo drobne</li>
            </ul>
        Asortyment jest dostępny w formie krojonej i pakowanej<br/>
        Starając się zaspokoić Państwa oczekiwania do produkcji naszego pieczywa oraz wyrobów cistkarskich wykorzystujemy tylko składniki o najwyższej jakości. Zapraszamy do współpracy!
        
    </main>
    <div class='btn-descript'>Informacje i godziny otwarcia</div>
        <div class='shopBanner bakery'>
            <img src="./public/images/fullsize/bagiet.jpg" alt="zdjęcie piekarnia">
        </div>
        <div class='moreBtn e'><i class="e fas fa-angle-double-up"></i></div>
        <div class='extends'>
            <div class='adreses'>
            <p>Kontakt: </p>
            <a><i class="fas fa-phone-square-alt"></i> Telefon: 13 46 77 022</a>
            <a><i class="fas fa-envelope"></i> E-mail: m.milasz.gs@wp.pl</a>
            <a><i class="fa fa-home"></i>Komancza 32 38-543</a>
            </div>
            <div class='shopmap'><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10399.237963662685!2d22.06144804429441!3d49.336825501490445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c05221f792c09%3A0xb207fd5ce927d0a7!2s38-543%20Koma%C5%84cza!5e0!3m2!1spl!2spl!4v1628840006315!5m2!1spl!2spl" width="480" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe></div>
            <button class='link-to-map'><a href="https://www.google.com/maps?ll=49.336812,22.070203&z=14&t=m&hl=pl&gl=PL&mapclient=embed&q=Koma%C5%84cza+38-543">Lokalizacja</a></button>
        </div>
        <div class='work-hours'>
            <h3>Godziny otwarcia :</h3>
            <p>
                poniedziałek - sobota: 7 -23
                niedziela - 7 -12

            </p>
        </div>
    </div>
        <div class='wall'><h1>Nasz asortyment</h1></div>`

    }
};
