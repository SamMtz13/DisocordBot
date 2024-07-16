require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id: '1022994581496799252',
        label: 'ENTRE MAS ME LA MAMAS MAS ME CRECE'
    },
    {
        id: '1017918754128154624',
        label: 'Admin'
    }
];

client.on('ready', async () => {
    try {
        const channel = await client.channels.fetch('1262630928984051855');
        if (!channel) return;

        const row = new ActionRowBuilder();
        roles.forEach(role => {
            const button = new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle(ButtonStyle.Danger);
            row.addComponents(button);
        });

        await channel.send({ content: 'Selecciona tu rol', components: [row] });
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);
