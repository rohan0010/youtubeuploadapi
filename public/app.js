
$(function() {

  var id;
  $.ajax({
    url:
      "https://www.googleapis.com/youtube/v3/search?key=AIzaSyBMVplnbFab5iYqbZJIffTrvEQ7JfEMIdo&channelId=UCcOna0bvz5tXvYIudEUOfPA&part=id&order=date",
    success: function(data) {
      console.log(data);
      console.log(data.items[0].id.videoId);
      id = data.items[0].id.videoId;
      localStorage.setItem("taskList", JSON.stringify(id));
    }
  });

  console.log("jjnjgb", id);
});
function onYouTubeIframeAPIReady() {
  todoList = JSON.parse(localStorage.getItem("taskList"));
  var player;
  player = new YT.Player("yt-embed", {
    // Replaces the <div id="yt-embed"> with an iframe
    videoId: todoList, // Video ID
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
