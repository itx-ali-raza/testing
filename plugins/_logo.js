const { cmd, commands } = require('../command');
const axios = require('axios');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');

cmd({
    pattern: "3dcomic",
    desc: "Create a 3D Comic-style text effect",
    category: "logo",
    react: "🎨",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) {
            return reply("❌ Please provide a name. Example: 3dcomic Empire");
        }
        
        const name = args.join(" ");
        
        // API URL with user-provided name
        const apiUrl = `https://api-pink-venom.vercel.app/api/logo?url=https://en.ephoto360.com/create-online-3d-comic-style-text-effects-817.html&name=${encodeURIComponent(name)}`;

        // Fetch JSON response
        const result = await fetchJson(apiUrl);

        // Check if the download_url is present
        if (!result?.result?.download_url) {
            return;
        }

        // Send the 3D Comic-style text effect image
        await conn.sendMessage(from, {
            image: {
                url: result.result.download_url
            }
        });

    } catch (e) {
        return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
});

cmd({
    pattern: "dragonball",
    desc: "Create a 3D Comic-style text effect",
    category: "logo",
    react: "🎨",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) {
            return reply("❌ Please provide a name. Example: 3dcomic Empire");
        }
        
        const name = args.join(" ");
        
        // API URL with user-provided name
        const apiUrl = `https://api-pink-venom.vercel.app/api/logo?url=https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html&name=${encodeURIComponent(name)}`;

        // Fetch JSON response
        const result = await fetchJson(apiUrl);

        // Check if the download_url is present
        if (!result?.result?.download_url) {
            return;
        }

        // Send the 3D Comic-style text effect image
        await conn.sendMessage(from, {
            image: {
                url: result.result.download_url
            }
        });

    } catch (e) {
        return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
});

cmd({
    pattern: "deadpool",
    desc: "Create a deadpool text effect",
    category: "logo",
    react: "🎨",
    filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
    try {
        if (!args.length) {
            return reply("❌ Please provide a name. Example: 3dcomic Empire");
        }
        
        const name = args.join(" ");
        
        // API URL with user-provided name
        const apiUrl = `https://api-pink-venom.vercel.app/api/logo?url=https://en.ephoto360.com/create-text-effects-in-the-style-of-the-deadpool-logo-818.html&name=${encodeURIComponent(name)}`;

        // Fetch JSON response
        const result = await fetchJson(apiUrl);

        // Check if the download_url is present
        if (!result?.result?.download_url) {
            return;
        }

        // Send the 3D Comic-style text effect image
        await conn.sendMessage(from, {
            image: {
                url: result.result.download_url
            }
        });

    } catch (e) {
        return reply(`*An error occurred while processing your request.*\n\n_Error:_ ${e.message}`);
    }
});
          
