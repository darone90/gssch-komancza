import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Witamy');
    }

    async getHtml() {
        return `
        <h2>Strona powitalna</h2>
        <h2>Strona do napisania</h2>`
    }
}