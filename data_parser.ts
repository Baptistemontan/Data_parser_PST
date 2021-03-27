import * as fs from 'fs';
import {Driver, DriverEvent} from './type'

// array of driver, to be filled with the txt file
const Data:Driver[] = [];

fs.readFile("./Data_Batch.txt", {encoding:"utf8"},(err, data) => {
  console.time("temps");

  // error handling
  if(err) {
    // "handling" just print the error lol
    return console.log(err);
  }
  // file is a bunch of event line
  // each line is :
  // eventTime|truckId|driverId|driverName|routeId|routeName|latitude|longitude|speed|eventType|foggy|rainy|windy|congestionLevel
  // first separate each line
  data.split('\n').forEach(line => {
    // then separate all values of the line
    const parsedLine = line.split('|');
    // get the driver ID
    const currentDriverId = Number(parsedLine[2]);
    // construct the event
    const event:DriverEvent = {
      eventTime: new Date(Number(parsedLine[0])),
      routeId: Number(parsedLine[4]),
      routeName: parsedLine[5],
      pos: {
        lat: Number(parsedLine[6]),
        lng: Number(parsedLine[7])
      },
      speed: Number(parsedLine[8]),
      eventType: parsedLine[9],
      foggy: parsedLine[10] == "1",
      rainy: parsedLine[11] == "1",
      windy: parsedLine[12] == "1",
      congestionLevel: Number(parsedLine[13])
    }
    // if their already exist a driver with the same name
    // push the event to its event array
    if(!Data.find(driver => driver.driverId == currentDriverId)?.events.push(event)) {
      //else construct the driver
      const currentDriver:Driver = {
        truckId: Number(parsedLine[1]),
        driverId: currentDriverId,
        driverName: parsedLine[3],
        events: []
      }
      // push the event to the current driver event array
      currentDriver.events.push(event);
      // and push the driver to main array
      Data.push(currentDriver);
    }
  })
  // for each driver sort the event in inverse chronology
  // driver.event[0] must be most recent
  Data.forEach(driver =>  driver.events.sort((a,b) => b.eventTime.getTime() - a.eventTime.getTime()))
  // then write main array to a json file
  fs.writeFile("./data.json", JSON.stringify(Data), err => {
    if(err) {
      // lol best err handling
      console.log(err)
    } else {
      console.log("Parsing successfull")
    }

    // output time elapsed for data parsing
    console.timeEnd("temps");
  })
})