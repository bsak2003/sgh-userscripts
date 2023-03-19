import * as ics from "ics";
import { EventAttributes } from "ics";
import { Schedule } from "~/lib/schedule";
import fs from "fs";

class IcsExport {
  icsEvents: Array<EventAttributes> = new Array<EventAttributes>();

  constructor() {}

  fromSchedule(schedule: Schedule) {
    for (const event of schedule.events) {
      const ics: EventAttributes = {
        title: `[${event.description.form}]  ${event.title} (${event.description.room.building.id} ${event.description.room.room})`,
        start: [
          event.start.getFullYear(),
          event.start.getMonth() + 1,
          event.start.getDate(),
          event.start.getHours(),
          event.start.getMinutes(),
        ],
        end: [
          event.end.getFullYear(),
          event.end.getMonth() + 1,
          event.end.getDate(),
          event.end.getHours(),
          event.end.getMinutes(),
        ],
        location: `${event.description.room.building.address} (SGH)`,
        //organizer: { name: event.description.teacher.usosName() }, probably the culprit
        geo: {
          lat: event.description.room.building.lat,
          lon: event.description.room.building.lng,
        },
        description: `${event.description.room.toString()}\n${event.description.teacher.toString()}\nGrupa nr ${
          event.description.group
        }`,
      };

      this.icsEvents.push(ics);
    }
  }

  createEvents(): string {
    const { error, value } = ics.createEvents(this.icsEvents);

    if (error) {
      console.log(error);
      throw new Error();
    }

    return value!;
  }
}

export default IcsExport;
