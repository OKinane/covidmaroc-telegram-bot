import * as dayjs from "dayjs";
import * as customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat)

const moroccoTimeOffset = "+0100";

export const parseDate = (date, time) => {
    return dayjs(`${time} ${date} ${moroccoTimeOffset}`, 'HH[H]mm DD-MM-YYYY Z').toDate();
}