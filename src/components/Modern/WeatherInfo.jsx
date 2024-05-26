// WeatherInfo.js
import React from 'react';
import { ReactComponent as ClearCloudy } from '../../assets/weather/clear-cloudy.svg';
import { ReactComponent as ClearCloudyNight } from '../../assets/weather/clear-cloudy-night.svg';
import { ReactComponent as Cloudy } from '../../assets/weather/cloudy.svg';
import { ReactComponent as Drizzle } from '../../assets/weather/drizzle.svg';
import { ReactComponent as DrizzleNight } from '../../assets/weather/drizzle-night.svg';
import { ReactComponent as DrizzleSunny } from '../../assets/weather/drizzle-sunny.svg';
import { ReactComponent as Fog } from '../../assets/weather/fog.svg';
import { ReactComponent as Hail } from '../../assets/weather/hail.svg';
import { ReactComponent as MostlyCloudy } from '../../assets/weather/mostly-cloudy.svg';
import { ReactComponent as MostlyCloudyNight } from '../../assets/weather/mostly-cloudy-night.svg';
import { ReactComponent as Night } from '../../assets/weather/night.svg';
import { ReactComponent as PartlyCloudy } from '../../assets/weather/partly-cloudy.svg';
import { ReactComponent as Sleet } from '../../assets/weather/sleet.svg';
import { ReactComponent as Snow } from '../../assets/weather/snow.svg';
import { ReactComponent as SnowFlurries } from '../../assets/weather/snow-flurries.svg';
import { ReactComponent as Sunny } from '../../assets/weather/sunny.svg';
import { ReactComponent as Thunderstorms } from '../../assets/weather/thunderstroms.svg';
import { ReactComponent as Thunderstorms2 } from '../../assets/weather/thunderstroms-2.svg';
import { ReactComponent as ThunderstormsSunny } from '../../assets/weather/thunderstroms-sunny.svg';
import { ReactComponent as ThunderstormsSunnyNight } from '../../assets/weather/thunderstroms-sunny-night.svg';
import { ReactComponent as Tornado } from '../../assets/weather/tornado.svg';
import { ReactComponent as Windy } from '../../assets/weather/windy.svg';

const weatherIcons = {
    snow: Snow,
    'snow-showers-day': SnowFlurries,
    'snow-showers-night': SnowFlurries,
    'thunder-rain': Thunderstorms,
    'thunder-showers-day': ThunderstormsSunny,
    'thunder-showers-night': ThunderstormsSunnyNight,
    rain: Drizzle,
    'showers-day': DrizzleSunny,
    'showers-night': DrizzleNight,
    fog: Fog,
    wind: Windy,
    cloudy: Cloudy,
    'partly-cloudy-day': PartlyCloudy,
    'partly-cloudy-night': MostlyCloudyNight,
    'clear-day': Sunny,
    'clear-night': Night,
};

const WeatherInfo = ({ weatherForDay }) => {
    if (!weatherForDay) {
        return null;
    }

    const WeatherIconComponent = weatherIcons[weatherForDay.icon];

    return (
        <div className="flex flex-col items-center">
            {WeatherIconComponent && (
                <WeatherIconComponent className="weather-icon h-52 w-52 mt-[-40px] mb-[-10%]" />
            )}
            <div className={'font-poppins text-text h-[10%] flex gap-0'}><div className={'text-3xl font-bold h-full align-bottom'}>{weatherForDay.tempmax}°C&nbsp;</div><div className={'text-xl font-semibold text-text-modern pt-1 '}>/ {weatherForDay.tempmin}°C</div></div>
        </div>
    );
};

export const WeatherInfoResume = ({ weatherForHour }) => {
    if (!weatherForHour) {
        return null;
    }

    const WeatherIconComponent = weatherIcons[weatherForHour.icon];

    return (
        <div className="flex items-center ml-16">
            {WeatherIconComponent && (
                <WeatherIconComponent className="weather-icon h-[200%] mt-[-30px] mb-[-10%]" />
            )}
            <div className={'font-poppins text-text flex gap-0'}><div className={'text-5xl font-bold h-full align-bottom'}>{weatherForHour.temp}°C</div></div>
        </div>
    );
};

export default WeatherInfo;
