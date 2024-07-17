module.exports = {
    name: 'agregar',
    description: 'Suma dos números',
  
    callback: async (client, interaction) => {
      const num1 = interaction.options.getNumber('num1');
      const num2 = interaction.options.getNumber('num2');
      await interaction.reply(`La suma de ${num1} y ${num2} es ${num1 + num2}`);
    },
  };
  