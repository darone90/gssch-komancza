import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Baza dokumentów');
    }

    loaddocumentsbase(data) {

        const docBox = document.querySelector('.documentList');

        data.forEach(el => {
            
            const {_id, original, base, created, createdBy} = el;
            const file = document.createElement('div');
            file.classList.add('doclistpart');

            file.innerHTML = `
                <h3>Nazwa :</h3>
                <h4 class='${base}'> ${original}</h4>
                <p>Doadny dnia: ${new Date(Number(created)).toISOString().slice(0,10)} przez ${createdBy}</p>
                <button class='dwldoc ${base} ${_id}'>Pobierz</button>
                <button class='deleteDocument ${_id}'>Usuń dokument</button>
            `;
            docBox.insertBefore(file, file.nextSibling || null);
        });

        if (data.length < 1) {
            const noDocuments = document.createElement('p');
            noDocuments.innerText = "aktualnie brak dodanych dokumnetów";
            docBox.appendChild(noDocuments);
        };

        const loading = document.querySelector('.loadingBox');
        loading.classList.remove('onload');
    };

    async getHtml() {

        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');

        fetch('/admin/get-documents', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => this.loaddocumentsbase(data));



        return `
        <div class='doccontainer'>
            <div class='documentList'>
                <h1>Dokumenty znajdujące się w bazie:</h1>
            </div>
            <div class='addDocument'>
                <h1>Dodawanie dokumentu do bazdy:</h1>
                <label for="fileInput">Dodaj dokument</label>
                <input name='fileInput' type="file" id="fileInput" accept=".doc, .docx, .pdf, .xls, .xlsx, .odt, .ods">
                <button class='documentadd'>Prześlij do bazy</button>
                <p>Akceptowane są formaty McrosoftOffice Word oraz Excel, OppenOfiice Writer oraz Calc a także pliki pdf</p>
            </div>
        </div>
        `
    }
}