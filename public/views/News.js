import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Aktualności');
    }

    async getHtml() {
        return `
        <section class='content'>
        <div class='news'>
            <div class='infoLeft'>
                <div class='description'>
                    <h1 class='date'>19.03.2021 Piątek</h1>
                    <h2 class='title'>Jakieś ważne Wydarzenie </h2>
                    <h3 class='text'>Opis wydarzenia: Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum eaque dolores alias voluptatum labore quas, doloribus aut a consequuntur omnis iste enim non nesciunt optio aliquid! Labore explicabo soluta consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta inventore id ,</h3> 
                </div>
                <div class='imageInfo'></div>
                <button>Czytaj więcej</button>
            </div>
            <div class='infoRight'>
                <div class='description'>
                    <h1 class='date'>19.03.2021 Piątek</h1>
                    <h2 class='title'>Wydarzenie</h2>
                    <h3 class='text'> Opis wydarzenia: Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum eaque dolores alias voluptatum labore quas, doloribus aut a consequuntur omnis iste enim non nesciunt optio aliquid! Labore explicabo soluta consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta inventore id natus nisi ipsa, temporibus magni tempore fuga qui odit amet sequi necessitatibus accusantium rerum dicta quaerat iure? </h3> 
                </div>
                <div class='imageInfo'></div>
                <button>Czytaj więcej</button>
            </div>
            <div class='infoLeft'>
                <div class='description'>
                    <h1 class='date'>19.03.2021 Piątek</h1>
                    <h2 class='title'>Jakieś ważne Wydarzenie </h2>
                    <h3 class='text'>Opis wydarzenia: Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum eaque dolores alias voluptatum labore quas, doloribus aut a consequuntur omnis iste enim non nesciunt optio aliquid! Labore explicabo soluta consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta inventore id ,</h3> 
                </div>
                <div class='imageInfo'></div>
                <button>Czytaj więcej</button>
            </div>
        </div>
    </section>
        `;
    }
}