

const config = require('../config');
const {cmd , commands} = require('../command')

cmd({
    pattern: "logo",
    alias: ["logomenu"],
    react: "🕸️",
    desc: "get name logo",
    category: "logo",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let madeMenu = `‎*╭───❍「 LOGO 𝖫𝖨𝖲𝖳 」❍*
‎*├⬡ .ɴᴇᴏɴʟɪɢʜᴛ*
‎*├⬡ .ʙʟᴀᴄᴋᴘɪɴᴋ*
‎*├⬡ .ᴅʀᴀɢᴏɴʙᴀʟʟ*
‎*├⬡ .𝟹ᴅᴄᴏᴍɪᴄ*
‎*├⬡ .ᴀᴍᴇʀɪᴄᴀ*
‎*├⬡ .ɴᴀʀᴜᴛᴏ*
‎*├⬡ .sᴀᴅɢɪʀʟ*
‎*├⬡ .ᴄʟᴏᴜᴅs*
‎*├⬡ .ғᴜᴛᴜʀɪsᴛɪᴄ*
‎*├⬡ .𝟹ᴅᴘᴀᴘᴇʀ*
‎*├⬡ .ᴇʀᴀsᴇʀ*
‎*├⬡ .sᴜɴsᴇᴛ*
‎*├⬡ .ʟᴇᴀғ*
‎*├⬡ .ɢᴀʟᴀxʏ*
‎*├⬡ .sᴀɴs*
‎*├⬡ .ʙᴏᴏᴍ*
‎*├⬡ .ʜᴀᴄᴋᴇʀ*
‎*├⬡ .ᴅᴇᴠɪʟᴡɪɴɢs*
‎*├⬡ .ɴɪɢᴇʀɪᴀ*
‎*├⬡ .ʙᴜʟʙ*
‎*├⬡ .ᴀɴɢᴇʟᴡɪɴɢs*
‎*├⬡ .ᴢᴏᴅɪᴀᴄ*
‎*├⬡ .ʟᴜxᴜʀʏ*
‎*├⬡ .ᴘᴀɪɴᴛ*
‎*├⬡ .ғʀᴏᴢᴇɴ*
‎*├⬡ .ᴄᴀsᴛʟᴇ*
‎*├⬡ .ᴛᴀᴛᴏᴏ*
‎*├⬡ .ᴠᴀʟᴏʀᴀɴᴛ*
‎*├⬡ .ʙᴇᴀʀ*
‎*├⬡ .ᴛʏᴘᴏɢʀᴀᴘʜʏ*
‎*├⬡ .ʙɪʀᴛʜᴅᴀʏ*
‎*╰───────────────❍*`;

await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/bddvfr.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363318387454868@newsletter',
                        newsletterName: "𝐀ɭīī 𝐌Ɗ 𝐒ʊ̊𝐏𝐏๏፝֟ɼʈ⎯꯭̽🪼🧸₊",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
