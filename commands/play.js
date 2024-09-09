/*

  


*/
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require("../config.js");

const queueNames = [];
const requesters = new Map(); 

async function play(client, interaction) {
    try {
        const query = interaction.options.getString('name');

        if (!interaction.member.voice.channelId) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Voice Channel Required')
                .setDescription('❌ Bạn cần phải ở trong kênh thoại để sử dụng lệnh này.');

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        const player = client.riffy.createConnection({
            guildId: interaction.guildId,
            voiceChannel: interaction.member.voice.channelId,
            textChannel: interaction.channelId,
            deaf: true
        });

        await interaction.deferReply();

        const resolve = await client.riffy.resolve({ query: query, requester: interaction.user.username });
        //console.log('Resolve response:', resolve);

        if (!resolve || typeof resolve !== 'object') {
            throw new TypeError('Resolve response is not an object');
        }

        const { loadType, tracks, playlistInfo } = resolve;

        if (!Array.isArray(tracks)) {
            console.error('Expected tracks to be an array:', tracks);
            throw new TypeError('Expected tracks to be an array');
        }

        if (loadType === 'PLAYLIST_LOADED') {
            for (const track of tracks) {
                track.info.requester = interaction.user.username; 
                player.queue.add(track);
                queueNames.push(`[${track.info.title} - ${track.info.author}](${track.info.uri})`);
                requesters.set(track.info.uri, interaction.user.username); 
            }

            if (!player.playing && !player.paused) player.play();

        } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
            const track = tracks.shift();
            track.info.requester = interaction.user.username; 

            player.queue.add(track);
            queueNames.push(`[${track.info.title} - ${track.info.author}](${track.info.uri})`);
            requesters.set(track.info.uri, interaction.user.username); 

            if (!player.playing && !player.paused) player.play();
        } else {
            const errorEmbed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle('Error')
                .setDescription('❌ Không tìm thấy kết quả nào.');

            await interaction.editReply({ embeds: [errorEmbed] });
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        const embeds = [
            new EmbedBuilder()
                .setColor(config.embedColor)
                .setAuthor({
                    name: 'Request Update',
                    iconURL: config.CheckmarkIcon,
                    url: config.SupportServer
                })
                .setDescription('**➡️ Yêu cầu của bạn đã được xử lý thành công.**\nVui lòng sử dụng các nút để điều khiển phát lại**')
.setFooter({ text: '🎶 Thưởng thức âm nhạc của bạn!'}),setFooter({ text: '🎶 Thưởng thức âm nhạc của bạn!'}),

            new EmbedBuilder()
                .setColor(config.embedColor)
                .setAuthor({
                    name: 'Request Update',
                    iconURL: config.CheckmarkIcon,
                    url: config.SupportServer
                })
                .setDescription( '** 🔜Yêu cầu của bạn đã được xử lý thành công.**\n**➡️ Vui lòng sử dụng các nút để điều khiển phát lại**')
.setFooter({ text: '🎶 Thưởng thức âm nhạc của bạn!'}),setFooter({ text: '🎶 Thưởng thức âm nhạc của bạn!'}),
            new EmbedBuilder()
                .setColor(config.embedColor)
                .setAuthor({
                    name: 'Request Update',
                    iconURL: config.CheckmarkIcon,
                    url: config.SupportServer
                })
                .setColor(config.embedColor)
                .setAuthor({
                    name: 'Request Update',
                    iconURL: config.CheckmarkIcon,
                    url: config.SupportServer
                })
                .setDescription('**➡️ Your request has been successfully processed.**\n**➡️ Please use buttons to control playback**')
                 .setFooter({ text: '🎶 Enjoy your music!'}),

            new EmbedBuilder()
                .setColor(config.embedColor)
                .setAuthor({
                    name: 'Request Update',
                    iconURL: config.CheckmarkIcon,
                    url: config.SupportServer
                })
}

module.exports = {
    name: "play",
    description: "Phát một bài hát từ tên hoặc liên kết",
    permissions: "0x0000000000000800",
    options: [{
        name: 'name',
        description: 'Enter song name / link or playlist',
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    run: play,
    queueNames: queueNames,
    requesters: requesters 
};



/*

  

*/
