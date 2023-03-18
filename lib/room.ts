import { Building, Buildings } from "./building";

class Room {
    building: Building;
    room: string;

    constructor(building : Building, room: string){
        this.building = building;
        this.room = room;
    }

    toString() : string {
        return `SGH bud. ${this?.building?.id} ${this.room}`;
    }

    static fromWd(roomStr: string) : Room{
        let roomId = roomStr.slice(0, roomStr.indexOf(' '));
        let building = Buildings.get(roomId);

        if(building == null){
            building = {
                id: roomId
            } as Building;
        }

        let room = roomStr.slice(roomStr.indexOf(' ') + 1);
        
        return new Room(building, room);
    }
}

export { Room }