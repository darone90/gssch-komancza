import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Piekarnia');
    }

    async getHtml() {
        return `
        <div class="shops">
        <h1> Piekarnia i ciastkarnia</h1>
        <main> Piekarnia i cistkarnia Gminnej Spółdzielni "SCH" w Komańczy posiada wyremontowany zakład, spełniający wszystkie wymogi Unii Europejskiej w zakresie produkcji spożywczej. W wypiekane u nas znakomitej jakości pieczywo oraz wyroby ciastkarskie zaopatruje się wiele sklepów. W swoim asortymencie posiadamy:
            <ul>
                <li>Chleby tradycyjne</li>
                <li>Chleby z dodatkami</li>
                <li>Chleby okolicznościowe</li>
                <li>Pieczywo drobne</li>
            </ul>
        <h2>Asortyment jest dostępny w formie krojonej i pakowanej</h1>
        <h3>Starając się zaspokoić Państwa oczekiwania do produkcji naszego pieczywa oraz wyrobów cistkarskich wykorzystujemy tylko składniki o najwyższej jakości. Zapraszamy do współpracy!</h2>
        
    </main>
        <div class='shopBanner'></div>
        <div class='moreBtn'><i class="fas fa-angle-double-up"></i></div>
        <div class='extends'>
            <div class='adreses'></div>
            <div class='map'></div>
        </div>
    </div>
        `;
    }
}