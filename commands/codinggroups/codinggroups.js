exports.commands = [
    "addskill",
    "removeskill"
];

exports.addskill = {
    usage: "addskill (languagerole) to add a language to your skillset",
    process: function(bot,msg,suffix) {
        var _ = require('underscore');

        var allowed = ['CSS', 'C', 'JAVA', 'NODEJS', 'GFX', 'PYTHON', 'VB', 'PHP', 'HTML', 'C#', 'UNIX', 'PERL', 'ASSEMBLY', 'TALENTLESS', 'SQL', 'JAVASCRIPT', 'LUA', 'C++'];

        if (suffix == '') {
            var skillsallowed = [];
            _.each(allowed, function(check) {
                check = check.toUpperCase();
                var rolecheck = msg.channel.guild.roles.find("name", check);
                if (!msg.member.roles.has(rolecheck.id)) {
                    skillsallowed.push(check);
                }
            });
            if (skillsallowed.length < 1) {
                return msg.reply("You already have all skills :muscle:");
            }
            return msg.reply("Please add the skill you want to be added too. you can choose from the following skills: ```\r" +  skillsallowed.join('\r').toLowerCase() + "```");
        }

        var args = suffix.split(' ');
        var command = args.shift();
        command = command.toUpperCase();
        var username = msg.author.username;

        var user = msg.channel.guild.members.find(member => member.user.username == username);

        if (_.contains(allowed,command)) {
            var role = msg.channel.guild.roles.find("name", command);
            if (msg.member.roles.has(role.id)) {
                return msg.reply("you're already in the " + role.name.toLowerCase() + " role");
            }
            user.addRole(role.id);
            return msg.reply("You have been added to the "  + role.name.toLowerCase() + " role");
        }
        else {
            return msg.reply("That role doesn't exist or is not allowed");
        }

    }
};
exports.removeskill = {
    usage: "removeskill (languagerole) to delete a role",
    process: function(bot, msg, suffix) {
        var _ = require('underscore');

        var allowed = ['CSS', 'C', 'JAVA', 'NODEJS', 'GFX', 'PYTHON', 'VB', 'PHP', 'HTML', 'C#', 'UNIX', 'PERL', 'ASSEMBLY', 'TALENTLESS', 'SQL', 'JAVASCRIPT'];

        if (suffix == '') {
            var skillsallowed = [];
            _.each(allowed, function(check) {
                check = check.toUpperCase();
                var rolecheck = msg.channel.guild.roles.find("name", check);
                if (msg.member.roles.has(rolecheck.id)) {
                    skillsallowed.push(check);
                }
            });
            if (skillsallowed.length < 1) {
                return msg.reply("You don't have any skills to delete, go add some with the $addskill command!");
            }
            return msg.reply("Please add the skill you want to remove. you currently have the following skills: ```\r" +  skillsallowed.join('\r').toLowerCase() + "```");
        }

        var args = suffix.split(' ');
        var command = args.shift();
        command = command.toUpperCase();
        var username = msg.author.username;

        var user = msg.channel.guild.members.find(member => member.user.username == username);

        if (_.contains(allowed,command)) {
            var role = msg.channel.guild.roles.find("name", command);
            if (!msg.member.roles.has(role.id)) {
                return msg.reply("you're not in the " + role.name.toLowerCase() + " role");
            }
            user.removeRole(role.id);
            return msg.reply("You have been removed from the "  + role.name.toLowerCase() + " role");
        }
        else {
            return msg.reply("That role doesn't exist or is not allowed");
        }

    }
};
