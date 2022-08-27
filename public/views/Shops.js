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
            const forsmall = document.createElement('div');
            forsmall.classList.add('for-small');
            const informations = data.find(text => text.title === main.classList[0]);
            const text = main.querySelector('main');
            const img = main.querySelector('.shopBanner img');
            const hours = main.querySelector('.extends .work-hours p');
            const tel = main.querySelector('.shop-tel');
            const mail = main.querySelector('.shop-mail');

            

            text.textContent = informations.text;
            img.src = `./public/images/imagesDB/${informations.foto}`;
            hours.textContent = informations.hours;
            tel.innerHTML = `<i class="fas fa-phone-square-alt"></i>Telefon:  ${informations.tel}`;
            mail.innerHTML = `<i class="fas fa-envelope"></i>Mail: ${informations.mail}`;

            if(informations.addres) {
                const addres = main.querySelector('.shop-addres');
                addres.innerHTML =`<i class="fas fa-home"></i>Adres: ${informations.addres}`;
            };
            text.appendChild(forsmall)


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
            .catch(err => {
                document.querySelector('.errorinfo').classList.remove('hide');
            })

        return `
        <Section class='trading'>
        
        <div class = "center ca shops">
            <h1> Delikatesy Centrum Komańcza</h1>
            <main>

            </main>
            <div class='btn-descript'>Informacje i godziny otwarcia:</div>
            <div class='shopBanner'>
                <img src="" alt="zdjęcie delikatesy">
            </div>
            <div class='moreBtn a'><i class="a fas fa-angle-double-up"></i></div>
            <div class='extends'>
                
                    <div class='adreses'>
                        <p>Delikatesy Centrum Komańcza</p>
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

        <div class = "center2 ca2 shops">
            <h1> Delikatesy Centrum Rzepedź</h1>
            <main>

            </main>
            <div class='btn-descript'>Informacje i godziny otwarcia:</div>
            <div class='shopBanner'>
                <img src="" alt="zdjęcie delikatesy">
            </div>
            <div class='moreBtn a2'><i class="a2 fas fa-angle-double-up"></i></div>
            <div class='extends'>
                
                    <div class='adreses'>
                        <p>Delikatesy Centrum Rzepedź</p>
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

        <div class="food cb shops">
            <h1> Sklep spożywczy Komańcza</h1>
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

        <div class="food2 cb2 shops">
            <h1> Sklep spożywczy Szczawne</h1>
            <main></main>
            <div class='btn-descript'>Informacje i godziny otwarcia:</div>
            <div class='shopBanner'>
                <img src="" alt="zdjęcie Sklep spożywczy">
            </div>
            <div class='moreBtn b2'><i class="b2 fas fa-angle-double-up"></i></div>
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