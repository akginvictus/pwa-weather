import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import LoadingSpinner from "./components/LoadingSpinner";
import WeatherCard from "./components/WeatherCard";
import RecentSearches from "./components/RecentSearches";
import UnitToggle from "./components/UnitToggle";

const App = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async (cityName) => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchWeather(cityName);
            setWeather(data);

            setRecentSearches((prev) =>
                prev.includes(cityName) ? prev : [cityName, ...prev].slice(0, 5)
            );
        } catch {
            setError("City not found");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch(city);
            setCity("");
        }
    };

    return (
        <div>
            <h1>Weather App</h1>

            <UnitToggle />

            <input
                type="text"
                placeholder="Enter city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {loading && <LoadingSpinner />}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {weather && <WeatherCard data={weather} />}

            <RecentSearches searches={recentSearches} onSelect={handleSearch} />
        </div>
    );
};

export default App;
