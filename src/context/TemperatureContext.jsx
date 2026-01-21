import { createContext, useContext, useState } from "react";

const TemperatureContext = createContext();

export const TemperatureProvider = ({ children }) => {
    const [unit, setUnit] = useState("C"); // default Celsius

    const toggleUnit = () => {
        setUnit((prev) => (prev === "C" ? "F" : "C"));
    };

    return (
        <TemperatureContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </TemperatureContext.Provider>
    );
};

export const useTemperature = () => useContext(TemperatureContext);
