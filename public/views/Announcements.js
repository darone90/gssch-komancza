import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Piekarnia');
    }

    async getHtml() {
        return `
        <h1>Strona w budowie</h1>
        <h2>Comming soon</h2>
        `;
    }
}