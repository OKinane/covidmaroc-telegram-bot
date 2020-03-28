var request = require('@root/request');

exports.get = async url => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    var options = {
        url: url,
        headers: {
            'User-Agent': 'AppleWebKit'
        }
    };
    let retriesLeft = 3;
    let response;
    while (--retriesLeft >= 0) {
        response = await request(options);
        if (response.statusCode === 200)
            return response.body;
        if (retriesLeft === 0
            || (response.statusCode >= 400 && response.statusCode < 500))
            break;
        await sleep(5 * 1000);
    }
    throw Error(`Status code was: ${response.statusCode}`);
}