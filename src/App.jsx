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

    // Centralised fetch logic (VERY IMPORTANT)
    const handleSearch = async (cityName) => {
        if (!cityName) return;

        try {
            setLoading(true);
            setError(null);

            const data = await fetchWeather(cityName);
            setWeather(data);

            // Save recent searches (max 5, no duplicates)
            setRecentSearches((prev) => {
                const updated = prev.filter(
                    (c) => c.toLowerCase() !== cityName.toLowerCase()
                );
                return [cityName, ...updated].slice(0, 5);
            });
        } catch (err) {
            setError("City not found");
            setWeather(null);
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
        <div style={{ padding: "20px" }}>
            <h1>Weather App</h1>

            {/* Unit toggle */}
            <UnitToggle />

            {/* Search input */}
            <input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {/* Loading state */}
            {loading && <LoadingSpinner />}

            {/* Error state */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Weather display */}
            {weather && !loading && <WeatherCard data={weather} />}

            {/* Recent searches */}
            {recentSearches.length > 0 && (
                <RecentSearches
                    searches={recentSearches}
                    onSelect={handleSearch}
                />
            )}
        </div>
    );
};

export default App;
