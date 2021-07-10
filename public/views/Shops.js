import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Placówki handlowe');
    }

    async getHtml() {
        return `
        <Section class='trading'>
        
        <div class="shops">
            <h1> Delikatesy Centrum </h1>
            <div class='shopLogo'></div>
            <main></main>
            <div class='shopBanner'></div>
            <div class='moreBtn'><i class="fas fa-angle-double-up"></i></div>
            <div class='extends'>
                <div class='adreses'></div>
                <div class='map'></div>
                <div class='adreses'></div>
                <div class='map'></div>
            </div>
        </div>
        <div class="shops">
            <h1> Sklepy spożywczo-przemysłowe </h1>
            <main></main>
            <div class='shopBanner'></div>
            <div class='moreBtn'><i class="fas fa-angle-double-up"></i></div>
            <div class='extends'>
                <div class='adreses'></div>
                <div class='map'></div>
                <div class='adreses'></div>
                <div class='map'></div>
            </div>
        </div>
        <div class="shops">
            <h1> Sklep przemysłowy </h1>
            <main></main>
            <div class='shopBanner'></div>
            <div class='moreBtn'><i class="fas fa-angle-double-up"></i></div>
            <div class='extends'>
                <div class='adreses'></div>
                <div class='map'></div>
            </div>
        </div>
        <div class="shops">
            <h1> Sklep budowlany </h1>
            <main></main>
            <div class='shopBanner'></div>
            <div class='moreBtn'><i class="fas fa-angle-double-up"></i></div>
            <div class='extends'>
                <div class='adreses'></div>
                <div class='map'></div>
            </div>
        </div>
        <div class="shops">
            <h1> Handel obwoźny</h1>
            <main></main>
            <div class='shopBanner'></div>
        </div>
        
    </Section>
        `;
    }
}