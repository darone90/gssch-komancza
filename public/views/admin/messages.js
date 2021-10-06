import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Odebrane wiadomości');
    }

    async getHtml() {
        return `
        <h2>Tutaj będą wiado mości</h2>
        <h2>Strona do napisania</h2>`
    }
}