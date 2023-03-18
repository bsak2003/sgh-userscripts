import htmlRequest from './htmlRequest';
import { wdCourseData } from './wdCourseData';

const fetchCycleId = function (wd) {
    const url = `https://usosweb.sgh.waw.pl/kontroler.php?_action=katalog2/przedmioty/pokazPrzedmiot&prz_kod=${wd.usosSignature()}`;
    let xhr = htmlRequest(url).then((html) => {
      const xpath = html.evaluate(`//usos-frame[contains(., "${wdCourseData.serializeAcademicCycle(wd.previousCycle())}")]//td[contains(., "Typ zajęć:")]`, html);
      const item : any = xpath.iterateNext(); // bad type
      const query = item.nextElementSibling.lastElementChild.querySelector('a').href;
      const urlSearchParams = new URLSearchParams(query);
      let cycleId = urlSearchParams.get('zaj_cyk_id');
  
      return cycleId;
    });
  
    return xhr;
  }
  
  const fetchGroups = function (cycleId, teacher) {
    const url = `https://usosweb.sgh.waw.pl/kontroler.php?_action=katalog2/przedmioty/pokazGrupyZajec&zaj_cyk_id=${cycleId}`;
    let xhr = htmlRequest(url).then((html) => {
      const groups : Array<any> = []; // bad type
      let item : any = {}; // bad type

      const xpath = html.evaluate(`//table[contains(., "Grupa")]//td[contains(., "${teacher}")]`, html);
      while (item = xpath.iterateNext()) {
        let text = item.nextElementSibling.innerText.trim();
        let data = text.split("/");
        let comment = item.previousElementSibling.innerText.trim().split("\n");
  
        groups.push({
          amount: parseInt(data[0]),
          limit: parseInt(data[1]),
          comment: comment.map(x => x.trim()).join(' '),
          groupNo: parseInt(item.previousElementSibling.previousElementSibling.innerText.trim())
        });
      }
  
      return groups;
    });
  
    return xhr;
  }

export { fetchCycleId, fetchGroups };