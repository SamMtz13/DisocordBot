require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

let status=
[
    {
        name: 'a los usuarios',
        type: ActivityType.Watching,
        

    }
    ,
    {
        name: 'a TimelyGymnast6',
        type: ActivityType.Streaming,
        url:'https://www.twitch.tv/timelygymnast6'
    },
    {
        name: 'que chingue a su madre Gistropher'
    }
]
client.on('ready', (c) => {
    console.log(`${c.user.tag} está conectado.`);

    setInterval(() => {
        let randomStatus = status[Math.floor(Math.random() * status.length)];
        client.user.setActivity(randomStatus.name, { type: randomStatus.type, url: randomStatus.url });

        
    }, 10000);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'hola' || interaction.commandName === 'ola') {
        await interaction.reply('Hola, ¿cómo estás?');
    }

    if (interaction.commandName === 'ping') {
        const sent = await interaction.reply({ content: 'Calculando latencia...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        await interaction.editReply(`Pong! Latencia del bot: ${latency}ms. Latencia de la API: ${Math.round(client.ws.ping)}ms.`);
    }

    if (interaction.commandName === 'agregar') {
        const num1 = interaction.options.getNumber('num1');
        const num2 = interaction.options.getNumber('num2');
        await interaction.reply(`La suma de ${num1} y ${num2} es ${num1 + num2}`);
    }

    if (interaction.commandName === 'restar') {
        const num1 = interaction.options.getNumber('num1');
        const num2 = interaction.options.getNumber('num2');
        await interaction.reply(`La resta de ${num1} y ${num2} es ${num1 - num2}`);
    }

    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Este es un título')
            .setDescription('Este es un mensaje de prueba')
            .setColor('Random')
            .addFields({
                name: 'Campo 1',
                value: 'Valor 1',
                inline: true,
            },
            {
                name: 'Campo 2',
                value: 'Valor 2',
                inline: true,
            })
            .setTimestamp();
        await interaction.reply({ embeds: [embed] });
        
    }
});

client.on('messageCreate', (message) => {
    if (message.content === 'embed')
    {
        const embed = new EmbedBuilder()
            .setTitle('Este es un título')
            .setDescription('Este es un mensaje de prueba')
            .setColor('Random')
            .addFields({
                name: 'Campo 1',
                value: 'Valor 1',
                inline: true,
            },
            {
                name: 'Campo 2',
                value: 'Valor 2',
                inline: true,
            })
            .setTimestamp();
        message.channel.send({ embeds: [embed] });
    }
    }
);

client.on('interactionCreate', async (interaction) => {
    try {
            if (!interaction.isButton()) return;
        await interaction.deferReply({ ephemeral: true });

        const role = interaction.guild.roles.cache.get(interaction.customId);

        if(!role)
        {
            interaction.editReplyeply(
                {
                    content: 'El rol no existe',
                    ephemeral: true
                });
            return;
        }

        const tieneRol= interaction.member.roles.cache.has(role.id);

        if(tieneRol)
        {
            await interaction.member.roles.remove(role);

            await interaction.editReply(
                {
                    content: `Se ha eliminado el rol ${role.name}`,
                    ephemeral: true
                });
        }
        else
        {
            await interaction.member.roles.add(role);

            await interaction.editReply(
                {
                    content: `Se ha agregado el rol ${role.name}`,
                    ephemeral: true
                });
        }
    
    } catch (error) {
        console.log(error);
    }

}
);

client.login(process.env.TOKEN);
