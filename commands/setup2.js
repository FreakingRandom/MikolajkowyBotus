const discord = require('discord.js');
module.exports.run = async (msg, client, args) => {
    if (msg.member.id !== '285025528442912778' && msg.member.id !== '330768055468818435') {
        msg.delete()
    } 
    else {
        msg.delete()
        let iteration = -1
        const newrole = ['1TI1', '1TI2', '1TR', '1TET', '2TI1', '2TI2', '2TR', '2TET', '3TI1', '3TI2', '3TIP', '3TR', '3TRP', '3TET', '4TI1', '4TI2', '4TI3', '4TR1', '4TR2', '4TET']
        const buttontype = [1, 2, 1, 2, 1]
        var rowtable = []
        newrole.forEach(i => {
            iteration += 1;
            const imod = iteration % 5;
            const row = new discord.MessageActionRow()
                .addComponents(
                    new discord.MessageButton()
                    .setCustomId(i)
                    .setLabel(i)
                    .setStyle('PRIMARY')
                );
            rowtable.push(row)
            if (imod == 4) {
                msg.channel.send({
                    content: 'Wybierz swoją klasę. ⬇️',
                    components: rowtable
                });
                rowtable = []
            }
        })
        client.on('interactionCreate', async interaction => {
            if (!interaction.isButton()) return;
            const role = (await msg.guild.roles.fetch())
            const rolefind = role.find(role => role.name == interaction.customId)
            const verify = role.find(role => role.name == 'Zweryfikowany')

            if (interaction.member.roles.cache.some(role => role.name == 'Zweryfikowany') == false) {
                interaction.member.roles.add(verify);
                interaction.member.roles.add(rolefind)
            } 
            else {
                (async ()=>{
                    const responsemsg = await msg.channel.send(`${(interaction.member.toString())} masz już przypisaną klasę. Jeśli dołączyłeś do złej klasy napisz do administratora (Freaking_Random#3702 lub Myster#7218).`)
                    setTimeout(function(){responsemsg.delete()},4000)
                })()     
            }
            interaction.deferUpdate()
                .catch(console.error)
        });
    }
}
module.exports.help = {
    "name": "Setup2",
    "description": "setup"
}