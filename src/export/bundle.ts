import {
  Schedule,
  ScheduleEvent,
  ScheduleEventDescription,
  parseDescription as parser,
} from "~/lib/schedule";
import IcsExport from "./iCalendar";

declare var json: Timetable[];

const buttons = document.querySelector("#opcje");

if (buttons != null) {
  const timetable: Timetable[] = json;
  const button = document.createElement("input");

  button.classList.add("wd-button");
  button.type = "button";
  button.value = "Eksport (iCalendar)";

  button.addEventListener("click", () => {
    const schedule: Schedule = new Schedule("Bazik's Test Schedule");

    for (const element of timetable) {
      schedule.events.push(
        new ScheduleEvent(
          element.title,
          new Date(Date.parse(element.start)),
          new Date(Date.parse(element.end)),
          parser(element.description)
        )
      );
    }

    const calendar = new IcsExport();
    calendar.fromSchedule(schedule);

    let events = calendar.createEvents();
    let file = new File([events], "schedule.ics", { type: "plain/text" });
    let url = URL.createObjectURL(file);

    // trying to assign the file URL to a window could cause cross-site
    // issues so this is a workaround using HTML5
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "schedule.ics";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  });

  buttons.append(" ", button);
}
