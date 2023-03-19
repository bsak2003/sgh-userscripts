/* broken
import { Schedule, ScheduleEvent, ScheduleEventDescription, parseDescription as parser } from "~/lib/schedule";
import * as timetable from './timetable.json';
import IcsExport from "./iCalendar";

const schedule : Schedule = new Schedule('Bazik\'s Test Schedule');

for(const element of timetable){
    schedule.events.push(new ScheduleEvent(
        element.title,
        new Date(Date.parse(element.start)),
        new Date(Date.parse(element.end)),
        parser(element.description)
    ));
}

const calendar = new IcsExport();
calendar.fromSchedule(schedule);
calendar.createEvents();
*/
