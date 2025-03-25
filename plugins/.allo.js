const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "upt",
    alias: ["uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🕑",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `*_⏰️ ${runtime(process.uptime())}_*`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: "https://files.catbox.moe/2prjby.jpg"},  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '12036330616854073@newsletter',
                    newsletterName: 'Uptime',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in system command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
