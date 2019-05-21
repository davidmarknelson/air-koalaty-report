export interface User {
  _id?: string,
  userId: string,
  cities: [
    {
      _id?: string,
      city: string,
      state: string,
      country: string
    }
  ]
}