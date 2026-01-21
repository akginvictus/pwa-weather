import { useTemperature } from "../context/TemperatureContext";

const WeatherCard = ({ data }) => {
    const { unit } = useTemperature();

    const temperature =
        unit === "C" ? data.current.temp_c : data.current.temp_f;

    return (
        <div>
            <h2>
                {data.location.name}, {data.location.country}
            </h2>
            <p>Temperature: {temperature} °{unit}</p>
            <p>Condition: {data.current.condition.text}</p>
            <img src={data.current.condition.icon} alt="weather" />
        </div>
    );
};

export default WeatherCard;
