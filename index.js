require("dotenv").config();

const Discord = require("discord.js");

const axios = require("axios").default({
    baseURL: "https://discord.com/api/v8",
    headers: `BOT ${process.env.TOKEN}`
});

const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

client.on("raw", e => {
    if (e.t == "INTERACTION_CREATE") {
        // eslint-disable-next-line no-unused-vars
        const { op, d: data, s: seq, t: eventname } = e;

        const { name, options } = data.data;

        const reply = message => {
            axios.post(`/interactions/${data.id}/${data.token}/callback`, {
                type: 4,
                data: {
                    content: message
                }
            });
        };

        switch (name) {
            case "convert-temp": {
                const temp = options[1];

                switch (options[0]) {
                    // option 0 is original temp
                    case "C":
                        reply(`${temp}ºC = ${(temp * (9/5)) + 32}ºF`);
                        break;
                    case "F":
                        reply(`${temp}ºF = ${(temp - 32) * (5/9)}ºC`);
                        break;
                }
                break;
            }
        }
    }
});

client.login(process.env.TOKEN);