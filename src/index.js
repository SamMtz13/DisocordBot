require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Función para cargar comandos desde subcarpetas
const loadCommands = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      loadCommands(filePath);
    } else if (file.endsWith('.js')) {
      const command = require(filePath);
      commands.set(command.name, command);
    }
  });
};

const commands = new Map();
loadCommands(path.join(__dirname, 'commands'));

client.on('interactionCreate', async (interaction) => {
  try {
    if (interaction.isCommand()) {
      const command = commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.callback(client, interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Hubo un error al ejecutar el comando.', ephemeral: true });
      }
    } else if (interaction.isButton()) {
      await interaction.deferReply({ ephemeral: true });

      const role = interaction.guild.roles.cache.get(interaction.customId);
      if (!role) {
        await interaction.editReply({
          content: "I couldn't find that role",
        });
        return;
      }

      const hasRole = interaction.member.roles.cache.has(role.id);
      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role.name} has been removed.`);
      } else {
        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role.name} has been added.`);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();

client.login(process.env.TOKEN);
