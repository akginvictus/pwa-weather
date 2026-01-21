const RecentSearches = ({ searches, onSelect }) => {
    return (
        <div>
            <h3>Recent Searches</h3>
            <ul>
                {searches.map((city, index) => (
                    <li key={index}>
                        <button onClick={() => onSelect(city)}>{city}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentSearches;
