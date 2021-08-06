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
                <h1 class='date'>5 Listopada 2020</h1>
                <h2 class='title'>Nagroda Z P P  Dobra Firma</h2>
                <p class='content'>5 listopada 2020 roku odbyła się uroczysta Gala rozdania nagród Dobra Firma województwa
                Podkarpackiego organizowana przez Związek Przedsiębiorców i Pracodawców. Impreza odbyłą się 
                patronatem Wojewody Urzędu Marszałkowskiego oraz Prezydenta Miasta Rzeszów.
                </p>
                <p class='content'>Nasza Spółdzielnia znalazła się w elitarnym gronie zwycięzców firm w ogólnopolskim rankingu oraz
                została laureatem konkursu jako najbardziej efektywna Firma Województwa Podkarpackiego w kategorii 
                Mała Firma</p>
                <div class='fullSizeImg' data-id='1'>
                    <img src='./public/images/DFnagroda.png'>
                </div>
            </article>
            <article class='fullsize'>

                <h1 class='date'>Wiosna 2021</h1>
                <h2 class='title'>Fotowoltaika - na miare współczesności</h2>
                <p class='content'>Gminna Spółdzielnia przystapiła do montażu instalacji fotowoltaicznych, 
                które będą produkować prąd na potrzeby naszego obiektu handlowego gdzie znajduja się Delikatesy
                Centrum w Komańczy jak również jest to siedziba Spółdzielni.
                Jest to idealne połączenie nowoczesnej technologii, oszczędności i ekologii.
                Fotowoltaika to inwestycja korzystna na wielu płaszczyznach. Pozwala znacząco ograniczyć koszty 
                zakupu energii elektrycznej, w znacznym stopniu uniezależnić się od dostawcy energii i jego cen,
                a tym samym widocznie zmniejszyć wydatki firmy. Fotowoltaika to idealne połączenie nowoczesnej 
                technologii, oszczędności i ekologii.</p>
                <div class='fullSizeImg' data-id='2'>
                    <img src=''>
                </div>
            
            </article>
            <button class='next'>Następny >></button>
            <button class='perview'><< Poprzedni</button>
            <div class='infodots'>
                <div><div></div></div>
                <div><div></div></div>
            </div>
            <div class='close'><a href="/" data-link>X</a></div>
            <div class='imgpopup'>
                <div class='close'><a>X</a></div>
                <img src='./public/images/fullsize/Nagroda_dobra_firma.jpg'>
            </div>
        </div>
        `
    };

    

}