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


// Chat Pin command
cmd({
    pattern: "pin",
    desc: "Pin a Specific Chat",
    category: "chats",
    react: "📌",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        await conn.chatModify({ pin: true }, from);
        reply("📌 Chat pinned successfully!");
    } catch (e) {
      return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
  });

// Clear command
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

// Mark Read command
cmd({
    pattern: "markread",
    desc: "Mark a chat as read",
    category: "chats",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        await conn.chatModify({ markRead: true }, from);
        reply("✅ Chat marked as read!");
    } catch (error) {
        reply(`❌ Error marking chat as read: ${error.message}`);
    }
});

// Mark Unread command
cmd({
    pattern: "markunread",
    desc: "Mark a chat as unread",
    category: "chats",
    react: "🔔",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        await conn.chatModify({ markRead: false }, from);
        reply("🔔 Chat marked as unread!");
    } catch (error) {
        reply(`❌ Error marking chat as unread: ${error.message}`);
    }
});

cmd({
    pattern: "star",
    desc: "Star a Specific Message in a Chat",
    category: "owner",
    react: "⭐",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, args }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const messageId = args[0];
        await conn.chatModify({
            star: { messages: [{ id: messageId, fromMe: true, star: true }] }
        }, from);
        reply("⭐ Message starred!");
    } catch (e) {
      return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
  });


cmd({
    pattern: "unstar",
    desc: "Unstar a Specific Message in a Chat",
    category: "chats",
    react: "⭐",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply, args }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const messageId = args[0];
        await conn.chatModify({
            star: { messages: [{ id: messageId, fromMe: true, star: false }] }
        }, from);
        reply("⭐ Message unstarred!");
    } catch (e) {
      return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
  });

// Unarchive command
cmd({
    pattern: "unarchive",
    desc: "Unarchive a chat",
    category: "chats",
    react: "📂",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        await conn.chatModify({ archive: false }, from);
        reply("📂 Chat unarchived successfully!");
    } catch (error) {
        reply(`❌ Error unarchiving chat: ${error.message}`);
    }
});

// Unmute Chat command
cmd({
    pattern: "unmutechat",
    desc: "Unmute a chat",
    category: "chats",
    react: "🔊",
    filename: __filename
}, async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        await conn.chatModify({ mute: false }, from);
        reply("🔊 Chat unmuted successfully!");
    } catch (error) {
        reply(`❌ Error unmuting chat: ${error.message}`);
    }
});

// Unpin command

cmd({
    pattern: "unpin",
    desc: "Unpin a Specific Chat",
    category: "chats",
    react: "📌",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        await conn.chatModify({ pin: false }, from);
        reply("📌 Chat unpinned successfully!");
        } catch (e) {
      return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
  });
});
  
