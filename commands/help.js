/*


  _   _ _           _   _____             _    
 | \ | | |         | | |  __ \           | |   
 |  \| | |__   __ _| |_| |  | |_   _  ___| | __
 | . ` | '_ \ / _` | __| |  | | | | |/ __| |/ /
 | |\  | | | | (_| | |_| |__| | |_| | (__|   < 
 |_| \_|_| |_|\__,_|\__|_____/ \__,_|\___|_|\_\
                                               

╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║  ## Tạo bởi NhatDuck                                                   ║
║  ## Facebook : Nhật Duck                                               ║
║                                                                        ║
║                                                                        ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝


*/

const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

module.exports = {
  name: "help",
  description: "Nhận thông tin về bot",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {
      const botName = client.user.username; 

      const helpDescription = `
\`\`\`css
Welcome to ${botName}!

Người bạn đồng hành âm nhạc tuyệt vời của bạn trên Discord. Dưới đây là các lệnh có sẵn:

[ /play    ] - Bắt đầu phát bài hát.
[ /pause   ] - Tạm dừng bài hát hiện tại.
[ /resume  ] - Tiếp tục bài hát hiện tại.
[ /lyrics  ] - Hiển thị lời bài hát.
[ /skip    ] - Bỏ qua bài hát hiện tại.
[ /stop    ] - Hủy trình phát nhạc.
[ /np      ] - quên r :)) 
\`\`\`
      `;

      const embed = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(`${botName} Help`)
        .setThumbnail(client.user.displayAvatarURL()) 
        .setDescription(helpDescription)
        .setFooter({ text: `NhatDuckk v1.0`, iconURL: client.user.displayAvatarURL() }) 
      

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};


/*

  _   _ _           _   _____             _    
 | \ | | |         | | |  __ \           | |   
 |  \| | |__   __ _| |_| |  | |_   _  ___| | __
 | . ` | '_ \ / _` | __| |  | | | | |/ __| |/ /
 | |\  | | | | (_| | |_| |__| | |_| | (__|   < 
 |_| \_|_| |_|\__,_|\__|_____/ \__,_|\___|_|\_\
                                               

                                               
  
╔════════════════════════════════════════════════════════════════════════╗
║                                                                                     ║
║  ## Tạo bởi NhatDuck                                                                ║
║  ## Facebook: Nhật Duck                                                             ║
║                                                                                     ║
╚════════════════════════════════════════════════════════════════════════╝


*/
