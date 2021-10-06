import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Artykuły');
    }

    async getHtml() {
        return `
        <h2>Tutaj będzie strona zarządzania artykułami</h2>
        <h2>Strona do napisania</h2>`
    }
}