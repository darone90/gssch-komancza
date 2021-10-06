import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Piekarnia Asortyment');
    }

    async getHtml() {
        return `
        <h2>Tutaj będzie zatrządzanie asortymentem piekarni</h2>
        <h2>Strona do napisania</h2>`
    }
}