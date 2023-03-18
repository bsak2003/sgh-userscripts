import { Building, Buildings } from "./building";

class Room {
    building: Building;
    room: string;

    toString() : string {
        return `SGH bud. ${this.building.id} ${this.room}`;
    }

    static fromWd(roomStr: string){
        let room = new Room();
        
        let roomId = roomStr.slice(0, roomStr.indexOf(' '));
        let building = Buildings.get(roomId);

        if(building != null){
            room.building = building;
        }else{
            room.building = {
                id: roomId
            } as Building;
        }


        room.room = roomStr.slice(roomStr.indexOf(' ') + 1);
        
        return room;
    }
}

export { Room }