import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Zarząd');
    }

    loadData (data) {
        const loading = document.querySelector('.loadingBox');
        document.querySelector('#president').value = data[0].president;
        document.querySelector('#vice-president').value = data[0].vicePresident;
        document.querySelector('#part-president').value = data[0].partPresident;
        document.querySelector('#director').value = data[0].director;
        document.querySelector('#vice-director').value = data[0].viceDirector;
        document.querySelector('#part-director').value = data[0].partDirector;
        document.querySelector('#supervisor-one').value = data[0].supervisorOne;
        document.querySelector('#supervisor-two').value = data[0].supervisorTwo;
        loading.classList.remove('onload');
    }

    async getHtml() {

        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');

        fetch('/gov/all', {
            method: "GET"
        })
            .then(res => res.json())
            .then(data => this.loadData(data))

        return `
        <section class="management">
        <div class='gov-inforamtion-window hide'>Dane zostały zaktualizowane</div>
        <div class='bosses'>
        <h1>Zarząd "GSSCH" w Komańczy</h1>
        <ul>
            <li>Prezes Zarządu: <input type='text' id='president'></li>
            <li>Zastępca Prezesa: <input type='text' id='vice-president'></li>
            <li>Członek Zarządu: <input type='text' id='part-president'></li>
        </ul>
        </div>
        <div class='directors'>
        <h1>Rada nadzorcza "GSSCH" w Komańczy</h1>
        <ul>
            <li>Przewodniczący: <input type='text' id='director'></li>
            <li>Zastępca: <input type='text' id='vice-director'></li>
            <li>Sekretarz: <input type='text' id='part-director'></li>
        </ul>
        <h1>Członkowie Rady Nadzorczej</h2>
        <ul>
            <li><input type='text' id='supervisor-one'></li>
            <li><input type='text' id='supervisor-two'></li>
        </ul>
        </div>
        <button class='save-gov blue'>Zapisz zmiany</button>
    </section>     
        `;
    }

};