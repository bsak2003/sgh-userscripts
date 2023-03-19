import { usosCourseGroup } from '../../lib/usosCourseGroup';
import getWdSpan from '../../lib/wdSpan';

const insertRow = function (name : HTMLElement, element : HTMLElement) {
    const div = document.querySelector('#strona-srodek-wyszukiwarka-tabela-c12-div');
    const table = div?.querySelector('table');
  
    if (table != null){
        const row = table.insertRow();
  
        const nameCell = row.insertCell();
        const valueCell = row.insertCell();
      
        nameCell.style.textAlign = 'right';
      
        nameCell.appendChild(getWdSpan(name));
        valueCell.appendChild(element);
    }
  }
  
  const createGroupTable = function (groups : Array<usosCourseGroup>) {
    const border = '1px solid';
  
    const table = document.createElement('table'); table.style.border = border;
    const header = table.insertRow(); header.style.border = border;
  
    const groupIdHeader = header.insertCell(); groupIdHeader.style.border = border;
    groupIdHeader.innerText = 'Nr grupy';
  
    const locationHeader = header.insertCell(); locationHeader.style.border = border;
    locationHeader.innerText = 'Czas i lokalizacja';
  
    const amountHeader = header.insertCell(); amountHeader.style.border = border;
    amountHeader.innerText = 'Liczba zapisanych';
  
    const limitHeader = header.insertCell(); limitHeader.style.border = border;
    limitHeader.innerText = 'Limit grupy';
  
    groups.forEach(x => {
      let row = table.insertRow();
  
      let id = row.insertCell(); id.style.border = border;
      id.innerText = x.groupNo.toString();
  
      let location = row.insertCell(); location.style.border = border;
      location.innerText = x.comment;
  
      let amount = row.insertCell(); amount.style.border = border;
      amount.innerText = x.amount.toString();
  
      let limit = row.insertCell(); limit.style.border = border;
      limit.innerText = x.limit.toString();
    });
  
    const footer = table.insertRow();
  
    const groupIdFooter = footer.insertCell(); groupIdFooter.style.border = border;
    groupIdFooter.innerText = `łącznie #${groups.length}`;
  
    const locationFooter = footer.insertCell(); locationFooter.style.border = border;
    locationFooter.innerText = 'czas i lokalizacja';
  
    const amountFooter = footer.insertCell(); amountFooter.style.border = border;
    amountFooter.innerText = `łącznie ${groups.reduce((x, y) => x + y.amount, 0)}`;
  
    const limitFooter = footer.insertCell(); limitFooter.style.border = border;
    limitFooter.innerText = `łącznie ${groups.reduce((x, y) => x + y.limit, 0)}`;
  
    return table;
  }

export {createGroupTable, insertRow};