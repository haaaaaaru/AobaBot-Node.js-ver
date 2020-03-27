//   !아오바
//관련구문

const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    var mentionUser = `<@${message.author.id}>`;

    if (args[0] == undefined) 
    {
        message.channel.send("..?");
        return message.channel.send("`Tip: !아오바 도움말`");
    }

    else if (args.length == 1)
    {
        switch (args[0])
        {
            case "도움말":
                let sEmbed = new Discord.MessageEmbed()
                .setColor(colors.yellow)

                .setAuthor(":: 명령어 목록 ::")
                .addField("!아오바 도움말", "...", false)  
                .addField("!애니 검색 <제목>", "...", false)
                .addField("!애니 목록 <제목>", "...", false)
                .addField("!아오바 안녕", "...", false)     
                .setFooter("Made by !!@3979");

                return message.channel.send({embed: sEmbed});
            
            case "안녕":
                return message.channel.send(`안녕! ` + mentionUser);
                
        }
        message.channel.send("...?");
        return message.channel.send("`Tip: !아오바 도움말`");
    }
    else if (args.length > 1)
    {
        message.channel.send("...?");
        return message.channel.send("`Tip: !아오바 도움말`");
    }
}

module.exports.config = {
    name: "아오바",
    aliases: []
}