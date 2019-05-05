export interface Aqi {
  status: string,
    data: {
        city: string,
        state: string,
        country: string,
        location: {
            type: string,
            coordinates: [number]
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
}