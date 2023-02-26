import { Teacher } from "./teacher";
import { Signature } from "./signature";
import { Form, parseForm } from "./form";
import { Room } from "./room";
import { Program } from "./program";

import descriptionElements from "./descriptionElements";

class Schedule {
    name: string;
    events: Array<ScheduleEvent>;

    constructor(name: string){
        this.name = name;
        this.events = new Array<ScheduleEvent>();
    }
}

class ScheduleEvent {
    title: string;
    start: Date;
    end: Date;
    description: ScheduleEventDescription;

    constructor(title: string, start: Date, end: Date, description: ScheduleEventDescription){
        this.title = title;
        this.start = start;
        this.end = end;
        this.description = description;
    }
};

class ScheduleEventDescription {
    name: string;
    teacher: Teacher;
    signature: Signature;
    form: Form;
    group: string;
    room: Room;
    program: Program;
    misc: Array<string>;

    constructor(name: string, teacher: Teacher, signature: Signature, form: Form, group: string, room: Room, program: Program, misc: Array<string>){
        this.name = name;
        this.teacher = teacher;
        this.signature = signature;
        this.form = form;
        this.group = group;
        this.room = room;
        this.program = program;
        this.misc = misc;
    }
}

const parseDescription = function(line: string) : ScheduleEventDescription {
    let lines = line.split('<br>');

    let properties = new Map<string, string>();
    let misc = new Array<string>();
    
    for(let str of lines){
        while(str.includes(': ')){
            let name = str.slice(0, str.indexOf(': '));
            let value = '';
            str = str.slice(str.indexOf(': ') + 2);
            
            if(str.includes(': ')){
                value = str.slice(0, str.lastIndexOf(', ', str.indexOf(': ')));
                str = str.slice(str.lastIndexOf(', ', str.indexOf(': ')) + 2);
            }
            else{
                value = str;
                str = '';
            }
    
            properties.set(name.trim(), value.trim());
        }
    
        if(str != '') misc.push(str.trim());
    }
    
    // TODO remove ! workaround
    let parsed = new ScheduleEventDescription(
        properties.get(descriptionElements.name)!,
        Teacher.parseTeacherFromWD(properties.get(descriptionElements.teacher)!),
        Signature.fromUsosSignature(properties.get(descriptionElements.signature)!),
        parseForm(properties.get(descriptionElements.form)!),
        properties.get(descriptionElements.group)!,
        Room.fromWd(properties.get(descriptionElements.room)!),
        new Program(),
        //Program.fromDescription(properties.get(descriptionElements.program)),
        misc
    );
    
    for(const element in descriptionElements){
        properties.delete(descriptionElements[element]);
    }
    for(const key of properties.keys()){
        parsed.misc.push(`${key}: ${properties.get(key)}`);
    }

    return parsed;
}

export { Schedule, ScheduleEvent, ScheduleEventDescription, parseDescription };