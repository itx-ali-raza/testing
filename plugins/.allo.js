const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const yts = require('yt-search');
const config = require('../config'); // Importing config file
const url = require('url'); // Importing url module

const prefix = config.PREFIX; // Get the prefix from the config

cmd({
    pattern: "play3",
    alias: ["audio"],
    desc: "Download songs",
    category: "download",
    react: "🎶",
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, pushname, args, q, reply }) => {
    try {
        // Check for query
        if (!q) {
            return reply(`Please Enter a Search Query or YouTube link. Usage Example:\n*${config.PREFIX}play Spectre*\n*${config.PREFIX}play https://youtu.be/aGjXa18XCRY?si=-rNZHD-trThO1x4Y*`);
        }

        // If a YouTube link is provided
        if (q.startsWith("https://youtu")) {
            let downloadUrl;
            try {
                // Send the API request to fetch the download URL for the provided YouTube link
                let response = await axios.get(`https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`);
                downloadUrl = response.data.result.download_url;

                // Download the audio
                const buffer = await axios.get(downloadUrl, { responseType: 'arraybuffer' });

                // Send the audio to the user
                await conn.sendMessage(from, { audio: buffer.data, mimetype: "audio/mp3" }, { quoted: mek });
                await m.react("✅");
                return;
            } catch (err) {
                console.error("Error fetching download URL:", err);
                return reply("❌ Unable to fetch download URL. Please try again later.");
            }
        }

        // If no link, perform a search for the video
        const search = await yts(q);
        const data = search.videos[0];
        const videoUrl = data.url;

        // Fetch the download URL for the found video
        let downloadUrl;
        try {
            let response = await axios.get(`https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(videoUrl)}`);
            downloadUrl = response.data.result.download_url;
        } catch (err) {
            console.error("Error fetching download URL:", err);
            return reply("❌ Unable to fetch download URL. Please try again later.");
        }

        // Information Message
        const infoMessage = {
            image: { url: data.thumbnail },
            caption: `
╭──────❏ *ALI-MD DOWNLOADER* ❏
│ 𝙷𝙴𝙻𝙻𝙾 ${pushname || "User"}
│❏──────────────────────────────❏
│ *Title:* ${data.title}
│ *Quality:* mp3 (128kbps)
│ *Duration:* ${data.timestamp}
│ *Viewers:* ${data.views}
│ *Uploaded:* ${data.ago}
│ *Artist:* ${data.author.name}
│❏──────────────────────────────❏
│⦿ *Direct Yt Link:* ${videoUrl}
│❏──────────────────────────────❏
│ >Made By Ali
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━⊷`,
            contextInfo: {
                mentionedJid: [mek.sender],
                forwardingScore: 5,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363337275149306@newsletter',
                    newsletterName: "ali",
                    serverMessageId: 143
                }
            }
        };

        await conn.sendMessage(from, infoMessage, { quoted: mek });

        // Send the audio file
        await conn.sendMessage(from, {
            audio: { url: downloadUrl },
            fileName: `${data.title}.mp3`,
            mimetype: 'audio/mpeg',
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: false,
                    title: data.title,
                    body: 'Made By ali',
                    thumbnailUrl: data.thumbnail,
                    sourceUrl: global.channelUrl,
                    mediaType: 1,
                    renderLargerThumbnail: false
                }
            }
        }, { quoted: mek });

        await m.react("✅");
    } catch (e) {
        console.error("Error in play command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

cmd({
    pattern: "app",
    category: "download",
    desc: "Fetches and downloads APK file.",
    use: "<query>",
    filename: __filename,
  },
  async (conn, mek, m, { from, quoted, body, args, pushname, q, reply }) => {
    try {
      if (!q) {
        return reply(
          `*_Please provide a query, ${pushname || "User"}!!_*`
        );
      }

      const apiUrl = `https://api.nexoracle.com/downloader/apk?apikey=MepwBcqIM0jYN0okD&q=${encodeURIComponent(q)}`;
      const result = await axios.get(apiUrl);

      if (!result.data) {
        return reply(`*_Something went wrong. Please try again later._*`);
      }

      const data = result.data.result;
      const apkUrl = data.dllink;
      const fileName = `${data.name}.apk`;
      const filePath = path.join(__dirname, fileName);

      const response = await axios({
        url: apkUrl,
        method: 'GET',
        responseType: 'stream'
      });

      const writer = fs.createWriteStream(filePath);

      response.data.pipe(writer);

      writer.on('finish', async () => {
        await conn.sendMessage(
          from,
          {
            document: { url: filePath },
            caption: `*📦 APK Download for "${q}":*\n\n*App Name:* ${data.name}\n*Size:* ${data.size}\n`,
            fileName: fileName,
            mimetype: "application/vnd.android.package-archive"
          },
          { quoted: mek }
        );

        fs.unlinkSync(filePath); // Clean up the file after sending
      });

      writer.on('error', (err) => {
        throw err;
      });

    } catch (e) {
      return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
  });
