module.exports = {
    name: 'ola',
    description: 'Responde con un saludo',
  
    callback: async (client, interaction) => {
      await interaction.reply('Hola, ¿cómo estás?');
    },
  };
  