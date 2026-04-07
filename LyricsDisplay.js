import { useEffect, useRef } from "react";

function LyricsDisplay({ lyrics }) {
  const lines = lyrics.split("\n");
  const boxRef = useRef();

  useEffect(() => {
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [lyrics]);

  return (
    <div className="lyrics-box" ref={boxRef}>
      <h2>Lyrics</h2>

      {lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
}

export default LyricsDisplay;