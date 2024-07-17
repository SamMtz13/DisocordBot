const { ActivityType } = require('discord.js');

let status = [
    {
        name: 'a los usuarios',
        type: ActivityType.Watching,
    },
    {
        name: 'a Don Pendejo',
        type: ActivityType.Streaming,
        url: 'https://www.twitch.tv/timelygymnast6'
    },
    {
        name: 'que chingue a su madre Gistropher',
        type: ActivityType.Playing, // Añadido un tipo por defecto
    }
];

module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}`);
    setInterval(() => {
        let randomStatus = status[Math.floor(Math.random() * status.length)];
        let activityOptions = { type: randomStatus.type || ActivityType.Playing }; // Añade un tipo por defecto
        if (randomStatus.url) {
            activityOptions.url = randomStatus.url;
        }
        client.user.setActivity(randomStatus.name, activityOptions);
    }, 10000);
};
    