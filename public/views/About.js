import viewModel from "../models/viewModel.js";

export default class extends viewModel {
    constructor() {
        super();
        this.setTitle('GS SCH Komańcza O Spółdzielni');
    }

    async getHtml() {
        return `
        <section class="about">
        <div class="timeBlock">
            <div class="begin"><main><h1>W styczniu 1945 roku...</h1>
                <p> została powołana do działania najpierw jako Spółdzielnia Spożywców „ Niespodzianka „ , a w styczniu 1946 roku zarejestrowana w Sądzie już jako Gminna Spółdzielnia „Samopomoc
                Chłopska” w Komańczy.
                
                Inicjatorem powołania Spółdzielni i jej pierwszym Prezesem Zarządu był Proboszcz Parafii Rzymsko-
                Katolickiej w Komańczy ks.Stanisław Porębski , który od 03.09.1946 był Przewodniczącym Gminnej Rady
                Narodowej w Komańczy. Głównym Księgowym Spółdzielni został Michał Krasulak z Turzańska, członkami 5-cio
                osobowego Zarządu zostali: Eliasz Czurma, Stanisław Kasiewicz, Dołżycki Tymoteusz i Władysław Zieliński –
                wszyscy z Komańczy. Powołano też kilku osobową Radę Nadzorczą.</p>
                <div class='beginFoto'><i>Przykładowa fotografia</i></div>
                <p>Biura Spółdzielni usytuowane były początkowo w dzierżawionych budynkach prywatnych.
                Podobnie nowo powstałe sklepy i gospoda „ Myśliwska „. Spółdzielnia wypełniła pustkę po przedwojennych
                sklepach, najczęściej żydowskich, zaopatrując w podstawowe artykuły żywnościowe (sól, cukier, mąki, kasze,
                tłuszcze i marmolady oraz art.przemysłowe: węgiel, koks, naftę, benzynę i oleje silnikowe - robotników
                sezonowych Nadleśnictwa i mieszkańców niemal całej Gminy.</p>
                
                <p> W bieszczadzkich warunkach start spółdzielni odbywał się w o wiele w trudniejszych sytuacjach niż w
                innych regionach kraju. Pierwsze towary zakupione zostały za pieniądze pożyczone od Parafii i od paru osób
                prywatnych. Tylko zaangażowanie i duże poświęcenie jej pierwszych zarządów i członków pozwoliło przetrwać a następnie stopniowo rozwijać się spółdzielni. Ludzie pracowali często za minimalne wynagrodzenie lub tzw. deputat żywnościowy.
                Wszystkie towary przywożone były z Sanoka do Komańczy koleją, a nieco póżniej pierwszym samochodem marki
                Lublin. Zaopatrzenie ludności w nowo powstałych osadach leśnych: Prełuki, Duszatyn, Mików, Smolnik, Wola
                Michowa i Nowy Łupków odbywało się za pomocą sprzedaży objazdowej z wagonika (tzw. KDX) kolejki leśnej i
                wynajętej drezyny z OTL Sanok. Zakładano też stacjonarne punkty sprzedaży tzw. PSP. Zaopatrzenie całej
                ludności wymagało dużo wysiłku organizacyjnego, a ze względu na koszty obsługi handlowej drugiej co do
                wielkości obszarowej gminy w kraju, spółdzielnia nie osiągała znaczących zysków i często była dotowana przez nadrzędne władze spółdzielczości samopomocowej</p></main>
            </div>
            <div class="past"><main><h1>W latach 1961-1980...</h1>
                <p>spółdzielnia korzystając z tzw. Uchwały Bieszczadzkiej osiągnęła najwyższy
                potencjał gospodarczy. Spółdzielnia liczyła wówczas 670 pełnoprawnych członków,
                16 pracowników w kadrze zarządzającej i 203 pracowników we wszystkich rodzajach działalności. Oddawano do
                użytku kolejne obiekty handlowe, gastronomiczne i magazynowe.
                Obsługiwała znacznie większą ilość ludności ze względu na rozwijające się PGR-y i Zakłady Karne. Dysponowała:</p>
                <p> 1 samochodem towarowo osobowym, 5 samochodami dostawczymi w tym Robur przystosowany do transportu pieczywa, 2 samochodami
                ciężarowymi, koparką, ciągnikiem z pełnym osprzętem do prac załadunkowych i rozładunkowych oraz do prac ziemnych.</p>
                <div class="pastFoto"><i>Przykładowa fotografia</i></div>
                <p>Sieć handlową stanowiły: sklepy spożywczo-przemysłowe lub tzw.PSP w każdej miejscowości gminy Komańcza i 1
                sklep z Zahutyniu (gmina Zagórz), działalność gastronomiczną prowadzono w: restauracji „ pod Kominkiem „ w
                Komańczy, barze „ Pod Sosną „ w Nowym Łupkowie, barze „ Wisłok „ w Wisłoku Wielkim i bufecie pracowniczym
                BZPD w Rzepedzi.</p>
                <p> W ramach działalności samorządowej, kulturalnej i społeczno-wychowawczej prowadziliśmy
                    niegdyś 7 klubów Rolnika, których działalność skupiała się na szeroko pojętej współpracy wszystkich środowisk i
                    mieszkańców danej miejscowości. W Komańczy utworzyliśmy Ośrodek Nowoczesnej Gospodyni gdzie
                    prowadzono różne kursy przydatne w środowisku wiejskim. Nadzorowano i sponsorowano 7 sklepików szkolnych z
                    art. spożywczymi, przydatnymi dla zdrowia dzieci oraz Kasy Systematycznego Oszczędzania. Sponsorowano
                    zawody narciarskie i klub Narciarski LZS w Komańczy, którego trenerem był ówczesny Prezes Gm.Sp-ni.
                    Wspomagano finansowo również drużynę piłkarską w Rzepedzi. Uczestniczono organizacyjnie i finansowo w
                    imprezach organizowanych przez samorząd gminny(dożynki).</p></main>
            </div>
            <div class="past2"><main><h1>Od 1990 roku...</h1>
                <p>w nowo powstałej sytuacji społeczno-gospodarczej i politycznej spółdzielnia staje się coraz
                bardziej upaństwawiana. Centralnymi zarządzeniami doprowadzono do stagnacji całą spółdzielczość wiejską.
                Zlikwidowano PGR-y, a ich załogi rozjechały się po całym kraju. Przestała jeżdzić kolejka leśna na trasie
                Rzepedż- Prełuki, Duszatyn, Mików, Smolnik, Wola Michowa i Nowy Łupków. Na skutek ograniczenia
                kredytów przez banki likwidacji uległo wiele drobnych zakładów pracy.
                Spółdzielni również ograniczono możliwość skorzystania z większego kredytu na działalność inwestycyjną,
                handlową, gastronomiczna i usługową.
                Zmalało zatrudnienie w nadleśnictwie. Rolnicy odeszli od intensywnej produkcji rolnej i hodowlanej.
                Znacznie obniżył się całoroczny ruch turystyczny. Wśród członków spółdzielni nastąpiło duże zniechęcenie do
                społecznego udzielania się w działalności spółdzielni. W obliczu niepewności - wycofywano udziały.
                W tej sytuacji Gminna Spółdzielnia zmuszona została do dużego samoograniczenia działalności.
                </p>
                <p>Nastąpiła znaczna redukcja zatrudnienia w spółdzielni. Z konieczności wyprzedała znaczny , ale już jej
                nieprzydatny majątek , a to pozwoliło przetrwać ekonomicznie trudny dla niej czas. Wymogami finansowymi
                ograniczono rozwój inwestycyjny spółdzielni. Raz jeszcze okazało się , że to głównie działacze gospodarczy i
                samorządowi poprzez swoje zaangażowanie przyczynili się znacznie do utrzymania spółdzielni.</p></main></div>
            <div class="past3">
                <main><h1>W latach 2003-2010...</h1><p>Strategia Rozwoju Spółdzielni opracowana przy pomocy PHARE mimo
                    potknięć była systematycznie wdrażana i to otworzyło dostęp do środków unijnych. Zmodernizowano część sieci
                    handlowej i piekarnię. Nawiązano ścisłą współpracę franczyzową z ogólnopolską siecią handlową „ EUROCASH”
                    tworząc sklepy o nazwie „Delikatesy Centrum” w Rzepedzi i Komańczy co ustabilizowało rentowność spółdzielni.</p>
                    <div class='past3Foto'><i>Przykładowa fotografia</i></div>
                <p>Z inicjatywy Władz samorządowych miasta i Gminy Medzilaborce ze strony słowackiej i Gminy Komańcza
                    z polskiej strony, spóldzielnia uruchomiła pod patronatem i przy pomocy Eurocashu duży sklep „ Delikatesy
                    Centrum „ w Medzilaborcach. Inicjatywa ta spotkała się jednak z ogromnym sprzeciwem miejscowych posiadaczy
                    małych sklepów. Przeróżne negatywne działania wpływowej w środowisku grupy i nieuczciwość pracowników
                    doprowadziła do konieczności wycofania się spółdzielni ze Słowacji.
                    Wyłącznie z winy strony słowackiej nie udała się nam współpraca handlowa ze stroną słowacką.
                </p>
                <p>W dniu 05 stycznia 2005 roku Gminna Spółdzielnia obchodziła uroczyście swoje 60-lecie.
                    Zarówno sama spółdzielnia jak też jej działacze i długoletni pracownicy otrzymali szereg odznaczeń oraz
                    wyróżnień państwowych, resortowych, regionalnych i spółdzielczych.
                    
                    W latach 2008 – 2014 spóldzielnia utraciła wiele ze swojego dobrego wizerunku. Zaszła konieczność
                    gruntownej zmiany władz i zmiany charakteru działania spółdzielni. Zmiany te spotkały się z dużym poparciem
                    członków spółdzielni, załogi pracowniczej i władz gminy.</p>
                </main>
            </div>
            <div class="today">
                <main><h1>Obecnie...</h1>
                    <p>
                        działalność samorządowa ogranicza się tylko do prac w organach spółdzielni.
                        Działalność kulturalna i społeczna najczęściej jest realizowana dla działaczy, członków i pracowników spółdzielni
                        poprzez organizację imprez o charakterze rocznicowym, wycieczek i ewentualne uczestnictwo w imprezach
                        organizowanych przez samorząd gminny jak np.przygraniczne spotkania ze stroną Słowacką.
                    </p>
                    <p>
                        Aktualnie spółdzielnia prowadzi działalność tylko na terenie gminy Komańcza w: 2 sklepach
                        franczyzowych o nazwie „ Delikatesy centrum „ tj. w Rzepedzi i Komańczy, 2 sklepach spożywczo-przemysłowych
                        w Komańczy i Szczawnem, 2 sklepach przemysłowych w Rzepedzi i Komańczy z szerokim asortymentem
                        materiałów budowlanych, art.gospodarstwa domowego, chemii gospodarczej, opału, środków utrzymania
                        czystości, art.do produkcji rolnej i ochrony roślin, nasion i nawozów mineralnych. Do miejscowości znacznie
                        oddalonych od Komańczy dojeżdża codzienna sprzedaż objazdowa podstawowych art. spożywczych.
                    </p>
                    <p>
                        Gminna Spółdzielnia na koniec 2020 roku liczyła 35 członków z pełnymi udziałami.
                        Podstawową załogę spółdzielni stanowią pracownicy sieci detalicznej w ilości 28 osób, pracownicy piekarni 8
                        osób, transportu 1 osoba, administracja 6 osób. Ogółem Spóldzielnia zatrudnia na etatach 43 pracowników.
                    </p>
                    <p>
                        W 2020 roku Gminna Spódzielnia brała udział w konkursie „ Dobra Firma 2020 r woj.podkarpackiego „ , którego
                        organizatorem był „ Związek Przedsiębiorców i Pracodawców „ w Warszawie. Spółdzielnia została laureatem
                        prestiżowego konkursu „ Dobra Firma 2020 – w kategorii Najbardziej Efektywna Firma woj.podkarpackiego – Mała
                        Firma.
                    </p>
                    <p>Aktualnie Spółdzielnią kieruje Zarząd w składzie:</p>
                    <p> 
                        <ul class='managementList'>
                        <li>Prezes Zarządu: Grażyna Stach</li>
                        <li>Zastępca Prezesa Zarządu: Maria Milasz</li> 
                         <li>Członek Zarzadu: Irena Pilecka</li> 
                        </ul>
                    </p>
                    <p>
                        Podkreślić należy, że niemal wszystkie stanowiska kierownicze w spółdzielni piastują kobiety. Ich zaangażowanie, pracowitość i umiejętności są gwarancją sprawnego funkcjonowania spółdzielni w przyszłości.
                    </p>
                    <p>
                        Pracę Spółdzielni i Zarządu nadzoruje 5-cio osobowa Rada Nadzorcza w składzie:
                    </p>
                    <p>
                        <ul class='managementList'>
                            <li>Przewodniczący Rady nadzorczej: Bogdan Wancewicz</li> 
                            <li>Zastępca przewodniczącego Rady Nadzorczej: Jan Pilecki</li> 
                            <li>Sekretarz Rady Nadzorczej: Jolanta Hoksa</li>  
                        </ul>
                        Członkowie Rady Nadzorczej to:
                        <ul class='managementList'>
                            <li>Małgorzata Wiktor</li> 
                            <li>Renata Hryćko</li>  
                        </ul>
                    </p>
                </main>
            </div>
        </div>
    </section>
    <aside class="timeLaps">
        <main class='timeLine'>
            <div class="circleBig">
                <div class='circle'></div>
            </div>
            <div class="column"></div>
            <div class="circleBig">
                <div class='circle'></div>
            </div>
            <div class="column"></div>
            <div class="circleBig">
                <div class='circle'></div>
            </div>
            <div class="column"></div>
            <div class="circleBig">
                <div class='circle'></div>
            </div>
            <div class="column"></div>
            <div class="circleBig">
                <div class='circle'></div>
            </div>
            <p>
                <i>1945-1960</i>
                <i>1961-1989</i>
                <i>1990-2000</i>
                <i>2000-2015</i>
                <i>Współcześnie</i>
            </p>
        </main>
    </aside>
    <div class="menuShort">
        <ul>
            <li>Początki 1945-1960</li>
            <li>Lata 1961-1989</li>
            <li>Lata 1990-2000</li>
            <li>Lata 2000-2015</li>
            <li>Współcześnie</li>
        </ul>
    </div>
    <button class='moveUp'><i class="fas fa-angle-double-up"></i></button>
        `;
    }
}