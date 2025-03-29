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
  async (message) => {
    const start = performance.now();
    const msg = await message.send('Testing Speed...');
    const end = performance.now();
    await msg.edit(`\`\`\`Pong! ${(end - start).toFixed(1)} ms\`\`\``);
  }
);

bot(
    {
