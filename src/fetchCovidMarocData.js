const { parseDate } = require("./lib/parseDate");
const { get } = require("./lib/get");

exports.fetchCovidMarocData = async () => {
    const html = await get('http://www.covidmaroc.ma/Pages/AccueilAR.aspx');
    const match = html.match(/<\s*?tbody\s*?>.*?<\s*?\/\s*?tbody\s*?>/s);
    if (!match)
        throw Error('Cannot find tbody html tag');
    const noZeroWidthSpaces = match[0].replace(/\u{200b}/ug, ' ');
    const noTags = noZeroWidthSpaces.replace(/<.*?>/gs, ' ');
    const noHtmlCodes = noTags.replace(/&\S+;/g, ' ');
    const whiteSpacesToNewLines = noHtmlCodes.replace(/\s+/g, '\n').trim();
    const [time, date, recovered, deaths, confirmed, negatives] = whiteSpacesToNewLines.split('\n');
    return {
        'date': parseDate(date, time),
        'confirmed': parseInt(confirmed),
        'deaths': parseInt(deaths),
        'recovered': parseInt(recovered),
        'negatives': parseInt(negatives)
    };
}