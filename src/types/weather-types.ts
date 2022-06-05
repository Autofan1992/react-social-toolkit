export type WeatherType = {
    description: string
    icon: string
}

export type WeatherDataType = {
    name: string
    country: string
    weather: Array<WeatherType>
    sys: {
        sunrise: number
        sunset: number
    },
    main: {
        temp: number
        feels_like: number
    }
    wind: {
        speed: number
    }
}