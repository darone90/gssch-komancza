import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Aktualności');
    }

    async getHtml() {
        return `
        <div class='popup'>
            <article class='fullsize'>
                <h1 class='date'></h1>
                <h2 class='title'></h2>
                <p class='content></p>
                <div class='fullSizeImg'>
                    <img src=''>
                </div>
            </article>
                <h1 class='date'></h1>
                <h2 class='title'></h2>
                <p class='content></p>
                <div class='fullSizeImg'>
                    <img src=''>
                </div>
            <article class='fullsize'>
            
            </article>
            <button class='next'>Następny >></button>
            <button class='perview'><< Poprzedni</button>
            <div class='infodots'>
                <div></div>
                <div></div>
            </div>
            <div class='close'><a href="/" data-link>X</a></div>
        </div>
        `;
    }
}