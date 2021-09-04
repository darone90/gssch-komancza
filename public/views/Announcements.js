import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Piekarnia');
    }

    async getHtml() {
        return `
        <section class='anno'>
        <h1>Aktualnie brak ogłoszeń</h1>
        </section>
        `;
    }
    
}