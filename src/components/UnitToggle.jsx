import { useTemperature } from "../context/TemperatureContext";

const UnitToggle = () => {
    const { unit, toggleUnit } = useTemperature();

    return (
        <button onClick={toggleUnit}>
            Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
        </button>
    );
};

export default UnitToggle;
