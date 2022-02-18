import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Zmiana danych logowania');
    }
    async getHtml() {
        return `
        <div class='userdatachange'>
            <div class='userPasswordInfoBox'>
                <p>Hasło musi składać się conajmniej z 6 znaków</p>
            </div>
            <form>
                <label for="oldPassword">Wprowadź aktualne hasło</label>
                <input type="password" id='oldPassword'>
                <label for="newPassword">Nowe Hasło</label>
                <input type="password" id="newPassword">
                <label for="newPasswordAgain">Powtórz nowe hasło</label>
                <input type="password" id="newPasswordAgain">
                <button class="changePassword">Zmień hasło</button>
            </form>
        </div>`
    }
}