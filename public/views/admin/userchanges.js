import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Zmiana danych logowania');
    }
    async getHtml() {
        return `
        <h2>Tutaj będzie zmiana parametrów konta</h2>
        <h2>Strona do napisania</h2>`
    }
}