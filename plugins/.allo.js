const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions2'); // Ensure runtime is imported
const fs = require('fs');
const axios = require('axios');
const { exec } = require('child_process'); // Import exec for executing system commands
const simpleGit = require('simple-git');
const git = simpleGit();

cmd({
  pattern: "up",
  desc: "Update the bot to the latest version.",
  category: "misc",
  react: "🔄",
  filename: __filename,
}, async (conn, mek, m, {
  from, args, isOwner, reply
}) => {
  try {
    if (!isOwner) {
      return reply('❌ This command is for bot owners only.');
    }

    await git.fetch();

    const commits = await git.log(['master..origin/master']);
    const match = args[0];

    if (!match) {
      if (commits.total === 0) {
        return reply('```No updates available.```');
      } else {
        let changes = '```UPDATE FOUND```\n\n';
        changes += `*Changes:* \`\`\`${commits.total}\`\`\`\n`;
        changes += '*Updates:*\n';
        commits.all.forEach((commit, index) => {
          changes += `\`\`\`${index + 1}. ${commit.message}\`\`\`\n`;
        });
        changes += `\n*To update, use* \`\`\`${config.prefix}update now\`\`\``;
        return reply(changes);
      }
    }

    if (match.toLowerCase() === 'now') {
      if (commits.total === 0) {
        return reply('```No changes in the latest commit.```');
      }

      reply('*Updating...*');
      exec(`git stash && git pull origin master`, async (err, stdout, stderr) => {
        if (err) {
          return reply('```' + stderr + '```');
        }

        reply('*Restarting...*');
        const dependencyUpdated = await checkUpdatedDependencies();
        if (dependencyUpdated) {
          reply('*Dependencies changed. Installing new dependencies...*');
          exec(`npm install`, async (err, stdout, stderr) => {
            if (err) {
              return reply('```' + stderr + '```');
            }
            process.exit(0);
          });
        } else {
          process.exit(0);
        }
      });
    }
  } catch (error) {
    console.error('Error while updating:', error);
    reply(`❌ An error occurred:\n\n_Error:_ ${error.message}`);
  }
});

const checkUpdatedDependencies = async () => {
  try {
    const diff = await git.diff(['master..origin/master']);
    return diff.includes('"dependencies":');
  } catch (error) {
    console.error('Error occurred while checking package.json:', error);
    return false;
  }
};
