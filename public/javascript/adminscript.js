const loading = document.querySelector('.loadingBox');
const  nameBox = document.querySelector('.nameFromCookie');
const cookies = document.cookie.split(';')

let currentObjectId;

const hasClass = (elem, className) => {
    return elem.classList.contains(className);
};

const loadName= () => {

    const name = (cookies.filter(cookie => cookie.includes('user-name')))[0].split('=');
    const show = name[1].replace('%20', ' ');
    nameBox.innerText = show;
    
}

const loadSpaceBars = () => {
    const content = (cookies.filter(cookie => cookie.includes('content-limit')))[0].split('=');
    const valuesC = content[1].split('%3F');
    const contentValue = Number(valuesC[0]);
    const contentLimit = Number(valuesC[1]);

    const database = (cookies.filter(cookie => cookie.includes('base-limit')))[0].split('=');
    const valuesD = database[1].split('%3F');
    const databaseValue = Number(valuesD[0]);
    const databaseLimit = Number(valuesD[1]);

    const percentC = Math.round(contentValue/(contentLimit/100));
    const barC = document.querySelector('.contentbar div');
    barC.style.width = `${percentC}%`

    const percentD = Math.round(databaseValue/(databaseLimit/100));
    const barD = document.querySelector('.databasebar div');
    barD.style.width = `${percentD}%`;

    
};

const scrollContent = (e)=> {
    window.scrollTo({
        top:e,
        behavior: 'smooth'
    });
};


document.addEventListener('click', (e) => {
    if(hasClass(e.target, 'mainmenu')) {
        const allBtns =  [...document.querySelectorAll('.mainmenu')];
        allBtns.forEach(btn=> btn.style.textDecoration = 'none');
        e.target.style.textDecoration = 'underline';
    };

    if(hasClass(e.target, 'dwlatt')) {

                const id = e.target.classList[1];
                const table = document.getElementsByClassName(`${id}`);
                const name = table[0].innerText
                window.location.href =  `/admin/download/${id}/${name}`;
    };

    if(hasClass(e.target, 'dwldoc')) {
                const id = e.target.classList[1];
                const table = document.getElementsByClassName(`${id}`);
                const name = table[0].innerText;
                window.location.href = `/admin/downloaddoc/${id}/${name}`;

    };


            
});

window.addEventListener('load', loadName);
window.addEventListener('load', loadSpaceBars);
