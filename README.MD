<p align="center">
<img src="https://i.imgur.com/6UjgBXg.png">
</p>

<p align="center">
<a href="http://nodejs.org"><img src="https://img.shields.io/badge/Node.js-6.9.1-blue.svg" alt="Node JS"></a>
<a href="http://npmjs.com"><img src="https://img.shields.io/badge/npm-4.0.5-blue.svg" alt="npm"></a>
<a><img src="https://img.shields.io/badge/Version-1.0.0-blue.svg" alt="Version"></a>
<a href="https://discord.gg/Rbx9E7V"><img src="https://discordapp.com/api/guilds/293787768218320896/widget.png" alt="Discord server"></a>
</p>

---

Orange Fox is a Discord bot intended to be able to perform various tasks, ranging from simple server moderation (Kick, ban etc.) to other functions such as the ability to stream music from youtube

this bot was made in
[Node.JS](https://nodejs.org), using the
[Discord.js](https://discord.js.org/#/) library.

## Features
- Ability to stream music from Youtube
- Moderation commands (kick, ban etc)
- Search youtube for videos
- And more

## Installation
Clone the repository
```
git clone https://github.com/Rutmeister/OrangeFox.git
```
Install Node dependencies
```
npm Install
```
Configuration
```
Create a config.json and copy the contents from config.example.json and replace the info with your details
```
Run the bot!
```
node bot
```

## Configuration
You can find all settings in the config.json file, without filling in all the details some features might not work as expected. Below you can find a quick summary of all settings in the **config.json** file

- **token**: Your discord api token
- **youtube_api_key** Your youtube api key
- **prefix** Prefix to use before commands (example: ?help where ? is the prefix)

- **admins** List of admin users allowed to run dangerous commands such as eval
- **welcome** Welcome message when a user joins the server, enabled by default
- **welcome.add_role** Add a role to the user on joining, disabled by default

- **bot_channel** Channel where the bot listens to commands, disabled by default
- **bot_channel.music** Settings for all music commands
