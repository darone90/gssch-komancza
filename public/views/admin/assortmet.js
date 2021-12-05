import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Piekarnia Asortyment');
    }

    assortmentLoad(data) {

        const assortmentBox = document.querySelector('.actualProducts');

        if(data.length > 0) {

            for(let i = 0; i < data.length; i++){

                const product = document.createElement('div')
                product.classList.add('productShort');
                const {title, description, foto, _id} = data[i];
                const hide = foto === null || foto === '' ? 'hide' : '';

                product.innerHTML = `
                    <h1>${title}</h1>
                    <p>${description}</p>
                    <img class='${hide}' src='../public/images/imagesDB/${foto}'>
                    <button class='editProduct ${_id}' id='${_id}'>Edytuj</button>
                    <button class='removeProduct ${_id}' id='${_id}'>Usuń</button>
                `;

                assortmentBox.appendChild(product);
            };
        } else {

            const noProducts = document.createElement('div');
            noProducts.classList.add('noAnno');

            noProducts.innerHTML = `
                <h1>Aktualnie brak produktów na stronie</h1>
            `;

            assortmentBox.appendChild(noProducts);

        };
        const loading = document.querySelector('.loadingBox');
        loading.classList.remove('onload');
    };

    async getHtml() {

        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');

        fetch('/admin/get-assortment', {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => this.assortmentLoad(data));

        return `
        <button class='addProduct active'>Dodaj produkt</button>
        <button class='showProducts'>Opublikowane produkty</button>
        <div class='addingArticle'>
            <form>
                <label for="prodName" id='prodNameLab'>Nazwa produktu</label>
                <input type="text" id='prodName' placeholder='Nazwa produkt'>
                <label for="prodDescription" id='prodDescriptionLab'>Opis produktu</label>
                <textarea name="prodDescription" id="prodDescription" cols="30" rows="10"></textarea>
                <label for="fileInput">Dodaj zdjęcie</label>
                <input name='fileInput' type="file" id="fileInput" accept=".jpg,.png">
                <button class='sendProduct'>Dodaj produkt</button>
            </form>
                <button class='clearArtAsso'>Wyczyść formularz</button>
                <div class='infoBoxArticle hide'></div>
            </div>
            <div class='actualProducts hide'>
                <h1>Produkty znajdujące się na stronie:</h1>
            </div>

            <div class='editArticle hide'>
            <form>
                <label for="prodNameEdit" id='prodNameLab'>Nazwa produktu</label>
                <input type="text" id='prodNameEdit' placeholder='Nazwa produkt'>
                <label for="prodDescriptionEdit" id='prodDescriptionLab'>Opis produktu</label>
                <textarea name="prodDescription" id="prodDescriptionEdit" cols="30" rows="10"></textarea>
                <label for="fileInput">Dodaj zdjęcie</label>
                <input name='fileInput' type="file" id="fileInput" accept=".jpg,.png">
                <button class='editSendProduct'>Zapisz zmiany</button>
            </form>
                <button class='closeEditProduct'>Zamknij edytor</button>
                <div class='infoBoxArticle hide'></div>
                <h1 class='labelToFoto'>Aktualne zdjęcie: </h1>
                <img class='img' src='./public/images/noFoto'>
                <button class='removeProductFoto'>Usuń zdjęcie</button>
                <h1 class='idBox'></h1>
            </div>
    `;
    }
}