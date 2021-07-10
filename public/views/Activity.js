import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Działalność');
    }

    async getHtml() {
        return `
        <section class="activityWindow">
    <div class='activity'>
        <main class='first'>Gminna Spółdzielnia "Samopomoc Chłopska" w Komańczy udziela wsparcia zarówno finansowego jak i materialnego wielu instytucją oraz orgazacją biorąc czynny udział w życiu lokalnej społeczności. Wspieramy między innymi:
        </main>
        <ul class='aList'>
            <li>Szkoły i przedszkola</li>
            <li>Jednostki Ochotniczej Straży pożarnej</li>
            <li>Koła gospodyń wiejskich</li>
            <li>Kluby sportowe</li>
        </ul>
        <main class='last'>Dbając o swoich pracowników spółdzielnia organizauje coroczne imprezy w postaci wyjazdów zarówno krajowych jak i zagranicznych. </main>
    </div>
    </section>
        `;
    }
}