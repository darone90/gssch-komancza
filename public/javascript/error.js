const url = window.location.href;
const p = document.querySelector('.errordescription');



const errorType = url.split('error/')[1];

if (errorType === 'databaseproblem-readannoucements-all') {
    p.innerText = `
        Wystąpił błąd wczytwyania ogłoszeń z bazy danych
        Może to być spowodowane jej chwilową niedostępnością 
        Prosimy spróbować za chwilę
        Jeśli błąd będzie się powtarzał prosimy o kontakt z moderatorem
    `
};

if (errorType === 'databaseproblem-readdocuments-all') {
    p.innerText = `
        Wystąpił błąd wczytwyania bazy dokumentów
        Może to być spowodowane jej chwilową niedostępnością 
        Prosimy spróbować za chwilę
        Jeśli błąd będzie się powtarzał prosimy o kontakt z moderatorem
    `
};

if (errorType === 'databaseproblem-readnews-all') {
    p.innerText = `
        Wystąpił błąd wczytwyania artykułów z bazy danych
        Może to być spowodowane jej chwilową niedostępnością 
        Prosimy spróbować za chwilę
        Jeśli błąd będzie się powtarzał prosimy o kontakt z moderatorem
    `
};

if (errorType === 'databaseproblem-readasso-all') {
    p.innerText = `
        Wystąpił błąd wczytwyania produktów z bazy danych
        Może to być spowodowane jej chwilową niedostępnością 
        Prosimy spróbować za chwilę
        Jeśli błąd będzie się powtarzał prosimy o kontakt z moderatorem
    `
};

if (errorType === 'databaseproblem-readmessage-all') {
    p.innerText = `
        Wystąpił błąd wczytwyania wiadomości z bazy danych
        Może to być spowodowane jej chwilową niedostępnością 
        Prosimy spróbować za chwilę
        Jeśli błąd będzie się powtarzał prosimy o kontakt z moderatorem
    `
};

if (errorType === 'databaseproblem-readannoucements-one') {
    p.innerText = `
        Wystąpił błąd wczytwyania ogłoszenia z bazy danych
        Prosimy sprawdzić połączenie i spróbować jeszcze raz
        W razie powtarzania się błędu skontaktuj się z moderatorem 
        
    `
};

if (errorType === 'databaseproblem-readnews-one') {
    p.innerText = `
        Wystąpił błąd wczytwyania artykułu  z bazy danych
        Prosimy sprawdzić połączenie i spróbować jeszcze raz
        W razie powtarzania się błędu skontaktuj się z moderatorem 
        
    `
};

if (errorType === 'databaseproblem-readasso-one') {
    p.innerText = `
        Wystąpił błąd wczytwyania produktu z bazy danych
        Prosimy sprawdzić połączenie i spróbować jeszcze raz
        W razie powtarzania się błędu skontaktuj się z moderatorem 
        
    `
};

if (errorType === 'databaseproblem-delete') {
    p.innerText = `
        Wystąpił błąd podczas próby usunięcia elementu
        Jest to najprawdopodobniej problem związany z bazą danych
        Ogłoszenie mogło nie zostać usniętę 
        Spróbuj powtórzyć operację za kilka minut 
        Jeśli problem będzie się powtarzał, skontaktuj się z moderatorem       
    `
}

if (errorType === 'diskproblem-delete') {
    p.innerText = `
        Nieoczekiwany błąd serwera przy próbie usnięcia załączników ogłoszenia
        Prosimy o kontakt z moderatorem       
    `
};

if (errorType === 'databaseproblem-archiving') {
    p.innerText = `
        Wystąpił problem przy próbie archiwizacji 
        Prawdopodobnie wystąpił problem z połączeniem lub chwilowo niedostępna jest baza danych
        Spróbuj ponownie za chwilę 
        Jeśli błąd będzie się powtarzał skontaktuj się z moderatorem     
    `
};

if (errorType === 'databaseproblem-editing') {
    p.innerText = `
        Wystąpił nieoczekiwany błąd w trakcie edycji zasobu
        Może to być spowodowane brakiem połączenia lub chwilowym problemem z bazą danych
        Spróbuj ponownie za chwilę 
        Jeśli błąd będzie się powtarzał skontaktuj sie z moderatorem  
    `
};

if (errorType === 'databaseproblem-overload') {
    p.innerText = `
        Przekroczono limit dostępnego miejsca na publikowane materiały
        Prosimy usunąć stare publikacje aby zwolnić dostępne miejsce
    `
};

if (errorType === 'databasediskproblem-removeattachement') {
    p.innerText = `
        W trakcie usuwania załącznika wystąpił nieoczekiwany błąd
        Prosimy spróbować za chwilę
        Gdyby problem się powtarzał prosimy o kontakt z moderatorem
    `;
};

if (errorType === 'databaseproblem-addingannoucemet') {
    p.innerText = `
        Wystąpił błąd w trakcie dodawania ogłoszenie
        Sprawdź połączenie z internetem
        Jeśli połączenie działa spróbuj za kilka minut
        Jeśli błąd będzie się powtarzał skontaktuj się z moderatorem
    `;
};

if (errorType === 'databaseproblem-addingproduct') {
    p.innerText = `
        Wystąpił błąd w trakcie dodawania produktu
        Sprawdź połączenie z internetem
        Jeśli połączenie działa spróbuj za kilka minut
        Jeśli błąd będzie się powtarzał skontaktuj się z moderatorem
    `;
};

if (errorType === 'databaseproblem-unreadtoread') {
    p.innerText = `
        Wystąpił błąd w trakcie zmiany statusu wiadomości
        Sprawdź połączenie z internetem
        Jeśli połączenie działa spróbuj za kilka minut
        Jeśli błąd będzie się powtarzał skontaktuj się z moderatorem
    `;
};

if (errorType === 'databaseproblem-addingdocument') {
    p.innerText = `
        Wystąpił błąd w trakcie dodawania dokumentu
        Sprawdź połączenie z internetem
        Jeśli połączenie działa spróbuj za kilka minut
        Jeśli błąd będzie się powtarzał skontaktuj się z moderatorem
    `;
};

if (errorType === 'readingcounterproblem') {
    p.innerText = `
        Wystąpił problem z odczytem wolnych udostępnionych zasobów dysku
        Spróbuj ponownie wykonać operację 
        Jeśli błąd się powtórzy skontaktuj się z moderatorem
    `;
};

if (errorType === 'errorlog-problem-read') {
    p.innerText = `
        Wystąpił problem z wczytaniem katalogu błędów
    `;
};

if (errorType === 'error-outofpermission') {
    p.innerText = `
        Niestety nie posiadasz uprawnień dostępu do tej treści,
        aby uzyskać uprawnienia skontaktuj się z moderatorem strony
    `;
};


if (errorType === 'newuser-samename') {
    p.innerText = `
        Wygląda na to że uzytkownik o takiej nazwie już istnieje w bazie,
        Proszę wybrać inną nazwę użytkownika
    `;
};

if (errorType === 'userslist-download-problem') {
    p.innerText = `
        Problem z pobraniem listy użytkowników
    `;
};

if (errorType === 'user-confirmation-problem') {
    p.innerText = `
        Wystąpił problem autoryzacji. Upewnij się że podane zostało właściwe hasło.
        Ponowna autoryzacja została wprowadzona dla zwiększenia bezpieczeństwa,
        jeśli nie jesteś włascicielem tego konta wyloguj się. 
    `;
};


if (errorType === 'userlist-load-problem') {
    p.innerText = `
        Wystąpił błąd wczytywania listy użytkowników,
        Spróbuj za chwilę, jeśli problem się powtórzy, 
        skontaktuj się z administratorem.
    `;
};

if (errorType === 'errorlog-clearing-problem') {
    p.innerText = `
        Wystąpił błąd podczas czyszczenia logu błędów,
        Skontaktuj się z administratorem
    `;
};
