declare interface Position {
    lat:number,
    lng:number
}

declare interface DriverEvent {
    eventTime:number,
    routeId:number,
    routeName:string,
    pos:Position,
    speed:number,
    eventType:string,
    foggy:boolean,
    rainy:boolean,
    windy:boolean,
    congestionLevel:number
}

declare interface Driver {
    truckId:number,
    driverId:number,
    driverName:string,
    events:DriverEvent[]
}