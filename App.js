import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import LyricsDisplay from "./components/LyricsDisplay";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import ThemeToggle from "./components/ThemeToggle";
import Favorites from "./components/Favorites";
import History from "./components/History";
import VideoPlayer from "./components/VideoPlayer";
import "./App.css";

function App() {
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [history, setHistory] = useState([]);

  // Save favorites in localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 🔍 Fetch Lyrics + Fallback Video
  const getLyrics = async () => {
    if (!artist || !song) {
      setError("Enter artist & song");
      return;
    }

    setLoading(true);
    setError("");
    setLyrics("");
    setShowVideo(false);

    try {
      const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
      const data = await res.json();

      if (data.lyrics) {
        setLyrics(data.lyrics);

        // Save history
        setHistory([{ artist, song }, ...history]);
      } else {
        setShowVideo(true);
        setError("Lyrics not found, playing video 🎧");
      }
    } catch {
      setShowVideo(true);
      setError("Error fetching lyrics, playing video 🎧");
    }

    setLoading(false);
  };

  // ❤️ Add to Favorites
  const addToFavorites = () => {
    const newFav = { artist, song };

    if (!favorites.some(f => f.artist === artist && f.song === song)) {
      setFavorites([...favorites, newFav]);
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <h1>🎵 Lyrics Finder</h1>

      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <SearchBar
        artist={artist}
        song={song}
        setArtist={setArtist}
        setSong={setSong}
        getLyrics={getLyrics}
      />

      <button onClick={addToFavorites}>❤️ Add to Favorites</button>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {lyrics && <LyricsDisplay lyrics={lyrics} />}

      {showVideo && (
  <a
    href={`https://www.youtube.com/results?search_query=${artist}+${song}`}
    target="_blank"
    rel="noopener noreferrer"
    className="yt-link"
  >
    🎧 Listen on YouTube
  </a>
)}

      <Favorites
        favorites={favorites}
        setArtist={setArtist}
        setSong={setSong}
      />

      <History
        history={history}
        setArtist={setArtist}
        setSong={setSong}
      />
    </div>
  );
}

export default App;