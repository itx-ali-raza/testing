const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions2'); // Ensure runtime is imported
const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process'); // Import exec for executing system commands
const simpleGit = require('simple-git');
const git = simpleGit();

cmd({
    pattern: "setprefix",
    alias: ["prefix"],
    desc: "Update the bot command prefix",
    category: "misc",
    react: "🔧",
    filename: __filename
}, async (conn, mek, m, { args, reply, isOwner, config }) => {
    if (!isOwner) return reply("❌ You are not authorized to use this command.");
    const newPrefix = args[0];
    if (!newPrefix || newPrefix.length > 5) {
        return reply(`❌ Invalid prefix. Please provide a valid prefix (1-5 characters). Example:\n${config.PREFIX}setprefix !`);
    }
    config.PREFIX = newPrefix;
    await reply(`✅ Prefix has been updated to: ${newPrefix}`);
    await reply("🔄 Restarting bot...");
    exec("pm2 restart all", (error, stdout, stderr) => {
        if (error) return reply(`❌ Error restarting bot: ${error.message}`);
        if (stderr) return reply(`❌ Error: ${stderr}`);
        reply("✅ Bot has been restarted successfully!");
    });
});
