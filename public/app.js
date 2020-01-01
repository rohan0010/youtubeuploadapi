var apple = require("../app");
console.log(apple);

function onYouTubeIframeAPIReady() {
  var player;
  player = new YT.Player("yt-embed", {
    // Replaces the <div id="yt-embed"> with an iframe
    videoId: "bpOSxM0rNPM", // Video ID
    width: 960, // Video width
    height: 600, // Video height
    playerVars: {
      autoplay: 1, // Auto-play
      controls: 0, // Turn off controls
      showinfo: 0, // Hide the video title
      modestbranding: 1, // Hide all YouTube branding
      loop: 1, // Loop video
      fs: 0, // Remove full screen button
      cc_load_policy: 1, // Turn off closed captions
      iv_load_policy: 3, // Turn off annotations
      autohide: 1, // Turn off controls auto-hiding
      rel: 0, // Turn off related content on pause
      disablekb: 1 // Turn off keyboard controls
    },
    events: {
      onReady: function(e) {
        e.target.mute();
      }
    }
  });
}
