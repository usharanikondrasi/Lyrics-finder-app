function SearchBar({ artist, song, setArtist, setSong, getLyrics }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Song"
        value={song}
        onChange={(e) => setSong(e.target.value)}
      />

      <button onClick={getLyrics}>Search</button>
    </div>
  );
}

export default SearchBar;