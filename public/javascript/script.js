////////////////////////temporary database//////////////////////////////////////////////
const articlesTitles = ['Nagroda Z P P  Dobra Firma','Fotowoltaika - na miare współczesności'];
const articlesDates = ['5 Listopada 2020', 'Wiosna 2021'];
const articlesP1 = ['5 listopada 2020 roku odbyła się uroczysta Gala rozdania nagród Dobra Firma województwa Podkarpackiego organizowana przez Związek Przedsiębiorców i Pracodawców. Impreza odbyłą się patronatem Wojewody Urzędu Marszałkowskiego oraz Prezydenta Miasta Rzeszów.', 'Gminna Spółdzielnia przystapiła do montażu instalacji fotowoltaicznych, które będą produkować prąd na potrzeby naszego obiektu handlowego gdzie znajduja się Delikatesy Centrum w Komańczy jak również jest to siedziba Spółdzielni. Jest to idealne połączenie nowoczesnej technologii, oszczędności i ekologii.'];
const articlesP2 = ['Nasza Spółdzielnia znalazła się w elitarnym gronie zwycięzców firm w ogólnopolskim rankingu oraz została laureatem konkursu jako najbardziej efektywna Firma Województwa Podkarpackiego w kategorii Mała Firma','Fotowoltaika to inwestycja korzystna na wielu płaszczyznach. Pozwala znacząco ograniczyć koszty zakupu energii elektrycznej, w znacznym stopniu uniezależnić się od dostawcy energii i jego cen, a tym samym widocznie zmniejszyć wydatki firmy. Fotowoltaika to idealne połączenie nowoczesnej technologii, oszczędności i ekologii.'];
const articlesImages = ['NagrodaDobraFirma.jpg', 'fotowol.jpg']
/////////////////////////////////global functions/////////////////////////////////////////

const scrollContent = (e)=> {
    window.scrollTo({
        top:e,
        behavior: 'smooth'
    });
};

function hasClass(elem, className) {
    return elem.classList.contains(className);
};
//////////////////////////////////////events for dynamic elements//////////////////////////////////////


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
    else if (hasClass(e.target, 'e')) {
        document.querySelector('.e').classList.toggle('active');
        document.querySelector('.ce').classList.toggle('long');
    }
   else if (hasClass(e.target, 'moreNews')) {
    const date = document.querySelector('article h1.date');
    const title = document.querySelector('article h2.title');
    const parag1 = document.querySelector('p.first');
    const parag2 = document.querySelector('p.second');
    const imagear = document.querySelector('div.fullSizeImg');
    const nextbtn = document.querySelector('button.next');
    const pervbtn = document.querySelector('button.perview');
    let index = 0;

       if(e.target.dataset.index === '1') {
           date.innerText = articlesDates[0];
           title.innerText = articlesTitles[0];
           parag1.innerText = articlesP1[0];
           parag2.innerText = articlesP2[0];
           imagear.style.backgroundImage = "url('./public/images/fullsize/"+articlesImages[0]+"')";
           index = 0;
           pervbtn.disabled = true;
           nextbtn.disabled = false;
       }
       if(e.target.dataset.index === '2') {
        date.innerText = articlesDates[1];
        title.innerText = articlesTitles[1];
        parag1.innerText = articlesP1[1];
        parag2.innerText = articlesP2[1];
        imagear.style.backgroundImage = "url('./public/images/fullsize/"+articlesImages[1]+"')";
        index = 1;
        nextbtn.disabled = true;
        pervbtn.disabled = false;
       }
        document.querySelector('div.popup').classList.add('active');

        function next() {
            console.log(index)
            if (index === 0) {
                date.innerText = articlesDates[1];
                title.innerText = articlesTitles[1];
                parag1.innerText = articlesP1[1];
                parag2.innerText = articlesP2[1];
                imagear.style.backgroundImage = "url('./public/images/fullsize/"+articlesImages[1]+"')";
                nextbtn.disabled = true;
                pervbtn.disabled = false;
                index = 1;
            };  
        };
        function perview() {
            if (index === 1) {
                date.innerText = articlesDates[0];
                title.innerText = articlesTitles[0];
                parag1.innerText = articlesP1[0];
                parag2.innerText = articlesP2[0];
                imagear.style.backgroundImage = "url('./public/images/fullsize/"+articlesImages[0]+"')";
                nextbtn.disabled = false;
                pervbtn.disabled = true;
                index = 0;
            };
        };

        nextbtn.addEventListener('click', next);
        pervbtn.addEventListener('click', perview);
   }
   
   if (hasClass(e.target, 'close')) {
        document.querySelector('div.popup').classList.remove('active')
   }
    
}, false);


////// main nav menu handler //////////////////////////////////////////////////////////////
console.log('script menu connected');
const mainMenuBtns = [...document.querySelectorAll('*>nav.main>ul>li')];
const scrollValue = [260, 260, 260, 260, 340, 260, 350, 400];
const menuLong = document.querySelector('.menuL');
const timeLaps = document.querySelector('.timeLaps');


const mainMenuClassCleaner = ()=> {
    mainMenuBtns.forEach((btn)=> {
        btn.classList.remove('active');
        menuLong.classList.remove('active');
        timeLaps.classList.remove('active');

    });
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
const shopsnavigation = document.querySelector('.menuH');
const aboutNavigation = document.querySelector('.menuShort');

const navActive = () => {
    const scrollY = window.scrollY;
    const activHight = 260
                        
    scrollY > activHight ? navigation.classList.add('active'): navigation.classList.remove('active');
    scrollY > activHight ? shopsnavigation.classList.add('scrolling'):shopsnavigation.classList.remove('scrolling');
    scrollY > activHight ? aboutNavigation.classList.add('scrolling'):aboutNavigation.classList.remove('scrolling');
    scrollY > activHight ? timeLaps.classList.add('scroll'): timeLaps.classList.remove('scroll');
};

mainMenuBtns[3].addEventListener('click', ()=> {
    timeLaps.classList.add('active');
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

shopsBtn.addEventListener('click', ()=> {
    menuLong.classList.add('active');
});

const menuLActive = () => {
    const scrollY = window.scrollY;
    const activHight = 260
                        
    scrollY > activHight ? menuLong.classList.add('scrolling'): menuLong.classList.remove('scrolling');
};

const shopsBtns = document.querySelectorAll('.menuL>ul>li');
const shopsBtnsMenuH = document.querySelectorAll('.menuH>ul>li');
const aboutBtns = document.querySelectorAll('.menuShort>ul>li');

const lCleaner = ()=> {
    shopsBtns.forEach((e)=> {
        e.classList.remove('active');
    })
}

const activeShopsClean = () => {
    const shops = document.querySelectorAll('div.shops');
    shops.forEach(shop => shop.classList.remove('long') );
};

shopsBtnsMenuH.forEach((btn, index)=> {
    btn.addEventListener('click', ()=> {
        setTimeout(()=> {
        menuRemover();
        mainMenuClassCleaner();
        menuLong.classList.add('active');
        mainMenuBtns[1].classList.add('active');
        const shopHigh = 645
        scrollContent(shopHigh*(index)+ 220);
        },300);
    });
});

aboutBtns.forEach((btn, index)=> {
    btn.addEventListener('click', ()=> {
        setTimeout(()=> {
        menuRemover1();
        mainMenuClassCleaner();
        timeLaps.classList.add('active');
        mainMenuBtns[3].classList.add('active');
        switch(index) {
            case 0 : scrollContent(270);
            break;
            case 1 : scrollContent(1035);
            break;
            case 2 : scrollContent(1760);
            break;
            case 3 : scrollContent(2310);
            break;
            case 4 : scrollContent(2931);
            break;
        };
        
        },300);
    });
});

shopsBtns.forEach( (btn, index) => {
        btn.addEventListener('click', ()=> {
            activeShopsClean();
            const shopHigh = document.querySelector('div.shops').clientHeight+125;
            scrollContent(shopHigh*(index)+ 280);
        });
} );

const shopsMenuBtnsActiv = () => {
    const scrollY = window.scrollY;
    const shopHigh = document.querySelectorAll('div.shops');
    let num = 0;
    let num2 = 0;
    let num3 = 0;
    let num4 = 0;
    const indexArray = [];
    shopHigh.forEach((shop, index)=> shop.classList.contains('long')? indexArray.push(index):null);
    for(index of indexArray) {
        switch(index) {
            case 0 : num = 380; break;
            case 1 : num2 = 380; break;
            case 2 : num3 = 380; break;
            case 3 : num4 = 380; break;
        }
    }
    if (scrollY < 260) {
        lCleaner();
    }
    else if(scrollY >= 260 && scrollY < 612 + num) {
        lCleaner();
        shopsBtns[0].classList.add('active');
    }
    else if(scrollY >= 612 + num  && scrollY < 1230 + num + num2 ){
        lCleaner();
        shopsBtns[1].classList.add('active');
    }
    else if(scrollY >= 1230 + num + num2 && scrollY < 1836 + num + num2 + num3){
        lCleaner();
        shopsBtns[2].classList.add('active');
    }
    else if(scrollY >= 1836 + num + num2 + num3 && scrollY < 2550 + num + num2 + num3 + num4){
        lCleaner();
        shopsBtns[3].classList.add('active');
    }
    else {
        lCleaner();
        shopsBtns[4].classList.add('active');
    }
};
const circles = document.querySelectorAll('.circle');
const circlesRemover = () => {
    circles.forEach(circle => circle.classList.remove('active'));
}
const circleActiv = (i) => {
    circles[i].classList.add('active');
}

const timeLapsCirlclesActiv = () => {
    const scrollY = window.scrollY;
    if (scrollY < 255) {
        circlesRemover();
    }
    else if (scrollY >= 255 && scrollY < 1035) {
        circlesRemover();
        circleActiv(0);
    }
    else if (scrollY >= 1035 && scrollY < 1760) {
        circlesRemover();
        circleActiv(1);
    }
    else if (scrollY >= 1760 && scrollY < 2310) {
        circlesRemover();
        circleActiv(2);
    }
    else if (scrollY >= 2310 && scrollY < 2931) {
        circlesRemover();
        circleActiv(3);
    } 
    else {
        circlesRemover();
        circleActiv(4);
    }

}

const circleScrollArr = [265, 1037, 1765, 2315, 2935]

circles.forEach((circle, index) => circle.addEventListener('click', ()=> {
    scrollContent(circleScrollArr[index]);
}));

const moveBtn = document.querySelector('.moveBtn');



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

const bannerImageBase = ['banner 2.jpg','banner 3.jpg','banner 4.jpg','banner 5.jpg','banner 6.jpg','banner 1.jpg'];
const bannerTitleBase = ['Piekarnia','Sklep Budowlany','Delikatesy Centrum'];
const slogans = ['Codziennie świerze pieczywo...', 'Niezbędne materiały blisko ciebie...', 'Najlepszy sklep spżywczy w twojej okolicy'];
const bannerLogoBase = ['logo 2.png','logo 3.jpg','logo 1.jpg'];

const banner = document.querySelector('.banner');
let bannerIndex = 0;
let logoIndex = 0;

const bannerRemover = ()=> {
        banner.removeChild(document.querySelector('.banner img'));
};

const bannerTitleRemover = () => {
    banner.removeChild(document.querySelector('.bannerLogo'));
    banner.removeChild(document.querySelector('.banner h1'));
    banner.removeChild(document.querySelector('.banner h2'));
};

const changeBannerLogo = ()=> {
    const bannerLogo = document.createElement('div');
    bannerLogo.classList.add('bannerLogo');
    banner.appendChild(bannerLogo);
    bannerLogo.style.backgroundImage = "url('./public/images/"+bannerLogoBase[logoIndex]+"')";


    const bannerTitle = document.createElement('h1');
    banner.appendChild(bannerTitle);
    bannerTitle.textContent = bannerTitleBase[logoIndex];

    const bannerDes = document.createElement('h2');
    banner.appendChild(bannerDes);
    bannerDes.textContent = slogans[logoIndex];
    
    logoIndex++;

    if (logoIndex >= 3) {
        logoIndex = 0;
    };
};

const changeBannerImage = ()=> {
    
    const img = document.createElement('img');
    banner.appendChild(img);
    img.src = './public/images/'+bannerImageBase[bannerIndex];
    
    bannerIndex++;
    if(bannerIndex === bannerImageBase.length) {
        bannerIndex = 0;
    }
    
}


setTimeout(()=> {
    bannerRemover();
    changeBannerImage();
},10000);

    changeBannerImage();
    changeBannerLogo();
setInterval(()=> {
    bannerRemover();
    changeBannerImage()
    bannerTitleRemover();
    changeBannerLogo();
    setTimeout(()=>{
        bannerRemover();
        changeBannerImage()
    },10000);
},20000);
///////////////////////////////////////////site loading/////////////////////////////////////////////

const loadText = document.querySelector('.load h1');
const loadDots = ['Ładowanie.', 'Ładowanie..','Ładowanie...'];
let dotIndex = 0;

function dotChange () {
    loadText.innerText = loadDots[dotIndex];
    dotIndex++;
    if(dotIndex > 2) {
        dotIndex = 0;
    }
}
setInterval(dotChange, 500);

function loadEnd () {
    document.querySelector('div.load').classList.remove('visible');
}

window.onload = loadEnd();

//////////////////////////////////////scroll events//////////////////////////////////////////////

window.addEventListener('scroll', () => {
    moveUpActive();
    navActive();
    menuLActive();
    shopsMenuBtnsActiv();
    timeLapsCirlclesActiv();
})

 