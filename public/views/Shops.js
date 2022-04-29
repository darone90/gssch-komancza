import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Placówki handlowe');
    }

    dataloader(data) {

        const loading = document.querySelector('div.databaseload');
        const mainInfos = [...document.querySelectorAll('.shops')];
    
        mainInfos.forEach(main => {
            const informations = data.find(text => text.title === main.classList[0]);
            const text = main.querySelector('main');
            const img = main.querySelector('.shopBanner img');
            const hours = main.querySelector('.extends .work-hours p');
            const tel = main.querySelector('.shop-tel');
            const mail = main.querySelector('.shop-mail');

            

            text.textContent = informations.text;
            img.src = `./public/images/imagesDB/${informations.foto}`;
            hours.textContent = informations.hours;
            tel.innerHTML = `<i class="fas fa-phone-square-alt"></i> ${informations.tel}`;
            mail.innerHTML = `<i class="fas fa-envelope"></i> ${informations.mail}`;

            if(informations.addres) {
                const addres = main.querySelector('.shop-addres');
                addres.innerHTML =`<i class="fa fa-home"></i> ${informations.addres}`
            };

            if(informations.secondAddres) {
                const sTel = main.querySelector('.shop-tel-second');
                const sMail = main.querySelector('.shop-mail-second');
                const sAddres = main.querySelector('.shop-addres-second');
                const sHours = main.querySelector('.second p')

                sTel.innerHTML = `<i class="fas fa-phone-square-alt"></i> ${informations.secondAddres.tel}`;
                sMail.innerHTML = `<i class="fas fa-envelope"></i> ${informations.secondAddres.mail}`;
                sAddres.innerHTML = `<i class="fa fa-home"></i> ${informations.secondAddres.addres}`;
                sHours.textContent = informations.secondAddres.hours;
            }
        })
        loading.classList.remove('progress');
    }

    async getHtml() {

        const loading = document.querySelector('div.databaseload');
        loading.classList.add('progress');

        fetch('/shop/all', {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => this.dataloader(data))

        return `
        <Section class='trading'>
        
        <div class="center ca shops twins">
            <h1> Delikatesy Centrum </h1>
            <main></main>
            <div class='btn-descript'>Informacje i godziny otwarcia:</div>
            <div class='shopBanner'>
                <img src="" alt="zdjęcie delikatesy">
            </div>
            <div class='moreBtn a'><i class="a fas fa-angle-double-up"></i></div>
            <div class='extends double'>
                <div class='addres-wrap'>
                    <div class='adreses'>
                        <p>Delikatesy Centrum Komańcza</p>
                        <a class='shop-tel'></a>
                        <a class='shop-mail'></a>
                        <a class='shop-addres'></a>
                    </div>
                    <div class='adreses'>
                        <p>Delikatesy Centrum Rzepedź</p>
                        <a class='shop-tel-second'></a>
                        <a class='shop-mail-second'></a>
                        <a class='shop-addres-second'></a>
                    </div>
                        
                </div>
                <div class='work-hours'>
                            <h3>Godziny otwarcia :</h3>
                            <p>

                            </p>
                        </div>
                <div class='work-hours second'>
                        <h3>Godziny otwarcia :</h3>
                        <p>

                        </p>
                </div>
        </div>
        </div>

        <div class="food cb shops">
            <h1> Sklep spożywczo-przemysłowe </h1>
            <main></main>
            <div class='btn-descript'>Informacje i godziny otwarcia:</div>
            <div class='shopBanner'>
                <img src="" alt="zdjęcie Sklep spożywczy">
            </div>
            <div class='moreBtn b'><i class="b fas fa-angle-double-up"></i></div>
            <div class='extends'>
                <div class='adreses'>
                    <p>Kontakt</p>
                    <a class='shop-tel'></a>
                    <a class='shop-mail'></a>
                    <a class='shop-addres'></a>
                </div>
                <div class='work-hours'>
                            <h3>Godziny otwarcia :</h3>
                            <p>

                            </p>
                        </div>
            </div>
        </div>

        <div class=" chemistry cc shops">
            <h1> Sklep przemysłowy </h1>
            <main></main>
            <div class='btn-descript'>Informacje i godziny otwarcia:</div>
            <div class='shopBanner'>
                <img src="" alt="zdjęcie Sklep spożywczy">
            </div>
            <div class='moreBtn c'><i class="c fas fa-angle-double-up"></i></div>
            <div class='extends'>
                <div class='adreses'>
                <p>Kontakt</p>
                <a class='shop-tel'></a>
                <a class='shop-mail'></a>
                <a class='shop-addres'></a>
                </div>
                <div class='work-hours'>
                            <h3>Godziny otwarcia :</h3>
                            <p>

                            </p>
                        </div>
            </div>
        </div>
        <div class=" build cd shops">
            <h1> Sklep budowlany </h1>
            <main></main>
            <div class='btn-descript'>Informacje i godziny otwarcia:</div>
            <div class='shopBanner'>
                <img src="" alt="zdjęcie Sklep spożywczy">
            </div>
            <div class='moreBtn d'><i class="d fas fa-angle-double-up"></i></div>

            <div class='extends'>
                <div class='adreses'>
                    <p>Kontakt</p>
                    <a class='shop-tel'></a>
                    <a class='shop-mail'></a>
                    <a class='shop-addres'></a>
                </div>
                <div class='work-hours'>
                            <h3>Godziny otwarcia :</h3>
                            <p>

                            </p>
                        </div>
            </div>
        </div>
        </div>

        <div class="moving ce shops">
            <h1> Handel obwoźny</h1>
            <main></main>
            <div class='btn-descript'>Informacje:</div>
            <div class='shopBanner'>
                <img src="" alt="zdjęcie Sklep spożywczy">
            </div>
            <div class='moreBtn f'><i class="f fas fa-angle-double-up"></i></div>
            <div class='extends'>
                <div class='adreses'>
                <p>Kontakt</p>
                <a class='shop-tel'></a>
                <a class='shop-mail'></a>
                <div class='work-hours'>
                            <h3>Kiedy i gdzie pracujemy:</h3>
                            <p>

                            </p>
                        </div>
            </div>
        </div>
        
    </Section>
        `;
    }
}