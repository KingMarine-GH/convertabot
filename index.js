require("dotenv").config();

const Discord = require("discord.js");

const axios = require("axios").default

const client = new Discord.Client();

/**
 * This function is configured for POST monitors, you can modify this function for whatever mode your monitor uses.
 * @returns {void}
 */
function startMonitor(url, time) {
    setInterval(link => {
        axios.post(link);
    }, time, url);
}

client.once("ready", () => {
    console.log("Ready!");

    if (process.env.MONITOR) {
        /**
         * Default time: 5 mins
         */
        const time = process.env.TIME || 300000

        startMonitor(process.env.MONITOR, time);
    }
});

client.on("raw", e => {
    if (e.t == "INTERACTION_CREATE") {
        console.log("received an interaction")
        // eslint-disable-next-line no-unused-vars
        const { op, d: data, s: seq, t: eventname } = e;

        const { name, options } = data.data;

        const reply = message => {
            axios.post(`https://discord.com/api/v8/interactions/${data.id}/${data.token}/callback`, {
                type: 4,
                data: {
                    content: message
                }
            }, {
                headers: {
                    Authorization: `BOT ${process.env.TOKEN}`
                }
            });
        };

        switch (name) {
            case "convert-temp": {
                const temp = options[1].value;

                switch (options[0].value) {
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