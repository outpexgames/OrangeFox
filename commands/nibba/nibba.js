var nibba =  require('nibba');

exports.commands = [
  'nibbafy'
]

exports.nibbafy = {
  usage: '<text>',
  description: "Convert normie text to ni🅱️🅱️a text",
  process: function(bot, msg, suffix) {
    msg.channel.send(nibba.convert(suffix));
  }
}
