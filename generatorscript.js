/// Get references to the necessary DOM elements
const playlistInput = document.getElementById('playlist-input');
const generatePlaylistButton = document.getElementById('generate-playlist-button');
const playlistTracks = document.getElementById('playlist-tracks');
const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('stop-button');
const skipButton = document.getElementById('skip-button');
const audioVisualizer = document.getElementById('audio-visualizer');

// Define event listeners for the Generate Playlist button, audio player, and audio controls
generatePlaylistButton.addEventListener('click', generatePlaylist);
audioPlayer.addEventListener('ended', playNextTrack);
playButton.addEventListener('click', playTrack);
stopButton.addEventListener('click', stopTrack);
skipButton.addEventListener('click', skipTrack);

function generatePlaylist() {
  // Get the list of artists from the playlist input
  const artistList = playlistInput.value.split(',');

  // Make a request to the Spotify API to search for tracks by the artists
  fetch(`https://api.spotify.com/v1/search?q=${artistList.join('+')}&type=track`, {
  headers: {
    Authorization: `Bearer BQBZJHLYazp0nhd5UVzqg3kvUWXbBmA3c62MwOjh25u2PxWv-jSG01uWTlRsMHiXzM-rrgNy9KqkOstARZYSIdAiAyhz-OgXgOnf5Se2HRsJQDTMoBr8oodtoaHVfoPCVmwuB3RmxbCmSIrKaLUkAJblAJI5gVk6B1bzznQ5S5qobZnozxtiVmHwn-zVkriF6qGfnkS3PI-RTpo8USvTV2c`
      }
      })
    .then(response => response.json())
    .then(data => {
      // Clear any existing tracks from the playlist
      playlistTracks.innerHTML = '';
      audioPlayer.src = data.tracks.items[0].preview_url;
      // Add the tracks to the playlist
      for (const track of data.tracks.items) {
        const trackItem = document.createElement('li');
        trackItem.innerHTML = `<strong>${track.name}</strong> - ${track.artists[0].name}`;
        trackItem.setAttribute('data-track-preview-url', track.preview_url);
        trackItem.addEventListener('click', playTrack);
        playlistTracks.appendChild(trackItem);
      }
    });
    
}

 // Define the AudioContext and MediaElementSourceNode objects globally
 const audioCtx = new AudioContext();
 const audioSrc = audioCtx.createMediaElementSource(audioPlayer);
 
function playTrack() {
    // Set the audio player's source to the selected track's preview URL
    // audioPlayer.src = this.getAttribute('data-track-preview-url');
    audioPlayer.src = data.tracks.items[0].preview_url;
    // Start playing the track
    //audioPlayer.play();

    // Set up the audio visualizer
    // const audioCtx = new AudioContext();
    // const audioSrc = audioCtx.createMediaElementSource(audioPlayer);
    const analyser = audioCtx.createAnalyser();
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);
  
    // // Set up the canvas for the audio visualizer
    // const canvasCtx = audioVisualizer.getContext('2d');
    // analyser.fftSize = 2048;
    // const bufferLength = analyser.frequencyBinCount;
    // const dataArray = new Uint8Array(bufferLength);
    // const WIDTH = audioVisualizer.width;
    // const HEIGHT = audioVisualizer.height;
    // const BAR_WIDTH = (WIDTH / bufferLength) * 2.5;
    // let barHeight;
    // let x = 0;
  
    // // Start playing the track and rendering the audio visualizer
    // audioPlayer.play();
    // draw();
  
  //   function draw() {
  //     requestAnimationFrame(draw);
  
  //     // Get the frequency data from the audio player and draw the bars on the canvas
  //     x = 0;
  //     analyser.getByteFrequencyData(dataArray);
  //     canvasCtx.fillStyle = 'rgb(0, 0, 0)';
  //     canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  //     for (let i = 0; i < bufferLength; i++) {
  //       barHeight = dataArray[i] / 2;
  //       canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
  //       canvasCtx.fillRect(x, HEIGHT - barHeight / 2, BAR_WIDTH, barHeight / 2);
  //       x += BAR_WIDTH + 1;
  //     }
  //   }

  //   audioPlayer.play();

  }
  

// function playNextTrack() {
//   // Get the currently playing track
//   const currentTrack = playlistTracks.querySelector('li.playing');

//   // If there is a currently playing track, find the next track in the playlist
//   if (currentTrack) {
//     // Get the next track in the playlist
//     const nextTrack = currentTrack.nextElementSibling;

//     // If there is a next track, set the audio player's source to the next track's preview URL and play it
//     if (nextTrack) {
//       audioPlayer.src = nextTrack.getAttribute('data-track-preview-url');
//       audioPlayer.play();
//     }
//   }
// }

// function stopTrack() {
//   // Stop the currently playing track
//   audioPlayer.pause();
//   audioPlayer.currentTime = 0;
// }

// function skipTrack() {
//   // Stop the current track
//   stopTrack();

//   // Play the next track in the playlist
//   playNextTrack();
// }