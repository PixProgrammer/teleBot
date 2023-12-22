const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// Replace 'YOUR_BOT_TOKEN' with the actual token you get from the BotFather on Telegram
const token = '6777716797:AAFZvSXr2GCbupXQXLyNKK_sGsQnfpfYfI0';
const port = process.env.PORT || 3000; // Port for the Express server

// Create a new instance of the TelegramBot
const bot = new TelegramBot(token);

// Create an Express app
const app = express();

// Use body-parser middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Handle the /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.username;

    bot.sendMessage(chatId, `Hi ${username}! Welcome to your bot.`);
});

// Set up a route to handle incoming updates from Telegram
app.post(`/bot${token}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
    // Set up the webhook
    const webhookUrl = 'https://frantic-cod-school-uniform.cyclic.app/bot' + token;
    bot.setWebHook(webhookUrl);
    console.log(`Webhook set up at ${webhookUrl}`);
});

// Log errors
bot.on('webhook_error', (error) => {
    console.error(error);
});

// Handle graceful shutdown
process.once('SIGINT', () => {
    bot.stopWebHook();
    console.log('Bot stopped webhook');
    process.exit();
});

process.once('SIGTERM', () => {
    bot.stopWebHook();
    console.log('Bot stopped webhook');
    process.exit();
});
