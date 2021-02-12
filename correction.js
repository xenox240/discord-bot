const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const prefix = `$`

client.on("ready", () => {
    console.log(`${client.user.username} est en ligne!`);
    client.user.setActivity(`$help`, { type: "PLAYING" });
})

client.on(`message`, message => {
    if(message.author.bot) return
    if(!message.guild) return
    if(!message.content.toLowerCase().startsWith(prefix)) return

    const userData = JSON.parse(fs.readFileSync(`./jsonPointID/level.json`))
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

})

    if(command === "help") {
        message.channel.send(`La commande \`${prefix}messages\` sert a voir le nombre de message que vous avez envoyé au total sur ce serveur.`)
    }

    if (command === `messages`) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`Messages total envoyés`)
        .setDescription(`Au total, vous avez envoyés : ${userData[message.author.id].messagesSent}`)
        .setColor(`344700`)
        message.channel.send(embed)
    }

client.on(`message`, message => {
    if(message.author.bot) return
    if(!message.guild) return

    const userData = JSON.parse(fs.readFileSync(`jsonPointID/level.json`))
    const sender = message.author

    if (!userData[sender.id]){
        userData[sender.id] = {
            messagesSent: 0
        }
        fs.writeFile(`./jsonPointID/level.json`, JSON.stringify(userData, null, 4), err => {
            if(err) console.log(err)
        })
    } 

    userData[sender.id].messagesSent++;
    fs.writeFile(`./jsonPointID/level.json`, JSON.stringify(userData, null, 4), err => {
        if(err) console.log(err)
    })
})

client.login(process.env.TOKEN)