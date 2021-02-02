var dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/customParseFormat'))

const moroccoTimeOffset = "+0100";

exports.parseDate = (dateTime) => {
    return dayjs(`${dateTime} ${moroccoTimeOffset}`, 'HH[H]mm DD-MM-YYYY Z').toDate();
}