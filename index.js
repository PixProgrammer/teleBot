import { Bot, webhookCallback } from "grammy";
import express from "express";

// Create a bot using the Telegram token
const bot = new Bot(process.env.TELEGRAM_TOKEN || "6978212821:AAGVTBGjBZf6VlB8Esgqy7XfjWE5JIOTIhk");

// Handle the /start command to greet the user
bot.command("start", (ctx) => {
  const username = ctx.from?.username || "there";
  ctx.reply(`Hi ${username}! Welcome to your bot.`);
});

// Start the server
if (process.env.NODE_ENV === "production") {
  // Use Webhooks for the production server
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
} else {
  // Use Long Polling for development
  bot.start();
}

