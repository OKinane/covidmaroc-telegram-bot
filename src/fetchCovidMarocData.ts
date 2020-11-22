
import { parseDate } from "./lib/parseDate";
import { JSDOM } from "jsdom";
import innerText from "styleless-innertext";

export const fetchCovidMarocData = async () => {
    const document = await JSDOM.fromURL('http://www.covidmaroc.ma/Pages/AccueilAR.aspx', { userAgent: 'AppleWebKit' });
    const tbody = document.window.document.querySelector("#WebPartWPQ1 > div.ms-rtestate-field > div:nth-child(2) > table > tbody");
    if (!tbody)
        throw Error('Cannot find tbody html tag');
    const text = innerText(tbody);
    const noZeroWidthSpaces = text.replace(/\u{200b}/ug, '');
    const singleWhiteSpaces = noZeroWidthSpaces.replace(/\s+/g, ' ').trim();
    const [time, date, recovered, deaths, confirmed, negatives] = singleWhiteSpaces.split(' ');
    const data = {
        'date': parseDate(date, time),
        'confirmed': parseInt(confirmed),
        'deaths': parseInt(deaths),
        'recovered': parseInt(recovered),
        'negatives': parseInt(negatives),
    };
    return {
        'active': data.confirmed - data.deaths - data.recovered,
        ...data,
    };
}