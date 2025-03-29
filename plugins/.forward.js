const config = require("../config");
const fs = require("fs");
const path = require("path");
const { cmd } = require("../command");

cmd(
    {
        pattern: "pingg",
        react: "♻️",
        alias: ["speed"],
        desc: "Check bot's ping and send a voice message with vCard",
        category: "main",
        use: ".ping",
        filename: __filename,
    },
    async (conn, mek, m, { from, quoted, reply }) => {
        try {
            const start = new Date().getTime();

        const reactionEmojis = ['🔥', '🔮', '🌩️', '👻', '🍁', '🐍', '🎋', '🎐', '🪸', '📍', '👑', '🌀', '🪄'];
        const textEmojis = ['🪀', '🪂', '⚡️', '🚀', '🏎️', '🚁', '🌀', '📟', '🎲', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction using conn.sendMessage()
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });
            // Start ping measurement
            const startTime = Date.now();
            await conn.sendMessage(from, { text: "> pinning from express server" });
            const endTime = Date.now();
            const ping = endTime - startTime;

            // Ping response
            await conn.sendMessage(
                from,
                { text: ` *${reactionEmoji} : ${ping}ms*` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
