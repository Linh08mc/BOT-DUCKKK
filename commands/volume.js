const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function volume(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);
        const volume = interaction.options.getInteger('level');

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ Không tìm thấy người chơi đang hoạt động.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        if (volume < 0 || volume > 100) {
            return interaction.reply({ content: 'Mức âm lượng phải nằm trong khoảng từ 0 đến 100.', ephemeral: true });
        }

        player.setVolume(volume);

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)Âm lượng đã được thiết lập thành
            .setDescription(`🔊 Âm lượng đã được thiết lập thành **${volume}%**`);

        return interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error setting volume:', error);
        await interaction.reply({ content: 'An error occurred while setting the volume.', ephemeral: true });
    }
}

module.exports = {
    name: "volume",
    description: "Đặt âm lượng của bài hát hiện tại",
    permissions: "0x0000000000000800",
    options: [{
        name: 'level',
        description: 'Cấp độ âm lượng (0-100)',
        type: ApplicationCommandOptionType.Integer,
        required: true
    }],
    run: volume
};
