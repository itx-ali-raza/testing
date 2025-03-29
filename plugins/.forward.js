const axios = require('axios');
const fg = require('api-dylux');
const config = require('../config');
const { cmd, commands } = require('../command');
const prefix = config.PREFIX; 
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');

// gitstalk command
cmd({
    pattern: "gitstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "stalker",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args[0]) return reply("Please provide a GitHub username.");

        const username = args[0].trim();
        const apiUrl = `https://api.agatz.xyz/api/ghtstalk?name=${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data.result;

        const userInfo = {
            image: { url: data.avatar_url },
            caption: `
╭───「 𝚂𝚃𝙰𝙻𝙺𝙴𝚁 」───◆  
│ ∘ 𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎: ${data.name || data.login}  
│ ∘ 𝙶𝚒𝚝𝙷𝚞𝚋 𝚄𝚁𝙻: ${data.html_url}  
│ ∘ 𝙱𝚒𝚘: ${data.bio || 'Not available'}  
│ ∘ 𝙻𝚘𝚌𝚊𝚝𝚒𝚘𝚗: ${data.location || 'Unknown'}  
│ ∘ 𝙿𝚞𝚋𝚕𝚒𝚌 𝚁𝚎𝚙𝚘𝚜: ${data.public_repos}  
│ ∘ 𝙵𝚘𝚕𝚕𝚘𝚠𝚎𝚛𝚜: ${data.followers} 
│ ∘ 𝙵𝚘𝚕𝚕𝚘𝚠𝚒𝚗𝚐: ${data.following}  
│ ∘ 𝙲𝚛𝚎𝚊𝚝𝚎𝚍 𝙳𝚊𝚝𝚎: ${new Date(data.created_at).toDateString()}  
│ ∘ 𝙿𝚞𝚋𝚕𝚒𝚌 𝙶𝚒𝚜𝚝𝚜: ${data.public_gists}  
╰───────────────────

${global.caption}`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363337275149306@newsletter",
                    newsletterName: global.botname,
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, userInfo, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error fetching data 🤕: ${e.response?.data?.message || e.message}`);
    }
});

// tgstalker command
cmd({
    pattern: "tgstalker",
    desc: "Fetch detailed Telegram user profile including profile picture.",
    category: "stalker",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args[0]) return reply("Please provide a Telegram username.");

        const username = args[0].trim();
        const apiUrl = `https://api.nexoracle.com/stalking/telegram-user?apikey=MepwBcqIM0jYN0okD&user=${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data.result;

        const userInfo = {
            image: { url: data.photo },
            caption: `
╭──「 𝚂𝚃𝙰𝙻𝙺𝙴𝚁 」───◆  
│ ∘ 𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎: ${data.name}  
│ ∘ 𝙱𝚒𝚘: ${data.bio || 'Not available'}  
│ ∘ 𝙷𝚊𝚗𝚍𝚕𝚎: @${data.username}  
╰────────────────

${global.caption}`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363337275149306@newsletter",
                    newsletterName: global.botname,
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, userInfo, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error fetching data 🤕: ${e.response?.data?.message || e.message}`);
    }
});

// whatsappstalker command
cmd({
    pattern: "whatsappstalker",
    desc: "Fetch detailed WhatsApp channel profile including profile picture.",
    category: "stalker",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args[0]) return reply("Please provide a WhatsApp channel URL.");

        const url = args[0].trim();
        const apiUrl = `https://api.nexoracle.com/stalking/whatsapp-channel?apikey=MepwBcqIM0jYN0okD&url=${url}`;
        const response = await axios.get(apiUrl);
        const data = response.data.result;

        const channelInfo = {
            image: { url: data.img },
            caption: `
╭────「 𝚂𝚃𝙰𝙻𝙺𝙴𝚁 」────◆  
│ ∘ 𝙲𝚑𝚊𝚗𝚗𝚎𝚕 𝚃𝚒𝚝𝚕𝚎: ${data.title}  
│ ∘ 𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${data.description || 'No description available'}  
│ ∘ 𝙵𝚘𝚕𝚕𝚘𝚠𝚎𝚛𝚜: ${data.followers}  
│ ∘ 𝙲𝚑𝚊𝚗𝚗𝚎𝚕 𝚄𝚁𝙻: ${url}  
╰───────────────────────◆  

${global.caption}`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363337275149306@newsletter",
                    newsletterName: global.botname,
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, channelInfo, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error fetching data 🤕: ${e.response?.data?.message || e.message}`);
    }
});

// tiktokstalk command
cmd({
    pattern: "tiktokstalk",
    desc: "Fetch detailed TikTok user profile including profile picture.",
    category: "stalker",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args[0]) return reply("Please provide a TikTok username.");

        const username = args[0].trim();
        const apiUrl = `https://api.nexoracle.com/stalking/tiktok-user2?apikey=MepwBcqIM0jYN0okD&user=${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data.result;

        const userInfo = {
            image: { url: data.avatarLarger },
            caption: `
╭────「 𝚂𝚃𝙰𝙻𝙺𝙴𝚁 」────◆  
│ ∘ 𝙽𝚒𝚌𝚔𝚗𝚊𝚖𝚎: ${data.nickname || 'Not available'}  
│ ∘ 𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎: ${data.username}  
│ ∘ 𝚅𝚒𝚍𝚎𝚘𝚜 𝙿𝚘𝚜𝚝𝚎𝚍: ${data.videoCount}  
│ ∘ 𝙵𝚘𝚕𝚕𝚘𝚠𝚎𝚛𝚜: ${data.followerCount}  
│ ∘ 𝙵𝚘𝚕𝚕𝚘𝚠𝚒𝚗𝚐: ${data.followingCount}  
│ ∘ 𝙷𝚎𝚊𝚛𝚝𝚜: ${data.heartCount}  
│ ∘ 𝚃𝚒𝚔𝚃𝚘𝚔 𝚄𝚜𝚎𝚛 𝙸𝙳: ${data.id}  
╰─────────────────────

${global.caption}`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363337275149306@newsletter",
                    newsletterName: global.botname,
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, userInfo, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error fetching data 🤕: ${e.response?.data?.message || e.message}`);
    }
});

// instastalk command
cmd({
    pattern: "instastalk",
    desc: "Fetch detailed Instagram user profile including profile picture.",
    category: "stalker",
    react: "📚",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide an Instagram username.");
        }

        const apiUrl = `https://api.nexoracle.com/stalking/insta-user?apikey=MepwBcqIM0jYN0okD&user=${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data.result;

        const userInfo = {
    image: { url: data.profile },
    caption: `
╭────「 𝚂𝚃𝙰𝙻𝙺𝙴𝚁 」────◆  
│ ∘ 𝙵𝚞𝚕𝚕 𝙽𝚊𝚖𝚎: ${data.fullName || 'Not available'}  
│ ∘ 𝚄𝚜𝚎𝚛𝚗𝚊𝚖𝚎: ${data.username}  
│ ∘ 𝙱𝚒𝚘: ${data.bio || 'Not available'}  
│ ∘ 𝙿𝚘𝚜𝚝𝚜: ${data.posts}  
│ ∘ 𝙵𝚘𝚕𝚕𝚘𝚠𝚎𝚛𝚜: ${data.followers}  
│ ∘ 𝙵𝚘𝚕𝚕𝚘𝚠𝚒𝚗𝚐: ${data.following}  
╰─────────────────────

${global.caption}`,
    contextInfo: {
        mentionedJid: [mek.sender],
        forwardingScore: 5,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: "120363337275149306@newsletter",
            newsletterName: global.botname,
            serverMessageId: 143
        }
    }
};

// Send the info message
await conn.sendMessage(from, { image: { url: data.profile }, caption: userInfo.caption }, { quoted: mek });

} catch (e) {
    console.error(e);
    reply(`Error fetching data 🤕: ${e.response?.data?.message || e.message}`);
}
});
//--------------------------------------------
//  NPM COMMANDS
//--------------------------------------------
cmd({
    pattern: "npmstalk",
    desc: "Search for an NPM package",
    category: "stalker",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("Please send the package name to search.");

        const packageName = q.trim();
        const npmApi = `https://api.npms.io/v2/search?q=${encodeURIComponent(packageName)}`;

        const response = await axios.get(npmApi);
        const results = response.data.results;

        if (!results.length) return reply("No results found for the specified package name.");

        const pkg = results[0].package;
        const imageUrl = `https://nodei.co/npm/${encodeURIComponent(pkg.name)}.png`;

        const output = {
            image: { url: imageUrl },
            caption: `
╭────「 𝚂𝚃𝙰𝙻𝙺𝙴𝚁 」────◆  
│ ∘ 𝙿𝚊𝚌𝚔𝚊𝚐𝚎 𝙽𝚊𝚖𝚎: ${pkg.name}  
│ ∘ 𝚅𝚎𝚛𝚜𝚒𝚘𝚗: ${pkg.version}  
│ ∘ 𝙳𝚎𝚜𝚌𝚛𝚒𝚙𝚝𝚒𝚘𝚗: ${pkg.description || "No description available"}  
│ ∘ 𝙰𝚞𝚝𝚑𝚘𝚛: ${pkg.author?.name || "Unknown"}  
│ ∘ 𝙷𝚘𝚖𝚎𝚙𝚊𝚐𝚎: ${pkg.links?.homepage || "N/A"}  
│ ∘ 𝚁𝚎𝚙𝚘𝚜𝚒𝚝𝚘𝚛𝚢: ${pkg.links?.repository || "N/A"}  
│───────────────────────  
│ ∘  𝙳𝚒𝚛𝚎𝚌𝚝 𝙻𝚒𝚗𝚔: ${pkg.links?.npm || "N/A"}  
╰────────────────────

${global.caption}`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363337275149306@newsletter",
                    newsletterName: global.botname,
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, output, { quoted: mek });

    } catch (e) {
        console.error(e.response?.data || e.message);
        reply(`An error occurred: ${e.response?.data?.error || e.message}`);
    }
});
