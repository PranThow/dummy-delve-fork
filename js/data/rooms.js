export function generateRooms(age) {

    const rooms = [];

    for (let i = 0; i < age.roomCount - 1; i++) {

        rooms.push({
            type: "combat",
            enemy: age.enemies[
                Math.floor(
                    Math.random() * age.enemies.length
                )
            ]
        });
    }

    rooms.push({
        type: "boss",
        enemy: age.boss
    });

    return rooms;
}