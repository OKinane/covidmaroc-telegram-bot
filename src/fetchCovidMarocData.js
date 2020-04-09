const { parseDate } = require("./lib/parseDate");
const { JSDOM } = require("jsdom");
const innerText = require("styleless-innertext");

exports.fetchCovidMarocData = async () => {
    const document = await JSDOM.fromURL('http://www.covidmaroc.ma/Pages/AccueilAR.aspx', {userAgent: 'AppleWebKit'});
    const tbody = document.window.document.querySelector("#WebPartWPQ1 > div.ms-rtestate-field > div:nth-child(1) > table > tbody");
    if (!tbody)
        throw Error('Cannot find tbody html tag');
    const text = innerText(tbody);
    const noZeroWidthSpaces = text.replace(/\u{200b}/ug, '');
    const singleWhiteSpaces = noZeroWidthSpaces.replace(/\s+/g, ' ').trim();
    const [time, date, recovered, deaths, confirmed, negatives] = singleWhiteSpaces.split(' ');
    return {
        'date': parseDate(date, time),
        'confirmed': parseInt(confirmed),
        'deaths': parseInt(deaths),
        'recovered': parseInt(recovered),
        'negatives': parseInt(negatives)
    };
}