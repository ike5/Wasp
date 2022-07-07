/**
 * Basic messages to send to users
 */
const rules = `Please review the #rules channel.`
const checkin = `Use the #check-in-check-out channel.`

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

bot.on('message', async msg => {
  if (msg.content.startsWith('!intro ')) {
    if (msg.channel.id.toString() !== INTRODUCTIONS_CHANNEL_ID) {
      const introductionsChannelName =
        msg.guild.channels.resolve(INTRODUCTIONS_CHANNEL_ID).name
      return msg.reply(
      `Please use !intro command in the ${introductionsChannelName} channel!`
      )
    }

    const introMsg = msg.content.substring('!intro '.length).trim()
    const minMsgLength = 20
    if (introMsg.length < minMsgLength) {
      return msg.reply(
        `Please write introduction at least ${minMsgLength} characters long!`
      )
    }

    const member = msg.guild.member(msg.author)
    try {
      if (member.roles.cache.get(GUEST_ROLE_ID)) {
        await member.roles.remove(GUEST_ROLE_ID)
        return msg.reply(
          'Nice getting to know you! You are no longer a guest' +
          ' and have full access, welcome!'
        )
      }
    } catch (error) {
      return msg.reply(`Error: ${error}`)
    }
  }
})

