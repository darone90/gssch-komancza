import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GSSCH Zarządzanie stroną');
    }

    async getHtml() {
        return `
        <h2>Tutaj będzie strona powitalna</h2>
        <h2>Strona do napisania</h2>`
    }
}