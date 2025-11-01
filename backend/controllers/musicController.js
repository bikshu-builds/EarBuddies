// controllers/musicController.js
import axios from "axios";

export const getSongs = async (req, res) => {
  try {
    const { term = "telugu", limit = 50 } = req.query;

    const response = await axios.get(
      `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=${limit}`
    );

    const songs = response.data.results.map((song) => ({
      trackName: song.trackName,
      artistName: song.artistName,
      previewUrl: song.previewUrl,
      artworkUrl100: song.artworkUrl100,
      trackId: song.trackId,
    }));

    res.json(songs);
  } catch (error) {
    console.error("❌ Error fetching songs:", error.message);
    res.status(500).json({ message: "Failed to fetch songs" });
  }
};
