/**
 * Connect with the Wasp discord bot you created
 */
const Discord = require('discord.js')
require('dotenv').config()
const BOT_TOKEN = process.env['BOT_TOKEN']
const bot = new Discord.Client()

bot.login(BOT_TOKEN)

bot.on('ready', function (evt) {
    console.log(`Logged in as: ${bot.user.tag}.`)
})

/**
 * Require new users to introduce themselves with the `!intro` tag
 */
const INTRODUCTIONS_CHANNEL_ID = "992179910829416570"
const GUEST_ROLE_ID = "994632643322847273"
const DAY_OWL_ROLE_ID = "994676914314809505"
let count = 0


bot.on('message', async msg => {
    if (msg.content.startsWith('!intro ')) {

        // Not sure what this is for
        if (msg.channel.id.toString() !== INTRODUCTIONS_CHANNEL_ID) {
            const introductionsChannelName =
                msg.guild.channels.resolve(INTRODUCTIONS_CHANNEL_ID).name
            return msg.reply(
                `Please use !intro command in the ${introductionsChannelName} channel!`
            )
        }

        // Check to see if message is greater than 20 characters long
        const introMsg = msg.content.substring('!intro '.length).trim()
        const minMsgLength = 20
        if (introMsg.length < minMsgLength) {
            console.log(`User ${GUEST_ROLE_ID} attempted to login with an intro less than ${minMsgLength} characters`)

            return msg.reply(
                `Please write introduction at least ${minMsgLength} characters long!`
            )
        }

        // Remove the Role of Guest and add the role of Day Owl
        // Remember that the Guest role is created by the Mee5 bot
        const member = msg.guild.member(msg.author)
        try {
            if (member.roles.cache.get(GUEST_ROLE_ID)) {
                await member.roles.remove(GUEST_ROLE_ID)
                    .then(member.roles.add(DAY_OWL_ROLE_ID))
                console.log(`GUEST_ROLE_ID ${GUEST_ROLE_ID} successfully removed`)
                console.log(`${count++} DAY_OWL_ROLE_ID ${DAY_OWL_ROLE_ID} successfully added`)

                return msg.reply(
                    `Nice getting to know you!🎉 You are no longer a guest and have full access 🔓🔑, **Welcome!**\n\n>TODO:\n  👀Review **#rules**\n️✅Use the #check-in-check-out\n💬Join the **Lounge** voice channel (📺video on or off)`
                )
            }
        } catch (error) {
            return msg.reply(`Error: ${error}`)
        }
    }
    // } else {
    //     return msg.reply(
    //         `Something went wrong! 💥🚫😱 Please review the #rules channel on how to make your post here or contact @ike5 if you're still encountering issues.`
    //     )
    // }
})

