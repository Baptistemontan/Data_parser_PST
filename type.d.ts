export declare interface Position {
    lat:number,
    lng:number
}

export declare interface DriverEvent {
    eventTime: Date,
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

export declare interface Driver {
    truckId:number,
    driverId:number,
    driverName:string,
    events:DriverEvent[]
}