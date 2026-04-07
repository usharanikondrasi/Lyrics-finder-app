import { useEffect, useState } from "react";

function VideoPlayer({ artist, song }) {
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${artist}+${song}&key=YOUR_API_KEY&type=video&maxResults=1`
        );
        const data = await res.json();

        if (data.items.length > 0) {
          setVideoId(data.items[0].id.videoId);
        }
      } catch (error) {
        console.log("Error fetching video");
      }
    };

    fetchVideo();
  }, [artist, song]);

  if (!videoId) return <p>Loading video...</p>;

  return (
    <div className="video">
      <h3>🎧 Playing Song</h3>
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube player"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default VideoPlayer;