const { writeFile } = require('fs');

// 'dateString' format → yyyy-mm-dd
// '2019-11-01' → Dec 01 2019
// Shop's open time → 07:00 ~ 18:00
function generateTimestamp(dateString, startHour = 7, endHour = 19) {
  let dateComponent = dateString.split('-');
  let timestamp = [];
  for (let hour = startHour; hour < endHour; hour++) {
    timestamp = timestamp.concat({
      time: new Date(...dateComponent, hour).toJSON(),
      isReserved: false
    });
  }
  return timestamp;
}

function generateJSON(path, data) {
  writeFile(path, JSON.stringify(data), err => {
    if (err) throw err;
    console.log('Data has been saved');
  });
}

let dateComponent = process.argv[2].split('-');
dateComponent[1] = String(Number(dateComponent[1]) + 1);

generateJSON(`../data/${dateComponent.join('-')}.json`, generateTimestamp(process.argv[2]));
