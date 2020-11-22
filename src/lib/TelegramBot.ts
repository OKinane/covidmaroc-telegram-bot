import * as TeleBot from "telebot";

export class TelegramBot {
    bot;
    name;
    constructor(bot, name) {
        this.bot = bot;
        this.name = name;
    }
    static async create(token) {
        const bot = new TeleBot(token);
        const info = await bot.getMe();
        const botName = info.username;
        return new TelegramBot(bot, botName);
    }
    async getChatHumanAdminIds(chatId) {
        const admins = await this.bot.getChatAdministrators(chatId);
        const newLocal = admins.filter(u => !u.user.is_bot);
        return newLocal;
    }
    sendMessage(chatId, message) {
        return this.bot.sendMessage(chatId, message);
    }
    getName() {
        return this.name;
    }
}