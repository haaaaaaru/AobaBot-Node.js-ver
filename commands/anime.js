//   !애니
//관련 구문 

const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

const request = require("request");
const cheerio = require("cheerio");


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
            case "검색":
                message.channel.send(mentionUser + ",  보고싶으신 애니를 뒤에 입력해주세요!");
                return message.channel.send("`Ex. !애니 검색 뉴게임`");
            
            case "목록":
                message.channel.send(mentionUser + ",  보고싶으신 애니 목록을 뒤에 입력해주세요!");
                return message.channel.send("`Ex. !애니 목록 소드 아트 온라인`");
        }
        message.channel.send("...?");
        return message.channel.send("`Tip: !아오바 도움말`");
    }

            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    else if (args.length >= 2)
    {
        message.channel.startTyping();
        if (args[0] == "검색")
        {
            let searchResult = "";

            for (var i=1; i < args.length; i++)
            {
                searchResult = searchResult + args[i];
                if (i < args.length -1) searchResult = searchResult + "+";
            }
            //searchResult
            //!아오바 애니 플라스틱 메모리즈
            //로 검색할경우 searchResult = "플라스틱+메모리즈"

            var urlSearchResult = "https://panogas.com/?cat=2&s=" + encodeURI(searchResult); 
            //searchResult 값을 실제 검색주소로 변경

            request(urlSearchResult, function (error, response, body) {
                const $ = cheerio.load(body);

                var link = $('a').attr('href') //검색된 애니 링크저장

                if (link == "https://panogas.com"){
                    message.channel.stopTyping();
                    return message.channel.send(mentionUser + ", 해당 애니를 찾을수 없네요.. 제목에 유의해서 검색해주세요!"); //애니를 찾지 못했을 경우
                } 

                let linkimage = $('a img').attr('data-src'); //사진주소
                let animename1 = $('a h2')[0].children[0].data; //애니 이름
            
                request(link, function (error, response, body2) {
                    const $$ = cheerio.load(body2);
                    
                    let animedes; // 줄거리
                    var arrayAnimeName = new Array();
                    var arrayAnimeLink = new Array();
                    var hwa = 0;

                    $$('div[id="relatedpost"] a').each(function(index, item) { // 일반적으로 item=this
                        hwa++;
                        arrayAnimeName[index] = hwa + "화";
                        arrayAnimeLink[index] = $$(this).attr('href');
                    })

                    arrayAnimeLink.reverse();//거꾸로된 링크 정상화    
                    
                    if ($$('.infomation').length == 1)
                    {
                        animedes = "없음"
                    }
                    else if ($$('.infomation').length == 2)
                    {
                        if ($$('.infomation')[1].children.length == 9 || $$('.infomation')[1].children.length == 1) animedes = "없음"; //줄거리가 없을경우 없음으로
                        else{
                            animedes = $$('.infomation')[1].children[10].data; //애니 줄거리
                        }
                    }

                
                    //여기서부터 실제 Embed 출력 관련 구문
                    let sEmbed2 = new Discord.MessageEmbed()

                    sEmbed2
                    .addField("줄거리", animedes, false);
                    
                    if (arrayAnimeName.length == 0 || arrayAnimeName == undefined || arrayAnimeLink == undefined) return;
                    else if (arrayAnimeName.length > 0)
                    {
                        var mylength = arrayAnimeName.length;
                        var value = 0;
                        while (mylength != 0)
                            {
                                sEmbed2.addField(arrayAnimeName[value], `[클릭](${arrayAnimeLink[value]})`, true);
    
                                mylength--;
                                value++;
                            }
                    }
                    
                    sEmbed2.setAuthor("::  검색 결과  ::")
                    .setColor(colors.yellow)
                    if (animename1 == "코바야시네의 메이드래곤 OVA")
                    {
                        animename1 = "코바야시네의 메이드래곤";
                    }

                    sEmbed2.setTitle(animename1) //제목    

                    .setFooter("Made by !!@3979     ||     linkkf.com")
                    .setThumbnail(linkimage);
                    message.channel.stopTyping();
                    message.channel.send({embed: sEmbed2});
                    message.channel.send("`Tip 1: 원하시는 결과가 나오지 않았을 경우 검색어, 띄어쓰기를 조정해보세요!`");
                    return message.channel.send("`Tip 2: OVA만 나오실 경우 [ !애니 목록 ] 을 이용해보세요!`");
                })
            });

            return;

            
        }
        message.channel.stopTyping();
        message.channel.send("...?");
        return message.channel.send("`Tip: !아오바 도움말`");
    }


}

module.exports.config = {
    name: "애니",
    aliases: []
}