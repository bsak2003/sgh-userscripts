// ==UserScript==
// @name        WD Link Fix
// @namespace   bazik.xyz
// @match       *://dziekanat.sgh.waw.pl/*
// @grant       none
// @version     1.0
// @author      -
// @description 11/10/2022, 12:35:35 AM
// ==/UserScript==

declare function $(any: any) : any; // jQuery workaround?

const rplace = function(){
    $("ul.menu-prawe-1 li a.menu-prawe-link-1.terminy").off();
    let link = document.querySelector('ul.menu-prawe-1 li a.menu-prawe-link-1.terminy') as HTMLAnchorElement; // possible omission
    link.href = 'https://www.sgh.waw.pl/deklaracje-semestralne-studium-licencjackie';
    link.target = '_blank';
} 

rplace();