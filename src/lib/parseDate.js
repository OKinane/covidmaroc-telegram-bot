var dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/customParseFormat'))

const moroccoTimeOffset = "+0100";

exports.parseDate = (date, time) => {
    return dayjs(`${time} ${date} ${moroccoTimeOffset}`, 'HH[H]mm DD-MM-YYYY Z').toDate();
}