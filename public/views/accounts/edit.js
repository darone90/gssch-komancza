import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Edytuj konta');
    }

    async getHtml() {
        return `
        <h2>Tutaj będzie możliwość edycji lub usówania konta</h2>
        <h2>Strona do napisania</h2>`
    }
}