const config = require('../config');
const { cmd, commands } = require('../command');
const { sleep } = require('../lib/functions2');

// Archive command
cmd({
    pattern: "archive",
    desc: "Archive a chat",
    category: "chats",
    react: "📦",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        // Get the last message in the chat
        const lastMsgInChat = await conn.getLastMessageInChat(from);

        if (!lastMsgInChat) {
            return reply("❌ No messages to archive in this chat.");
        }

        // Archive the chat
        await conn.chatModify({
            archive: true,
            lastMessages: [lastMsgInChat]
        }, from);

        reply("📦 Chat archived successfully!");
    } catch (error) {
        reply(`❌ Error archiving chat: ${error.message}`);
    }
});

cmd({
    pattern: "clear",
    desc: "Clear a chat",
    category: "chats",
    react: "🧹",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    try {
        // Fetch recent messages in the chat
        const messages = await conn.getMessages(from, { limit: 10 }); // Adjust the limit as needed

        // Get the last message in the chat (if available)
        const lastMsgInChat = messages[0]; // The most recent message

        if (!lastMsgInChat) {
            return reply("❌ No messages to delete in this chat.");
        }

        // Delete the last message
        await conn.chatModify({
            delete: true,
            lastMessages: [{
                key: lastMsgInChat.key,
                messageTimestamp: lastMsgInChat.messageTimestamp
            }]
        }, from);

        reply("🧹 Last message cleared successfully!");
    } catch (error) {
        reply(`❌ Error clearing chat: ${error.message}`);
    }
});



