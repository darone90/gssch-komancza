/////////////////////////////////global functions/////////////////////////////////////////

const scrollContent = (e)=> {
    window.scrollTo({
        top:e,
        behavior: 'smooth'
    });
}
//////////////////////////////////////shop view handl//////////////////////////////////////
function hasClass(elem, className) {
    return elem.classList.contains(className);
};

document.addEventListener('click', function (e) {
    if (hasClass(e.target, 'a')) {
        document.querySelector('.a').classList.toggle('active');
        document.querySelector('.ca').classList.toggle('long');
    }
    else if (hasClass(e.target, 'b')) {
        document.querySelector('.b').classList.toggle('active');
        document.querySelector('.cb').classList.toggle('long');
    }
    else if (hasClass(e.target, 'c')) {
        document.querySelector('.c').classList.toggle('active');
        document.querySelector('.cc').classList.toggle('long');
    }
    else if (hasClass(e.target, 'd')) {
        document.querySelector('.d').classList.toggle('active');
        document.querySelector('.cd').classList.toggle('long');
    }
}, false);



////// main nav menu handler //////////////////////////////////////////////////////////////
console.log('script menu connected');
const mainMenuBtns = [...document.querySelectorAll('*>nav.main>ul>li')];
const scrollValue = [260, 260, 260, 260, 340, 260, 350, 400];
const menuLong = document.querySelector('.menuL');

const mainMenuClassCleaner = ()=> {
    mainMenuBtns.forEach((btn)=> {
        btn.classList.remove('active');
        menuLong.classList.remove('active');
    })
};

const btnClassToggle = (btn, index)=> {
    mainMenuClassCleaner();
    btn.classList.add('active');
    scrollContent(scrollValue[index]);
}; 

mainMenuBtns.forEach((btn, index)=> {
    btn.addEventListener('click', ()=> btnClassToggle(btn, index));
});

const navigation = document.querySelector('.main');

const navActive = () => {
    const scrollY = window.scrollY;
    const activHight = 260
                        
    scrollY > activHight ? navigation.classList.add('active'): navigation.classList.remove('active');
}

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

shopsBtn.addEventListener('click', ()=> {
    menuLong.classList.add('active');
});

const menuLActive = () => {
    const scrollY = window.scrollY;
    const activHight = 260
                        
    scrollY > activHight ? menuLong.classList.add('scrolling'): menuLong.classList.remove('scrolling');
};

const shopsBtns = document.querySelectorAll('.menuL>ul>li');


shopsBtns.forEach( (btn, index) => {
        btn.addEventListener('click', ()=> {
            const shopHigh = document.querySelector('div.shops').clientHeight+125;
            scrollContent(shopHigh*(index)+ 280);
        })
} );

//////////////////////////////////////////move up btn////////////////////////////////////////////

const moveUpBtn = document.querySelector('.moveUp');

moveUpBtn.addEventListener('click', ()=> scrollContent(0));

const moveUpActive = () => {
    const scrollY = window.scrollY;
    const activHight = document.querySelector('.topBar').clientHeight
                        + document.querySelector('.header').clientHeight;
                        
    scrollY > activHight ? moveUpBtn.classList.add('active'): moveUpBtn.classList.remove('active');
}

/////////////////////////////////////banner///////////////////////////////////////////////////////

const bannerImageBase = ['banner 3.jpg','banner 4.jpg','banner 5.jpg','banner 2.jpg','banner 6.jpg','banner 1.jpg'];
const bannerTitleBase = ['Piekarnia','Sklep Budowlany','Delikatesy Centrum'];
const bannerLogoBase = ['logo 2.png','logo 3.jpg','logo 1.jpg'];

const imgBanner = document.querySelector('.banner img');
const titleBanner = document.querySelector('.banner h1');
const logoBanner = document.querySelector('.banner div');

let bannerIndex = 0;

const changeBannerImage = ()=> {
    imgBanner.src = './public/images/'+bannerImageBase[bannerIndex];

    bannerIndex++;
    if(bannerIndex === bannerImageBase.length) {
        bannerIndex = 0;
    }
}
changeBannerImage();
setInterval(changeBannerImage,10000);

let logoIndex = 0;

const changeBannerLogo = ()=> {
    titleBanner.textContent = bannerTitleBase[logoIndex];
    logoBanner.style.backgroundImage = "url('./public/images/"+bannerLogoBase[logoIndex]+"')";
    logoIndex++;

    if (logoIndex >= 3) {
        logoIndex = 0;
    };
};
changeBannerLogo();
setInterval(changeBannerLogo,20000);



//////////////////////////////////////scroll events//////////////////////////////////////////////

window.addEventListener('scroll', () => {
    moveUpActive();
    navActive();
    menuLActive();
})




 