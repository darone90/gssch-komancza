import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Dodawanie użytkownika');
    }

    async getHtml() {
        return `
        <h2>Tutaj będzie dodawanie kont</h2>
        <h2>Strona do napisania</h2>`
    }
}