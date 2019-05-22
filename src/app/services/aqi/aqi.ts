export interface Aqi {
  _id?: string,
  timestamp?: string,
  city: string,
  state: string,
  country: string,
  location: {
      type: string,
      coordinates: [
        number,
        number
      ]
  },
  current: {
      weather: {
          ts: string,
          hu: number,
          ic: string,
          pr: number,
          tp: number,
          wd: number,
          ws: number
      },
      pollution: {
          ts: string,
          aqius: number,
          mainus: string,
          aqicn: number,
          maincn: string
      }
  }
}