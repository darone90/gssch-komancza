import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Zarząd');
    }

    async getHtml() {
        return `
        <section class="management">
        <div class='bosses'>
        <h1>Zarząd "GSSCH" w Komańczy</h1>
        <ul>
            <li>Prezes Zarządu <strong>Grażyna Stach</strong></li>
            <li>Zastępca Prezesa <strong>Maria Milasz</strong></li>
            <li>Członek Zarządu <strong>Irena Pilecka</strong></li>
        </ul>
        </div>
        <div class='directors'>
        <h1>Rada nadzorcza "GSSCH" w Komańczy</h1>
        <ul>
            <li>Przewodniczący <strong>Bogdan Wancewicz</strong></li>
            <li>Zastępca <strong>Jan Pilecki</strong></li>
            <li>Sekretarz <strong>Jolanta Hoksa</strong></li>
        </ul>
        <h2>Członkowie Rady Nadzorczej</h2>
        <ul>
            <li><strong>Małgorzata Wiktor</strong></li>
            <li><strong>Renata Hryćko</strong></li>
        </ul>
        </div>
    </section>
        `;
    }
}