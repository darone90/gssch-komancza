import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Dodawanie użytkownika');
    }

    async getHtml() {
        return `
        <h2 class='titleaddform'>Formularz dodania urzytkownika</h2>
        <form>
            <label for="name">Nazwa użytkownika</label>
            <input type="text" id='name' placeholder='minimum 4 znaki'>
            <label for="password">Podaj nowe hasło</label>
            <input type="password" id="password" placeholder='minimum 6 znaków'>
            <label for="confirmpassword">Powtórz nowe hasło</label>
            <input type="password" id="confirmpassword">
            <label for="permissions">Poziom uprawnień master</label>
            <input type="checkbox" id="permissions">
            <button class ='all addUser'>Dodaj użytkownika</button>
        </form>
        <div class='infoBox'>
            <p>Aby dodać użytkownika prsoszę wypełnić formularza</p> 
        </div>`
    }
}