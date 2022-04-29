document.addEventListener('click', (e) => {

    if(hasClass(e.target, 'save-gov')) {
        const president = document.querySelector('#president').value;
        const vicePresident = document.querySelector('#vice-president').value;
        const partPresident = document.querySelector('#part-president').value;
        const director = document.querySelector('#director').value;
        const viceDirector = document.querySelector('#vice-director').value;
        const partDirector = document.querySelector('#part-director').value;
        const supervisorOne = document.querySelector('#supervisor-one').value;
        const supervisorTwo = document.querySelector('#supervisor-two').value;

        const dataToSend ={president, vicePresident, partPresident, director, viceDirector, partDirector, supervisorOne, supervisorTwo};
        if(window.confirm('Zapisać zmiany ?')) {
            const loading = document.querySelector('.loadingBox');
            loading.classList.add('onload');
            getTop();

            fetch('/admin/gov', {
                method: 'PATCH',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(dataToSend),
            })
            .then(res => {
                if(res.redirected) {
                    return data = res.url
                } else {
                    return data = res.json()
                } 
            })
            .then(data => {
                if(data.ok) {                    
                    loading.classList.remove('onload');
                    document.querySelector('.gov-inforamtion-window').classList.remove('hide');
                    setTimeout(()=> {
                        window.location.pathname = '/admin/gov';
                    },1800);
                } else {
                    window.location.href = data;
                };
            })
            .catch(err => {
                errorFunction();
            });

        }
        
    }

});