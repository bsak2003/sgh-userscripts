import { wdCourseData, getDataFromWD } from "../lib/wdCourseData";
import { Teacher } from './teacher';
import { fetchCycleId, fetchGroups } from '../lib/usosClient';
import getWdSpan from '../lib/wdSpan';
import { createGroupTable } from '../lib/wdTable';

const revealUsosData = function () {
    const wd = getDataFromWD();
    const teacher = Teacher.parseTeacherFromWD(wd.teacher);
  
    fetchCycleId(wd).then((cycleId) => {
      fetchGroups(cycleId, teacher.usosName()).then((groups) => {
        let div = document.querySelector('#usosData');
        if (groups.length > 0) {
          let table = getWdSpan(createGroupTable(groups));
          table.style.display = 'none';
          div?.appendChild(table);
        } else {
          let span = getWdSpan('Brak grup w poprzednim cyklu akademickim.');
          span.style.display = 'none';
          div?.appendChild(span)
        }
      });
    });
  }

/* requires user.js

// ==UserScript==
// @name        WD-USOS Bridge
// @namespace   bazik.xyz
// @match       *://dziekanat.sgh.waw.pl/*
// @grant       GM.xmlhttpRequest
// @grant       GM_xmlhttpRequest
// @version     1.0
// @author      -
// @description 11/10/2022, 12:35:35 AM
// @require <OUTPUT>
// ==/UserScript==


if (document.location.toString().startsWith('https://dziekanat.sgh.waw.pl/wp2_liczebnosci.php?')) {
  let div = document.createElement('div');
  div.id = 'usosData';

  let button = document.createElement('button');
  button.onclick = function () { let usosData = document.querySelector('#usosData'); usosData.querySelector('span').style.display = 'block'; usosData.querySelector('button').style.display = 'none' };
  button.innerText = 'USOS';

  div.appendChild(button);

  insertRow('Dane z USOS-a (ubiegły cykl)', div);

  revealUsosData();
}

*/