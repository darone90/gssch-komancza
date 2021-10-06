import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Ogłoszenia');
    }

    async getHtml() {
        return `
        <h2>Tutaj będą ogłoszenia</h2>
        <h2>Strona do napisania</h2>`
    }
}