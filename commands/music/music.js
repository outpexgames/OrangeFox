exports.commands = [
  'play',
  'skip',
  'queue',
  'pause',
  'volume',
  'leave',
  'clearqueue',
  'resume'
]

exports.play = {
  usage: "<query>",
  description: "Search for a song to add to the queue",
  process: function() {}
}

exports.skip = {
  usage: "<number>",
  description: "Skip a number of songs in the current queue",
  process: function() {}
}

exports.resume = {
  description: "Resume playback if paused",
  process: function() {}
}

exports.pause = {
  description: "Pause playback",
  process: function() {}
}

exports.volume = {
  usage: "<number>",
  description: "Change the volume of the music",
  process: function() {}
}

exports.leave = {
  description: "Leave music",
  process: function() {}
}

exports.clearqueue = {
  description: "Clear the entire queue",
  process: function() {}
}
