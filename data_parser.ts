import * as fs from 'fs';
import {Driver, DriverEvent} from './type'


const Data:Driver[] = [];

fs.readFile("./Data_Batch.txt", {encoding:"utf8"},(err, data) => {
  console.time("temps");
  if(err) {
    return console.log(err);
  }
   data.split('\n').forEach(line => {
    const parsedLine = line.split('|');
    const currentDriver:Driver = {
      truckId: parseInt(parsedLine[1]),
      driverId: parseInt(parsedLine[2]),
      driverName: parsedLine[3],
      events: [],
      active: true
    }
    const event:DriverEvent={
      eventTime: new Date(parseInt(parsedLine[0])),
      routeId: parseInt(parsedLine[4]),
      routeName: parsedLine[5],
      pos: {
        lat: parseFloat(parsedLine[6]),
        lng: parseFloat(parsedLine[7])
      },
      speed: parseInt(parsedLine[8]),
      eventType: parsedLine[9],
      foggy: parsedLine[10] == "1",
      rainy: parsedLine[11] == "1",
      windy: parsedLine[12] == "1",
      congestionLevel: parseInt(parsedLine[13])
    }
    if(!Data.find(driver => driver.driverName === currentDriver.driverName)?.events.push(event)) {
      currentDriver.events.push(event);
      Data.push(currentDriver);
    }
  })
  Data.forEach(driver =>  driver.events.sort((a,b) => a.eventTime.getTime() - b.eventTime.getTime()))
  fs.writeFile("./data.json", JSON.stringify(Data), err => {
    if(err) {
      console.log(err)
    } else {
      console.log("Parsing successfull")
    }
    console.timeEnd("temps");
  })
})