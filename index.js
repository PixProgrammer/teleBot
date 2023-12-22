const TelegramBot = require("node-telegram-bot-api");
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// replace the value below with the Telegram token you receive from @BotFather
const token = "6978212821:AAGVTBGjBZf6VlB8Esgqy7XfjWE5JIOTIhk";

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const userInput = msg.text.toLowerCase();

  // Check if the received message is "hi"
  if (userInput === 'hi' || userInput === 'hello') {
    // Respond with a greeting
    bot.sendMessage(chatId, "Hello! I'm your bot. How can I help you?");
  } else {
    // Respond with a default message for other messages
    bot.sendMessage(chatId, "I'm not programmed to respond to that. If you need help, just say 'hi'.");
  }
});
