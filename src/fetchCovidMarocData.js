const { parseDate } = require("./lib/parseDate");
const { JSDOM } = require("jsdom");
const innerText = require("styleless-innertext");

exports.fetchCovidMarocData = async () => {
    const document = await JSDOM.fromURL('http://www.covidmaroc.ma/Pages/AccueilAR.aspx', { userAgent: 'AppleWebKit' });
    const tbody = document.window.document.querySelector("#WebPartWPQ1 > div.ms-rtestate-field > div:nth-child(2) > table > tbody");
    if (!tbody)
        throw Error('Cannot find tbody html tag');
    const text = innerText(tbody);
    const noZeroWidthSpaces = text.replace(/\u{200b}/ug, '');
    const [dateTime, ...stats] = noZeroWidthSpaces.trim().split('\n').filter(s => s.length > 0);
    const [tested, confirmed, recovered, deaths, vaccinated] = stats.map(s => s.replace(/\s+/g, ''));
    const data = {
        'date': parseDate(dateTime),
        'tested': parseInt(tested),
        'confirmed': parseInt(confirmed),
        'recovered': parseInt(recovered),
        'deaths': parseInt(deaths),
        'vaccinated': parseInt(vaccinated),
    };
    return {
        'active': data.confirmed - data.deaths - data.recovered,
        ...data,
    };
}