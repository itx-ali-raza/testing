const config = require('../config');
const { cmd, commands } = require('../command');
const { proto, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { sms,downloadMediaMessage } = require('../lib/msg');
const fs = require('fs');
const exec = require('child_process');
const path = require('path');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');
const ownerNumber = config.OWNER_NUMBER
const prefix = config.PREFIX

cmd({
    pattern: "vv2",
    desc: "Get view once to owner chat.",
    category: "owner",
    react: "👀",
    filename: __filename
}, async (conn, mek, m, { isReply, quoted, reply }) => {
    try {
        if (!m.quoted) return reply("Please reply to a view once message!");

        const qmessage = m.message.extendedTextMessage.contextInfo.quotedMessage;
        const mediaMessage = qmessage.imageMessage ||
                             qmessage.videoMessage ||
                             qmessage.audioMessage;

        if (!mediaMessage?.viewOnce) {
            return reply("_Not A VV message_");
        }

        try {
            const buff = await m.quoted.getbuff;
            const cap = mediaMessage.caption || '';

            if (mediaMessage.mimetype.startsWith('image')) {
                await conn.sendMessage(`${ownerNumber}@s.whatsapp.net`, {
                    image: buff,
                    caption: cap
                }); 
            } else if (mediaMessage.mimetype.startsWith('video')) {
                await conn.sendMessage(`${ownerNumber}@s.whatsapp.net`, {
                    video: buff,
                    caption: cap
                }); 
            } else if (mediaMessage.mimetype.startsWith('audio')) {
                await conn.sendMessage(`${ownerNumber}@s.whatsapp.net`, {
                    audio: buff,
                    ptt: mediaMessage.ptt || false
                }); 
            } else {
                return reply("_*Unknown/Unsupported media*_");
            }
        } catch (error) {
            console.error(error);
            reply(`${error}`);
        }
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "vv",
    desc: "Get view once.",
    category: "owner",
    react: "👀",
    filename: __filename
}, async (conn, mek, m, { isReply, quoted, reply }) => {
    try {
        // Check if the message is a view once message
        if (!m.quoted) return reply("Please reply to a view once message!");

        const qmessage = m.message.extendedTextMessage.contextInfo.quotedMessage;

            const mediaMessage = qmessage.imageMessage ||
                                qmessage.videoMessage ||
                                qmessage.audioMessage;

            if (!mediaMessage?.viewOnce) {
              return reply("_Not A VV message")
            }

            try {
            const buff = await m.quoted.getbuff
            const cap = mediaMessage.caption || '';

            if (mediaMessage.mimetype.startsWith('image')) {
                  await conn.sendMessage(m.chat, {
                  image: buff,
                 caption: cap
         }); 
            } else if (mediaMessage.mimetype.startsWith('video')) {
              await conn.sendMessage(m.chat, {
                  video: buff,
                 caption: cap
         }); 
            } else if (mediaMessage.mimetype.startsWith('audio')) {
              await conn.sendMessage(m.chat, {
                  audio: buff,
                  ptt: mediaMessage.ptt || false
         }); 
            } else {
              return reply("_*Unkown/Unsupported media*_");
        }
    } catch (error) {
        console.error(error);
        reply(`${error}`)
    }
} catch (e) {
  console.error(e);
        reply(`${e}`);
}
});
cmd({
    pattern: "save",
    desc: "Get status or media message.",
    category: "owner",
    react: "👀",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!quoted) return reply("Please reply to a media message!");

        try {
            const buff = await quoted.getbuff;
            const cap = quoted.msg.caption || '';

            if (quoted.type === 'imageMessage') {
                await conn.sendMessage(`${ownerNumber}@s.whatsapp.net`, {
                    image: buff,
                    caption: cap
                }); 
            } else if (quoted.type === 'videoMessage') {
                await conn.sendMessage(`${ownerNumber}@s.whatsapp.net`, {
                    video: buff,
                    caption: cap
                }); 
            } else if (quoted.type === 'audioMessage') {
                await conn.sendMessage(`${ownerNumber}@s.whatsapp.net`, {
                    audio: buff,
                    ptt: quoted.msg.ptt || false
                }); 
            } else {
                return reply("_*Unknown/Unsupported media*_");
            }
        } catch (error) {
            console.error(error);
            reply(`${error}`);
        }
    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});
