const { TelegramBot } = require("./lib/TelegramBot");
const { fetchCovidMarocData } = require("./fetchCovidMarocData");
const areEqual = require('fast-deep-equal');

function checkStats(bot, chatId) {
    let lastData = null;
    return async () => {
        const data = await fetchCovidMarocData();
        if (!areEqual(data, lastData)) {
            const dataJson = JSON.stringify(data, null, 1);
            await bot.sendMessage(chatId, dataJson);
            lastData = data;
            console.log(`New data available :\n${dataJson}`)
        }
    }
}

function getEnvVar(name) {
    const value = process.env[name];
    if (!value)
        throw Error(`Environment variable '${name}' is not set`);
    return value;
}

(async function Main() {
    try {
        const BOT_TOKEN = getEnvVar('BOT_TOKEN');
        const BOT_CHANNEL_ID = getEnvVar('BOT_CHANNEL_ID');

        const bot = await TelegramBot.create(BOT_TOKEN);
        console.log(`${bot.getName()} is up`);
        const adminIds = await bot.getChatHumanAdminIds(BOT_CHANNEL_ID);
        const callback = checkStats(bot, BOT_CHANNEL_ID, adminIds);
        await callback();
        setInterval(callback, 5 * 60 * 1000);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})()
