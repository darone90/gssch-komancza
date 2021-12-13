import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Odebrane wiadomości');
    }

    loadMessages (data) {
        
        const readedBox = document.querySelector('.readed');
        const unreadedBox = document.querySelector('.unreaded');

        const unreaded = [];
        const readed = [];
        
        for(let i = 0; i < data.length; i++ ) {
            if(data[i].readed) {
                readed.push(data[i]);
            } else {
                unreaded.push(data[i])
            };
        };

        if (unreaded.length < 1) {

            const h2 = document.createElement('h2');
            h2.classList.add('nomessage');
            h2.innerText = 'Aktualnie brak wiadomości nieprzeczytanych'
            unreadedBox.appendChild(h2);
        };

        unreaded.forEach(message => {

            const messageBox = document.createElement('div');
            messageBox.classList.add('unreadedBox');
            messageBox.setAttribute('id',`${message._id}`)
            messageBox.innerHTML = `
                <h3>Wiadomość od ${message.name} wysłana w dniu: ${message.date}</h3>
                <h4>Temat wiadomości: ${message.subject}</h4>
                <p>Wiadomość: <br> ${message.content}</p>
                <p>Kontak: ${message.contact}</p>
                <button class='read ${message._id}'>Przeczytane</button>
                <button class='delete ${message._id}'>Usuń</button>
            `;

            unreadedBox.appendChild(messageBox);
        });

        if (readed.length < 1) {

            const h2 = document.createElement('h2');
            h2.classList.add('nomessage');
            h2.innerText = 'Aktualnie brak wiadomości przeczytanych'
            readedBox.appendChild(h2);
        };

        readed.forEach(message => {
         
            const messageBox = document.createElement('div');
            messageBox.classList.add('readedBox');
            messageBox.setAttribute('id',`${message._id}`)
            messageBox.innerHTML = `
                <h3>Wiadomość od ${message.name} wysłana w dniu: ${message.date}</h3>
                <h4>Temat wiadomości: ${message.subject}</h4>
                <p>${message.content}</p>
                <p>Kontak: ${message.contact}</p>
                <button class='delete ${message._id} onreaded'>Usuń</button>
            `;

            readedBox.appendChild(messageBox);
        });

        const loading = document.querySelector('.loadingBox');
        loading.classList.remove('onload');

    }

    async getHtml() {

        const loading = document.querySelector('.loadingBox');
        loading.classList.add('onload');

        fetch('/admin/messages-get', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => this.loadMessages(data));

        return `

        <button class='showUnreaded active'>Nieprzeczytane</button>
        <button class='showReaded'>Przeczytane</button>
        <div class='unreaded'>
            <h1>Wiadomości nieprzeczytane</h1>
        </div>

        <div class='readed hide'>
            <h1>Wiadomości przeczytane</h2>
        </div>
        `
    }
}