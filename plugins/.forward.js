
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { cmd } = require('../command');
const axios = require('axios');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');

const imgmsg = 'Reply to a photo for sticker!'; // Default message when no image or sticker is found.
const descg = 'It converts your replied photo to a sticker.'; // Description of the command.

cmd(
    {
    pattern: "round",
    alias: ["r"],
    desc: "Change image to round sticker.",
    category: "sticker",
    use: ".roundsticker <Reply to image>",
    filename: __filename
}, async (conn, mek, m, { from, reply, isCmd, command, args, q, isGroup, pushname }) => {
    try {
        const isQuotedImage = m.quoted && (m.quoted.type === 'imageMessage' || (m.quoted.type === 'viewOnceMessage' && m.quoted.msg.type === 'imageMessage'));
        const isQuotedSticker = m.quoted && m.quoted.type === 'stickerMessage';

        if ((m.type === 'imageMessage') || isQuotedImage) {
            const nameJpg = getRandom('.jpg');
            const imageBuffer = isQuotedImage ? await m.quoted.download() : await m.download();
            await fs.promises.writeFile(nameJpg, imageBuffer);

            let sticker = new Sticker(nameJpg, {
                pack: global.botname, // Use global.botname for the sticker pack
                author: global.devsname || 'Hacker Only_🥇Empire', // Use global.devsname for the author
                type: StickerTypes.ROUND, // Round sticker type
                categories: ['🤩', '🎉'], // Sticker categories
                id: '12345', // Sticker id
                quality: 75, // Quality of the sticker
                background: 'transparent', // Transparent background for round stickers
            });

            const buffer = await sticker.toBuffer();
            return conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
        } else if (isQuotedSticker) {
            const nameWebp = getRandom('.webp');
            const stickerBuffer = await m.quoted.download();
            await fs.promises.writeFile(nameWebp, stickerBuffer);

            let sticker = new Sticker(nameWebp, {
                pack: global.botname, // Use global.botname for the sticker pack
                author: global.devsname || 'Hacker Only_🥇Empire', // Use global.devsname for the author
                type: StickerTypes.ROUND, // Round sticker type
                categories: ['🤩', '🎉'], // Sticker categories
                id: '12345', // Sticker id
                quality: 75, // Quality of the sticker
                background: 'transparent', // Transparent background for round stickers
            });

            const buffer = await sticker.toBuffer();
            return conn.sendMessage(from, { sticker: buffer }, { quoted: mek });
        } else {
            return await reply(imgmsg); // Return the default message if no image or sticker is found.
        }
    } catch (e) {
        reply('Error !!');
        console.error(e);
    }
});
