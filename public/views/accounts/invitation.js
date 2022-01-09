import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Witamy');
    }

    async getHtml() {
        return `
        <p class='invitation'>Panel zarządzania kontami uprawnionymi do modyfikowania strony GSSCH w Komańczy. Z poziomu tego panelu istnieje możliwość
        dodawania nowych kont mających dostęp do zarządzania stroną, ich edytowanie oraz usuwanie, a także sprawdzanie i czysczenie logu błędów.
        Tylko użytkownicy z uprawnieniami poziomu master mają dostęp do tej strony. Zaleca się posiadanie jak najmniejszej liczby użytkowników
        z poziomem uprawniń master ( najlepiej jeden ) gdyż będą oni mogli ingerować w inne konta. W razie jakichkolwiek niejasności skontaktuj się z 
        administratorem strony.</p>`
    }
}