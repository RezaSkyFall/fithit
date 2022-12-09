export interface IEstate {
    _id?:string,
    title: string,
    price: number,
    address: string,
    rooms: number,
    poolType: 'Indoor' | 'Outdoor',
    hasPool: boolean,
    peopleCapacity: number,
    hasParking: boolean,
    images?: string[],
    code: number,
    serviceType: EstateServiceType,
    areaSize: number,
    buildingSize: number,
    hasFireplace: boolean,
    hasBarbecue: boolean,
    hasFurniture: boolean,
    hasGazebo: boolean,
    instagramPostLink?: string,
    tags?:string[],
    description?:string,
    [key: string]: any;
}

enum EstateServiceType {
    DailyRent = 1,
    MonthlyRent,
    YearlyRent,
    Buy,
    Sell
}

export { EstateServiceType }