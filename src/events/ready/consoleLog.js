const { ActivityType } = require('discord.js');

let status = [
    {
        name: 'a los usuarios',
        type: ActivityType.Watching,
    },
    {
        name: 'a TimelyGymnast6 en Twitch',
        type: ActivityType.Streaming,
        url: 'https://www.twitch.tv/timelygymnast6'
    },
    
];

module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}`);
    setInterval(() => {
        let randomStatus = status[Math.floor(Math.random() * status.length)];
        let activityOptions = { type: randomStatus.type || ActivityType.Playing }; 
        if (randomStatus.url) {
            activityOptions.url = randomStatus.url;
        }
        client.user.setActivity(randomStatus.name, activityOptions);
    }, 10000);
};
    