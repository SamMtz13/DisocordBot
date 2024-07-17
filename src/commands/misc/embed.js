const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'embed',
  description: 'Envía un mensaje embebido',

  callback: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle('Este es un título')
      .setDescription('Este es un mensaje de prueba')
      .setColor('Random')
      .addFields(
        { name: 'Campo 1', value: 'Valor 1', inline: true },
        { name: 'Campo 2', value: 'Valor 2', inline: true }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  },
};
