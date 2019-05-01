export interface User {
  userId: string,
  cities: [
    {
      city: string,
      state: string,
      country: string
    }
  ]
}