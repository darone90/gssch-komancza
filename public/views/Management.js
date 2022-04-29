import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza Zarząd');
    }

    loadData (data) {
        const loading = document.querySelector('div.databaseload');
        document.querySelector('#president').innerText = data[0].president;
        document.querySelector('#vice-president').innerText = data[0].vicePresident;
        document.querySelector('#part-president').innerText = data[0].partPresident;
        document.querySelector('#director').innerText = data[0].director;
        document.querySelector('#vice-director').innerText = data[0].viceDirector;
        document.querySelector('#part-director').innerText = data[0].partDirector;
        document.querySelector('#supervisor-one').innerText = data[0].supervisorOne;
        document.querySelector('#supervisor-two').innerText = data[0].supervisorTwo;
         loading.classList.remove('progress');
    }

    async getHtml() {

        const loading = document.querySelector('div.databaseload');
        loading.classList.add('progress');

        fetch('/gov/all', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => this.loadData(data))
            .catch(err => {
                document.querySelector('.errorinfo').classList.remove('hide');
            })

            
        return `
        <section class="management">
        <div class='bosses'>
        <h1>Zarząd "GSSCH" w Komańczy</h1>
        <ul>
            <li>Prezes Zarządu: <strong id='president'></strong></li>
            <li>Zastępca Prezesa: <strong id='vice-president'></strong></li>
            <li>Członek Zarządu: <strong id='part-president'></strong></li>
        </ul>
        </div>
        <div class='directors'>
        <h1>Rada nadzorcza "GSSCH" w Komańczy</h1>
        <ul>
            <li>Przewodniczący: <strong id='director'></strong></li>
            <li>Zastępca: <strong id='vice-director'></strong></li>
            <li>Sekretarz: <strong id='part-director'></strong></li>
        </ul>
        <h1>Członkowie Rady Nadzorczej</h2>
        <ul>
            <li><strong id='supervisor-one'></strong></li>
            <li><strong id='supervisor-two'></strong></li>
        </ul>
        </div>
    </section>
        `;
    }
}