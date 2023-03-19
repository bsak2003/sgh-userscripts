import { wdCourseData, getDataFromWD } from "../../lib/wdCourseData";
import { Teacher } from "../../lib/teacher";
import { fetchCycleId, fetchGroups } from "../../lib/usosClient";
import getWdSpan from "../../lib/wdSpan";
import { getElementFromString } from "../../lib/wdSpan";
import { createGroupTable, insertRow } from "./wdTable";

const revealUsosData = function () {
  const wd = getDataFromWD();
  const teacher = Teacher.parseTeacherFromWD(wd.teacher);

  fetchCycleId(wd).then((cycleId) => {
    if (cycleId == null) throw new Error();
    fetchGroups(cycleId, teacher.usosName()).then((groups) => {
      let div = document.querySelector("#usosData");
      if (groups.length > 0) {
        let table = getWdSpan(createGroupTable(groups));
        table.style.display = "none";
        div?.appendChild(table);
      } else {
        let span = getWdSpan(
          getElementFromString("Brak grup w poprzednim cyklu akademickim.")
        );
        span.style.display = "none";
        div?.appendChild(span);
      }
    });
  });
};

if (
  document.location
    .toString()
    .startsWith("https://dziekanat.sgh.waw.pl/wp2_liczebnosci.php?")
) {
  let div = document.createElement("div");
  div.id = "usosData";

  let button = document.createElement("button");
  button.onclick = function () {
    let usosData = document.querySelector("#usosData");
    let span = usosData?.querySelector("span");
    let button = usosData?.querySelector("button");
    if (span != null) span.style.display = "block";
    if (button != null) button.style.display = "none";
  };
  button.innerText = "USOS";

  div.appendChild(button);

  insertRow(getElementFromString("Dane z USOS-a (ubiegły cykl)"), div);

  revealUsosData();
}
