const { TelegramBot } = require("./lib/TelegramBot");
const { fetchCovidMarocData } = require("./fetchCovidMarocData");
const { areDeepEqual } = require('./lib/areDeepEqual');

function checkStats(bot, chatId) {
    let lastData = null;
    return async () => {
        const data = await fetchCovidMarocData();
        if (!areDeepEqual(data, lastData)) {
            const dataJson = JSON.stringify(data, null, 1);
            await bot.sendMessage(chatId, dataJson);
            lastData = data;
            console.log(`New data available :\n${dataJson}`)
        }
    }
}

function readEnvVarOnce(name) {
    const value = process.env[name];
    if (!value)
        throw Error(`Environment variable '${name}' is not set`);
    delete process.env[name];
    return value;
}

(async function Main() {
    try {
        const BOT_TOKEN = readEnvVarOnce('BOT_TOKEN');
        const BOT_CHANNEL_ID = readEnvVarOnce('BOT_CHANNEL_ID');

        const bot = await TelegramBot.create(BOT_TOKEN);
        console.log(`${bot.getName()} is up`);
        const adminIds = await bot.getChatHumanAdminIds(BOT_CHANNEL_ID);
        const callback = checkStats(bot, BOT_CHANNEL_ID, adminIds);
        await callback();
        setInterval(callback, 1000);
    } catch (error) {
        console.error(error.stack);
        process.exit(1);
    }
})()
