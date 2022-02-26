import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Placówki handlowe');
    }

    async getHtml() {
        return `
        <Section class='trading'>
        
        <div class="ca shops">
            <h1> Delikatesy Centrum </h1>
            <main> Zakładka w budowie</main>
            <div class='btn-descript'>Kontakt</div>
            <div class='shopBanner'></div>
            <div class='moreBtn a'><i class="a fas fa-angle-double-up"></i></div>
            <div class='extends double'>
                <div class='adreses'>
                <p>Delikatesy Centrum Komańcza</p>
                <a><i class="fas fa-phone-square-alt"></i> Telefon: 13 46 77 008</a>
                <a><i class="fas fa-envelope"></i> E-mail: dckomancza@poczta.onet.pl</a>
                </div>
                <div class='shopmap'><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2599.6462362214456!2d22.072057215850297!3d49.339916074634445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c05d0dd0fde93%3A0x9f6e0755ef4586a2!2sDelikatesy%20Centrum!5e0!3m2!1spl!2spl!4v1628844214619!5m2!1spl!2spl" width="320" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe></div>
                <button class='link-to-map'><a href="https://www.google.com/maps?ll=49.339455,22.073628&z=15&t=m&hl=pl&gl=PL&mapclient=embed&cid=11488127765136639650">Lokalizacja</a></button>
                <div class='adreses'>
                <p>Delikatesy Centrum Rzepedź</p>
                <a><i class="fas fa-phone-square-alt"></i> Telefon: 13 46 77 047</a>
                <a><i class="fas fa-envelope"></i> E-mail: dcrzepedz@poczta.onet.pl</a>
                </div>
                <button class='link-to-map'><a href="https://www.google.com/maps?ll=49.363423,22.109619&z=15&t=m&hl=pl&gl=PL&mapclient=embed&cid=5592104541910277520">Lokalizacja</a></button>
                <div class='shopmap'><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2598.4041097334302!2d22.107430515850854!3d49.363426072966895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473c05cdf1409017%3A0x4d9b2573df691d90!2sDelikatesy%20Centrum%20Rzeped%C5%BA%20Osiedle%20C%202!5e0!3m2!1spl!2spl!4v1628844352944!5m2!1spl!2spl" width="320" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe></div>
            </div>
        </div>
        <div class="cb shops">
            <h1> Sklep spożywczo-przemysłowe </h1>
            <main>Zakładka w budowie</main>
            <div class='btn-descript'>Kontakt</div>
            <div class='shopBanner'></div>
            <div class='moreBtn b'><i class="b fas fa-angle-double-up"></i></div>
            <div class='extends'>
                <div class='adreses'>
                <p>Kontakt</p>
                <a><i class="fas fa-phone-square-alt"></i> Telefon: 13 46 77 513</a></div>
                <button class='link-to-map'><a href="">Lokalizacja</a></button>
                <div class='shopmap'></div>
            </div>
        </div>
        <div class="cc shops">
            <h1> Sklep przemysłowy </h1>
            <main>Zakładka w budowie</main>
            <div class='btn-descript'>Kontakt</div>
            <div class='shopBanner'></div>
            <div class='moreBtn c'><i class="c fas fa-angle-double-up"></i></div>
            <div class='extends'>
                <div class='adreses'>
                <p>Kontakt</p>
                <a><i class="fas fa-phone-square-alt"></i> Telefon: 13 46 78 019</a>
                <a><i class="fas fa-envelope"></i> E-mail: dorota_sklep6@wp.pl</a>
                </div>
                <button class='link-to-map'><a href="">Lokalizacja</a></button>
                <div class='shopmap'></div>
            </div>
        </div>
        <div class="cd shops">
            <h1> Sklep budowlany </h1>
            <main>Zakładka w budowie</main>
            <div class='btn-descript'>Kontakt</div>
            <div class='shopBanner'></div>
            <div class='moreBtn d'><i class="d fas fa-angle-double-up"></i></div>
            <div class='extends'>
                <div class='adreses'>
                <p>Kontakt</p>
                <a><i class="fas fa-phone-square-alt"></i> Telefon: 13 46 78 507</a>
                <a><i class="fas fa-envelope"></i> E-mail: sklep.nr2.komancza@gmail.com</a></div>
                <button class='link-to-map'><a href="">Lokalizacja</a></button>
                <div class='shopmap'></div>
            </div>
        </div>
        <div class=" ce shops">
            <h1> Handel obwoźny</h1>
            <main>Zakładka w budowie</main>
            <div class='shopBanner'></div>
        </div>
        
    </Section>
        `;
    }
}