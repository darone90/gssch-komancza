function addErrorInfo(data) {
    const errInfo = document.createElement('div');
    const body = document.querySelector('body');
    if(data){
    errInfo.innerText = data;
    } else {
        errInfo.innerText = 'nie można określić typu błędu';
    }
    body.appendChild(errInfo);
}

fetch('/error/info', {method: 'GET',}).then(res => res.json()).then(data => addErrorInfo(data));