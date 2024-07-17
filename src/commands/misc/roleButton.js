module.exports = {
    name: 'roleButton',
    description: 'Gestiona roles mediante botones',
  
    callback: async (client, interaction) => {
      try {
        if (!interaction.isButton()) return;
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
      } catch (error) {
        console.log(error);
      }
    },
  };
  