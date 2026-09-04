const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.DirectMessages
    ]
});

const TARGET_GUILD_ID = '1542403524321615934';

client.once('ready', () => {
    console.log(`تم تسجيل الدخول بنجاح باسم: ${client.user.tag}`);
});


client.on('guildMemberAdd', async (member) => {
    
    if (member.guild.id !== TARGET_GUILD_ID) return;

    try {
        await member.send('# BYEE');
        console.log(`تم إرسال الرسالة بنجاح إلى العضو: ${member.user.tag}`);
    } catch (error) {
        console.log(`تعذر إرسال رسالة خاصة إلى العضو ${member.user.tag} (قد يكون قفل الخاص).`);
    }
});


client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!byee') {
        const guild = client.guilds.cache.get(TARGET_GUILD_ID);
        
        if (!guild) {
            return message.reply('عذراً، السيرفر غير متوفر حالياً لدى البوت.');
        }

        
        try {
            const member = await guild.members.fetch(message.author.id);
            
            if (member) {
                await message.author.send('# BYEE');
                message.reply('BYEE ✅');
            }
        } catch (error) {
            
            message.reply('BYEE ❌ : https://discord.gg/ACBGKdcvz');
        }
    }
});

const { token } = require('./config.json');


client.login(token);
