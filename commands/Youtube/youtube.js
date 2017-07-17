var config = require('../../config.json');
var YouTube = require('youtube-node');

var youTube = new YouTube();
youTube.setKey(config.youtube_api_key);

exports.commands = [
  'youtube'
]

exports.youtube = {
  usage: "<query>",
  process: function (bot, msg, suffix) {
    youTube.search(suffix, 1, function(error, result) {
    if (error) {
      msg.channel.send("¯\\_(ツ)_/¯");
      console.log(error);
    }
    else {
      if (!result || !result.items || result.items.length < 1) {
        msg.channel.send("No results ¯\\_(ツ)_/¯");
      } else {
        msg.channel.send("http://www.youtube.com/watch?v=" + result.items[0].id.videoId );
      }
    }
  });
  }
}
