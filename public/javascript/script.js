////// main nav menu handler //////////////////////////////////////////////////////////////
console.log('script menu connected');
const mainMenuBtns = [...document.querySelectorAll('*>nav.main>ul>li')];


const mainMenuClassCleaner = ()=> {
    mainMenuBtns.forEach((btn)=> {
        btn.classList.remove('active');
    })
};

const btnClassToggle = (btn)=> {
    mainMenuClassCleaner();
    btn.classList.add('active');
}; 

mainMenuBtns.forEach(btn=> {
    btn.addEventListener('click', ()=> btnClassToggle(btn));
});

///////// aditional menu handler/////////////////////////////////////////////////////////////

const shopsBtn = mainMenuBtns[1];
const aboutBtn = mainMenuBtns[3];
const shopsMenu = document.querySelector('.menuH');
const aboutMenu = document.querySelector('.menuShort');

const menuRemover = ()=> {
    shopsMenu.classList.remove('active');
    shopsMenu.classList.remove('active1');
};

const menuRemoverL = ()=> {
    setTimeout(menuRemover,401);
};

const secondMenuActive = ()=> {

    const flag = shopsBtn.classList.contains('active');

    if( flag === false) {
    shopsMenu.classList.add('active');
    }
    else {
        menuRemover();
    };
};

const secondMenuActive1 = ()=> {
    shopsMenu.classList.add('active1')
};

const secondMenuDis = ()=> {
        const x = ()=> {
        shopsMenu.classList.remove('active');
        };
        setTimeout(x,500);
};

const secondMenuDis1 = ()=> {
    const x = ()=> {
    shopsMenu.classList.remove('active1');
    };
    setTimeout(x,500);
};

shopsBtn.addEventListener('click',menuRemover);
shopsBtn.addEventListener('click',menuRemoverL);
shopsBtn.addEventListener('mousemove',secondMenuActive);
shopsBtn.addEventListener('mouseout',secondMenuDis);
shopsMenu.addEventListener('mouseenter',secondMenuActive1);
shopsMenu.addEventListener('mouseleave',secondMenuDis1);

const menuRemover1 = ()=> {
    aboutMenu.classList.remove('active');
    aboutMenu.classList.remove('active1');
};

const menuRemoverL1 = ()=> {
    setTimeout(menuRemover1,401);
};

const thirdMenuActive = ()=> {
    const flag = aboutBtn.classList.contains('active');
    if( flag == false) {
        aboutMenu.classList.add('active');
    }
    else {
        menuRemover1();
    };
};
const thirdMenuActive1 = ()=> {
    aboutMenu.classList.add('active1');
};

const thirdMenuDis = ()=> {
    const x = ()=> {
        aboutMenu.classList.remove('active');
    };
    setTimeout(x,500);
};


const thirdMenuDis1 = ()=> {
    const x = ()=> {
        aboutMenu.classList.remove('active1');
    };
    setTimeout(x,500);
};


aboutBtn.addEventListener('click',menuRemover1);
aboutBtn.addEventListener('click',menuRemoverL1);
aboutBtn.addEventListener('mousemove',thirdMenuActive);
aboutBtn.addEventListener('mouseout',thirdMenuDis);
aboutMenu.addEventListener('mousemove',thirdMenuActive1);
aboutMenu.addEventListener('mouseleave',thirdMenuDis1);

