module.exports = function (bot) {

  const authors = [];
  const warnBuffer = 3;
  const maxBuffer = 5;

  var warned = 0;
  var banned = 0;

  bot.on('message', msg => {
    if(msg.author.id != bot.user.id){
      var now = Math.floor(Date.now());
      authors.push({
        "time": now,
        "author": msg.author.id,
        "message": msg.content
      });

      matched = 0;

      for (var i = 0; i < authors.length; i++) {
        if (authors[i].time > now - 1000) {
          matched++;
          if (matched == warnBuffer && !warned) {
            warned = true;
            msg.reply("stop spamming or I'll whack your head off.");
          }
          if (matched == maxBuffer) {
            if (!banned) {
              msg.channel.send(msg.author + " has been banned for spamming, anyone else?");
              banned = true;
            }
            // Ban the user
            var user = msg.channel.guild.members.find(member => member.user.id === msg.author.id);
            if (user) {
              user.ban().then((member) => {
                 console.log("The ban hammer has spoken");
             }).catch(() => {
                 //console.log("Unable to ban for spamming, insufficient permissions or user must be a mod");
             });
            }
          }
        }
        else if (authors[i].time < now - 1000) {
          authors.splice(i);
          warned = false;
          banned = false;
        }
      }
    }
  });

}
