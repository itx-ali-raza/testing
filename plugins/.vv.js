/*const config = require('../config');
const { cmd, commands } = require('../command');
const { sms,downloadMediaMessage } = require('../lib/msg2');
const fs = require('fs');
const exec = require('child_process');
const path = require('path');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');
const ownerNumber = [config.OWNER_NUMBER];
const prefix = config.PREFIX;

cmd({
    pattern: "vv3",
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
