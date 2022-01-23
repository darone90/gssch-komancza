import viewModel from "../../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('Edytuj konta');
    }

    getUsers(data) {
        const userList = document.querySelector('.usersList');
        data.forEach(user => {
            const {codeOne : name, codeThree : permission, _id} = user;
            const userBox = document.createElement('div');
            userBox.classList.add('userBox')

            userBox.innerHTML = `
                <h2>Nazwa użytkownika: ${name}</h2>
                <h3>Poziom uprawnień: ${permission ? "Master" : "Normal"}</h3>
                <button class='${_id} permissionChange all'>${permission ? 'Usuń uprawnienia' : "Dodaj upranienia"}</button>
                <button class='${_id} removeUser all'>Usuń użytkownika</button>
            `

            userList.appendChild(userBox)
        })
    }

    async getHtml() {

        fetch('/accounts/read-users', {
            method: "GET",
        }).then(res => res.json()).then(data => this.getUsers(data));

        return `
        <div class='usersBox'>
            <h2>Aktualna lista użytkowników: </h2>
            <div class='usersList'>
            
            </div>
        </div>`
    }
}