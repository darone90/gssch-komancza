import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GSSCH Zarządzanie stroną');
    }

    async getHtml() {
        return `
        <h2 class='welcom'>Witamy w panelu administratorskim strony internetowej GSSCH w Komańczy</h2>
        <p>Panel umożliwia zarządzanie treścią strony oraz użytkownikami do tego uprawnionymi</p>
        <p>Aby zarządzać treścią strony skorzystaj z menu po lewej stronie. Aby zmienić swoje dane do logowania 
        należy skożystać z przycisku "Zmiana danych konta". Przycisk wylogowujący powodujący opuszczenie 
        panelu administratorskiego znajduje się w lewym dolnym rogu ekranu. Dodawanie użytkowników uprawnionych 
        do zarządzania tręścia strony odbywa się w poprzez stronę zarządzania użytkownikami ( ptzycisk "Zarządzanie użytkownikami"
        "). Skorzystanie z tego przycisku wymaga uprawnień wyższego stopnia (Master)</p>
        `
    }
}