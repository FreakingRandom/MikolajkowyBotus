const discord = require('discord.js');
module.exports.run = async (msg, client, args) => {
    if (msg.member.id !== '285025528442912778' && msg.member.id !== '330768055468818435') {
        msg.delete()
    } else {
        msg.delete()

        embed = new discord.MessageEmbed()
        embed.addField(`**Zasady serwera**`, `1.Prosimy o przestrzeganie standardów netykiety.
        2.Próby DoS'owania bota (spam komendami lub spam guzikami) będą karane usunięciem z danej osoby z rozgrywek.
        3.Każdej osobie uczestniczącej powinna zostać przypisana ranga, która pozwala na zobaczenie kanałów z daną grą. Jeśli ranga nie zostanie przypisana bądź bot ulegnie awarii prosimy bezzwłocznie poinformować twórce lub hosta bota (Freaking_Random#3702 - Twórca), (Myster#7218 - Host) na dm.`)
        embed.setTitle(`**Regulamin**`)
        embed.setColor(`fc0303`)

        embed2 = new discord.MessageEmbed()
        embed2.addField('**Uwaga!**', `Klikając jeden z poniższych przycisków akceptujesz regulamin oraz zostanie ci przypisana ranga`)
        embed2.setTitle(`**Gierki Mikołajkowe**`)
        embed2.setThumbnail(`https://images-ext-2.discordapp.net/external/hCTk9zzzsTfXxFZyPdOs222HND4AfS6JMPWQvYHCgRc/https/cdn-icons-png.flaticon.com/512/621/621904.png`)
        embed2.setColor(`fc0303`)

        msg.channel.send({
            embeds: [embed, embed2]

        })

        const newrole = ['Rocket League', 'Counter Strike', 'Brawlhalla','League of Legends','WoT']
        var rowtable = []
        newrole.forEach(i => {
            const row = new discord.MessageActionRow()
                .addComponents(
                    new discord.MessageButton()
                    .setCustomId(i)
                    .setLabel(i)
                    .setStyle('DANGER')
                );
            rowtable.push(row)

        })
        msg.channel.send({
            content: 'Wybierz grę w której chcesz uczestniczyć. ⬇️',
            components: rowtable
        });
        client.on('interactionCreate', async interaction => {
            if (!interaction.isButton()) return;
            const role = (await msg.guild.roles.fetch())
            const rolefind = role.find(role => role.name == interaction.customId)

            interaction.member.roles.add(rolefind)
            interaction.deferUpdate()
            interaction.followUp({content:`${(interaction.member.toString())} została ci przypisana ranga ${rolefind}.`,ephemeral:true})
        });
    }
}

module.exports.help = {
    "name": "Setup",
    "description": "setup"
}