exports.commands = [
  'magik'
]

exports.magik = {
  description: "Magik",
  process: function(bot, msg, suffix) {
    console.log(msg.attachments.MessageAttachment);
  }
}
