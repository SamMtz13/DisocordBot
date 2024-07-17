const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

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

module.exports = {
    name: 'rolebutton',
    description: 'Gestiona roles mediante botones',

    callback: async (client, interaction) => {
        try {
            if (interaction.isButton()) {
                await interaction.deferReply({ ephemeral: true });

                const role = interaction.guild.roles.cache.get(interaction.customId);

                if (!role) {
                    await interaction.editReply({
                        content: 'El rol no existe',
                        ephemeral: true,
                    });
                    return;
                }

                const tieneRol = interaction.member.roles.cache.has(role.id);

                if (tieneRol) {
                    await interaction.member.roles.remove(role);
                    await interaction.editReply({
                        content: `Se ha eliminado el rol ${role.name}`,
                        ephemeral: true,
                    });
                } else {
                    await interaction.member.roles.add(role);
                    await interaction.editReply({
                        content: `Se ha agregado el rol ${role.name}`,
                        ephemeral: true,
                    });
                }
            } else if (interaction.isCommand() && interaction.commandName === 'rolebutton') {
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
            }
        } catch (error) {
            console.log(error);
        }
    },
};
