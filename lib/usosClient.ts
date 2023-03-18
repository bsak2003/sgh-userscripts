import { usosCourseGroup } from './usosCourseGroup';
import htmlRequest from './htmlRequest';
import { wdCourseData } from './wdCourseData';

const fetchCycleId = function (wd : wdCourseData) {
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
  
  const fetchGroups = function (cycleId : string, teacher : string) {
    const url = `https://usosweb.sgh.waw.pl/kontroler.php?_action=katalog2/przedmioty/pokazGrupyZajec&zaj_cyk_id=${cycleId}`;
    let xhr = htmlRequest(url).then((html) => {
      const groups : Array<any> = []; // bad type
      let item : Element; // bad type

      const xpath = html.evaluate(`//table[contains(., "Grupa")]//td[contains(., "${teacher}")]`, html);
      while (item = xpath.iterateNext() as Element) {
        let text = item?.nextElementSibling?.textContent?.trim();
        let data = text?.split("/") as Array<string>; // type assumption?
        let comment = item?.previousElementSibling?.textContent?.trim().split("\n") as Array<string>;
  
        groups.push(new usosCourseGroup(
          parseInt(data[0]),
          parseInt(data[1]),
          comment.map(x => x.trim()).join(' '),
          parseInt(item?.previousElementSibling?.previousElementSibling?.textContent?.trim() as string)
        ));
      }
  
      return groups;
    });
  
    return xhr;
  }

export { fetchCycleId, fetchGroups };