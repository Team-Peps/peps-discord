function cleanDisplayName(name) {
    return name
        .normalize("NFKD")                         // décompose lettres accentuées + stylisées
        .replace(/[^a-zA-Z0-9 ]/g, '')             // garde lettres/chiffres/espace seulement
        .replace(/\s+/g, ' ')
        .trim();
}

async function sendLegends(legends) {

    if(legends.length === 0) {
        console.log("❌ Aucune légende à envoyer");
        return;
    }

    const response = await fetch(process.env.API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(legends)
    });

    if (!response.ok) {
        console.error(`❌ Erreur lors de l'envoi des légendes : ${response.statusText}`);
        return;
    }

    const text = await response.text();
    console.log(`✅ Légendes envoyées avec succès : ${text}`);
}

module.exports = {
    cleanDisplayName,
    sendLegends
}