function Favorites({ favorites, setArtist, setSong }) {
  return (
    <div className="favorites">
      <h3>❤️ Favorites</h3>

      {favorites.map((fav, index) => (
        <div
          key={index}
          className="fav-item"
          onClick={() => {
            setArtist(fav.artist);
            setSong(fav.song);
          }}
        >
          🎵 {fav.artist} - {fav.song}
        </div>
      ))}
    </div>
  );
}

export default Favorites;