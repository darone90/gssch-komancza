import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Kontakt');
    }

    async getHtml() {
        return `
        <section class='contact'>
        <button class='waytoForm'>Formularz kontaktowy</button>
        <div class='map'><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2599.689351196921!2d22.07216831602324!3d49.33909987933748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c051bb28d0e11%3A0xb2c3058342e99c30!2sKoma%C5%84cza%2086%2C%2038-543%20Koma%C5%84cza!5e0!3m2!1spl!2spl!4v1616589143263!5m2!1spl!2spl" allowfullscreen="" loading="lazy"></iframe></div>
        <div class='waysTo'>
            <ul>
                <li>Sekretariat</li>
                <li><a><i class="fas fa-phone-square-alt"></i> Telefon 13 46 77 002</a></li>
                <li><a><i class="fas fa-envelope"></i> Email: sekretariatgs@gmail.com</a></li>
                <li>Księgowość</li>
                <li><a><i class="fas fa-phone-square-alt"></i> Telefon 13 46 77 321</a></li>
                <li><a><i class="fas fa-envelope"></i> Email: ksiegowoscgs@gmail.com</a></li>
                <li>Kadry</li>
                <li><a><i class="fas fa-phone-square-alt"></i> Telefon 13 46 77 320</a></li>
            </ul>
        </div>
    <form method="POST" class='contactForm' action='/sendmessage'>
        <h2>Formularza kontaktowy</h2>
        <label for="name" class='name'>Imię</label>
        <input type="text" id='name' name='name' placeholder="Wprowadź swoje imię" maxlength="30" required>
        <label for="subject" class='subject'>Temat wiadomości</label>
        <Input type="text" id="subject" name='subject' placeholder="W jakiej sprawie?">
        <label for="content" class='content'>Treść wiadomości</label>
        <textarea name="content" id="content" cols="30" rows="10" required></textarea>
        <label for="contact" class='contact'>Telefon lub email</label>
        <input type="text" id="contact" name='contact' placeholder="Jak możemy się z tobą skontaktować?">
        <input type="submit" value="Wyślij" class="send">
    </form>
        <div class='formInfo'>
            <button class='clearForm'>Wyczyść formularz</button>
            <h1 class='postInformation'>Prosimy wypełnić formularz kontaktowy</h1>
        </div>
    </section>
        `;
    }
}