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
                    <h1 class='date'>5 Listopada 2020</h1>
                    <h2 class='title'>Nagroda ZPP  DOBRA FIRMA</h2>
                    <h3 class='text'>5 listopada 2020 roku odbyła się uroczysta Gala rozdania nagród Dobra Firma województwa
                     Podkarpackiego organizowana przez Związek Przedsiębiorców i Pracodawców. Impreza odbyłą się 
                     patronatem Wojewody Urzędu Marszałkowskiego oraz Prezydenta Miasta Rzeszów.
                     Nasza Spółdzielnia znalazła się w elitarnym gronie zwycięzców firm w ogólnopolskim rankingu oraz
                     została laureatem konkursu jako najbardziej efektywna Firma Województwa Podkarpackiego w kategorii 
                     Mała Firma</h3> 
                </div>
                <div class='imageInfo'>
                <img src="./public/images/DFnagroda.png" alt="Nagroda w konkursie Dobra Firma">
                </div>
                <button>Czytaj więcej</button>
            </div>
            <div class='infoRight'>
                <div class='description'>
                    <h1 class='date'>Wiosna 2021</h1>
                    <h2 class='title'>Fotowoltaika - na miare współczesności</h2>
                    <h3 class='text'>Gminna Spółdzielnia przystapiła do montażu instalacji fotowoltaicznych, 
                    które będą produkować prąd na potrzeby naszego obiektu handlowego gdzie znajduja się Delikatesy
                    Centrum w Komańczy jak również jest to siedziba Spółdzielni.
                    Jest to idealne połączenie nowoczesnej technologii, oszczędności i ekologii.
                    Fotowoltaika to inwestycja korzystna na wielu płaszczyznach. Pozwala znacząco ograniczyć koszty 
                    zakupu energii elektrycznej, w znacznym stopniu uniezależnić się od dostawcy energii i jego cen,
                    a tym samym widocznie zmniejszyć wydatki firmy. Fotowoltaika to idealne połączenie nowoczesnej 
                    technologii, oszczędności i ekologii.</h3> 
                </div>
                <div class='imageInfo'>
                <img src="./public/images/fotowoltaika.png" alt="instalacja fotowoltaiczna">
                </div>
                <button>Czytaj więcej</button>
            </div>
        </div>
    </section>
        `;
    }
}