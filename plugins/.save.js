const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const { downloadMediaMessage } = require('../lib/msg2');
const fs = require("fs");

cmd({
    pattern: "vv",
    desc: "Get view once.",
    category: "owner",
    react: "👀",
    filename: __filename
}, async (conn, mek, m, { isReply, quoted, reply }) => {
    try {
        // Check if the message is a view once message
        if (m.message && m.message.viewOnceMessageV2) {
            const message = m.message.viewOnceMessageV2;  // Get the view once message

            // Download the media content from the view once message
            const mediaBuffer = await downloadMediaMessage(m, 'viewOnceMessageV2');
            let caption = '';

            // Set the appropriate caption based on the message type
            if (message.type === 'imageMessage') {
                caption = 'Here is your image';
            } else if (message.type === 'videoMessage') {
                caption = 'Here is your video';
            }

            // Forward the message to the user
            await conn.sendMessage(m.chat, { forward: { key: m.key } }, { quoted: m });

            // Send the media content to the user
            if (message.type === 'imageMessage') {
                await conn.sendMessage(m.chat, { image: mediaBuffer, caption }, { quoted: m });
            } else if (message.type === 'videoMessage') {
                await conn.sendMessage(m.chat, { video: mediaBuffer, caption }, { quoted: m });
            }
        }
    } catch (error) {
        console.error(error);
        reply('_An error occurred while processing the view once message._');
    }
});

cmd({
    pattern: "save",
    react: "📁",
    alias: ["store"],
    desc: "Save and send back a media file (image, video, or audio).",
    category: "owner",
    use: ".save <caption>",
    filename: __filename,
},
async (conn, mek, m, { quoted, q, reply }) => {
    try {
        if (!quoted) {
            return reply("❌ Reply to a media message (video, image, or audio) with the `.save` command.");
        }

        const messageType = quoted.mtype;
        let mediaType;

        // Determine the type of media
        if (/video/.test(messageType)) {
            mediaType = "video";
        } else if (/image/.test(messageType)) {
            mediaType = "image";
        } else if (/audio/.test(messageType)) {
            mediaType = "audio";
        } else {
            return reply("❌ Only video, image, or audio messages are supported.");
        }

        // Download and save the media file
        const mediaPath = await conn.downloadAndSaveMediaMessage(quoted);
        const filePath = mediaPath; // No need for 'path.resolve' in whiskeysockets

        // Send the saved media back
        const mediaMessage = {
            caption: q || '',
        };
        mediaMessage[mediaType] = { url: filePath };

        await conn.sendMessage(m.sender, mediaMessage, { quoted: mek });
        await reply("✅ Successfully saved and sent the media file.");
    } catch (error) {
        console.error(error);
        reply("❌ Failed to save and send the media. Please try again.");
    }
});
