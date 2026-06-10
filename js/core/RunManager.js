import { Ages } from "../data/ages.js";
import { generateRooms } from "../data/rooms.js";

export default class RunManager {

    constructor() {

        this.age = Ages.goblins;

        this.rooms = generateRooms(this.age);

        this.roomIndex = 0;
    }

    getCurrentRoom() {
        return this.rooms[this.roomIndex];
    }

    nextRoom() {

        if (this.roomIndex < this.rooms.length - 1) {
            this.roomIndex++;
        }
    }
}