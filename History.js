function History({ history, setArtist, setSong }) {
  return (
    <div className="history">
      <h3>🔎 History</h3>

      {history.map((item, index) => (
        <div
          key={index}
          className="history-item"
          onClick={() => {
            setArtist(item.artist);
            setSong(item.song);
          }}
        >
          🎧 {item.artist} - {item.song}
        </div>
      ))}
    </div>
  );
}

export default History;