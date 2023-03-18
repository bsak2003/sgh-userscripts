declare function $(any: any) : any; // jQuery workaround?

const rplace = function(){
    $("ul.menu-prawe-1 li a.menu-prawe-link-1.terminy").off();
    let link = document.querySelector('ul.menu-prawe-1 li a.menu-prawe-link-1.terminy') as HTMLAnchorElement; // possible omission
    link.href = 'https://www.sgh.waw.pl/deklaracje-semestralne-studium-licencjackie';
    link.target = '_blank';
} 