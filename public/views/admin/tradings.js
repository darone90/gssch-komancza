import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Placówki handlowe');
    }

    async getHtml() {
        return `
        <button class='blue delikatesy'>Delikatesy centrum</button>
        <button class='blue sklep'>Sklep spożywczy</button>
        <button class='blue przemyslowy'>Sklep przemysłowy</button>
        <button class='blue budowlany'>Sklep budowlany</button>
        <button class='blue obwozny'>Handel obwoźny</button>

        <div class='editing-informations hide'>
        <h1></h1>
        <div class='saving-info hide'>Zmiany zostały zapiasne poprawnie!</div>
        <div class='editing-informations__wrap'>
            <h2>Opis: </h2>
            <textarea class='bakery-information-input'></textarea>
            <div class='editing-informations__fotowrap'>
                <h3>Zdjęcie: </h3>
                <img src='' alt='zdjęcie piekarnia'>
                <label>Zmień zdjęcie:
                <input type="file" id="bakery-information-foto" accept=".jpg,.png">
                </label>
            </div>
        </div>
        <h2>Godziny otwarcia: </h2>
        <textarea class='bakery-informations-hours'></textarea>
        <label>
            Telefon:
            <input type='text' id='bakery-inform-tel'>
        </label>
        <label>
            Email:
            <input type='text' id='bakery-inform-mail'>
        </label>
        <label>
            Adres:
            <input type='text' id='bakery-inform-addres'>
        </label>
        
        <button class='shops-info-edit blue'>Zapisz zmiany</button> 
    </div>
        `
    };
};