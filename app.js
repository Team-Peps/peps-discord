require('dotenv').config();
const {Client, GatewayIntentBits} = require('discord.js');
const cron = require('node-cron');
const {cleanDisplayName, sendLegends} = require("./utils");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

const roleIds = process.env.DISCORD_ROLE_IDS.split(',');

client.once('ready', () => {
    console.log(`✅ Bot connecté en tant que ${client.user.tag}`);

    cron.schedule(process.env.CRON, async () => {
        console.log('🕒 Tâche CRON démarrée : récupération des membres avec un rôle spécifique');

        let membersWithRoles = [];

        const guild = client.guilds.cache.get(process.env.SERVER_ID);
        if (!guild) return console.error("❌ Serveur non trouvé");

        await guild.members.fetch();

        for(const roleId of roleIds) {
            const role = guild.roles.cache.get(roleId);
            if (!role) {
                console.log(`❌ Rôle avec ID ${roleId} non trouvé.`);
                continue;
            }

            const members = role.members.map(member => {
                return cleanDisplayName(member.displayName);
            });


            console.log(`📋 Membres du rôle "${role.name}" (${members.length}) :`);
            membersWithRoles.push(...members);
        }

        membersWithRoles = [...new Set(membersWithRoles)];

        await sendLegends(membersWithRoles);
    });});

client.login(process.env.DISCORD_TOKEN);
