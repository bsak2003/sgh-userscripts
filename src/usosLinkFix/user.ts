// ==UserScript==
// @name        USOSweb HTML plan link fix
// @namespace   bazik.xyz
// @match       *://usosweb.*/*
// @grant       none
// @version     1.0
// @author      -
// @description	Change annyoing document.location="" redirects into standard <a href=""> links in USOSweb HTML timetable
// ==/UserScript==

const extractUrl = function (onClick: any) {
  //any workaround?
  let fxStr = onClick.toString();
  let url = fxStr.slice(fxStr.indexOf("http"), fxStr.lastIndexOf('"')); // is that perfect? acceptable.
  return url;
};

const addLink = function (node: HTMLElement) {
  let link = document.createElement("a");
  link.href = extractUrl(node.onclick);

  node.onclick = null;
  node.style.cursor = "auto";

  Array.from(node.childNodes).forEach((x) => {
    link.appendChild(x);
  });

  node.appendChild(link);
};

const getAllNodes = function () {
  return document.querySelectorAll('[onclick^="document.location"]');
};

const redirectToHtml = function () {
  if (!document.querySelector('a[href$="plan_format=gif"]')) {
    const urlParams = new URLSearchParams(window.location.search);
    const planFormat = urlParams.get("plan_format");
    if (planFormat != "html") {
      urlParams.set("plan_format", "html");
      window.location.search = `?${urlParams.toString()}`;
    }
  }
};

if (document.location.toString().includes("plan")) {
  if (document.querySelector('a[href$="plan_format=gif"]')) {
    let classes = getAllNodes();
    classes.forEach((x) => {
      addLink(x as HTMLElement); // omission
    });
  }
}
