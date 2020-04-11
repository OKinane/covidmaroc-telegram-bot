const getData = require("covid-ma");

exports.fetchCovidMarocData = async () => {
  const result = await getData();
  return {
    date: result.lastUpdate,
    ...result,
  };
};
