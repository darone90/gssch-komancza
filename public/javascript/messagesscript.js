document.addEventListener('click', (e) => {

    if (hasClass(e.target, 'read')) {
        
        loading.classList.add('onload');
        const id = e.target.classList[1];
        const messageBox = document.getElementById(`${id}`);

        fetch(`/admin/messages-readed/${id}`, {

            method: 'PATCH',

        }).then(res => {
            if(res.redirected) {
                return data = res.url
            } else {
                return data = res.json()
            } 
        })
          .then(data => {

            if (data.ok === true) {
                const info = document.createElement('div');
                info.classList.add('replace')
                info.innerText = 'Wiadomość zostanie przeniesiona do zakładki "Wiadomości przeczytane"';

                messageBox.appendChild(info)
                loading.classList.remove('onload');

                e.target.disabled = true;

            } else {
                window.location.href = data;
            };

        }).catch(err => {
            errorFunction();
        });
        
        
    };
    if (hasClass(e.target, 'showReaded')) {

        const oppositbtn = document.querySelector('.showUnreaded');
        const readed = document.querySelector('.readed');
        const unreaded = document.querySelector('.unreaded');

        e.target.classList.add('active');
        oppositbtn.classList.remove('active');

        unreaded.classList.add('hide');
        readed.classList.remove('hide');
    };

    if (hasClass(e.target, 'showUnreaded')) {

        const oppositbtn = document.querySelector('.showReaded');
        const readed = document.querySelector('.readed');
        const unreaded = document.querySelector('.unreaded');

        e.target.classList.add('active');
        oppositbtn.classList.remove('active');

        unreaded.classList.remove('hide');
        readed.classList.add('hide');
    };

    if (hasClass(e.target, 'delete')) {

        if(window.confirm('Wiadomość zostanie usunięta definitywnie, kontynuować ?')){
        loading.classList.add('onload');
        const id = e.target.classList[1];
        const messageBox = document.getElementById(`${id}`);


        fetch(`/admin/messages-delete/${id}`, {

            method: 'DELETE',
        }).then(res => {
            if(res.redirected) {
                return data = res.url
            } else {
                return data = res.json()
            } 
        })
          .then(data => {

            if (data.ok === true) {
                const info = document.createElement('div');
                info.classList.add('remove')
                info.innerText = 'Wiadomość zostanie usunięta"';
                
                messageBox.appendChild(info)
                loading.classList.remove('onload');
                e.target.disabled = true;

            } else {
                window.location.href = data;
            };
        }).catch(err => {
            errorFunction();
        });    
            } else {return}};

});