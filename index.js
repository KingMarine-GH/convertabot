require("dotenv").config();

const Discord = require("discord.js");

const axios = require("axios").default;

const client = new Discord.Client();

/**
 * This function is configured for POST monitors, you can modify this function for whatever mode your monitor uses.
 * @returns {void}
 */
function startMonitor(url, time) {
    axios.post(url).then(() => {
        console.log("Sent a push to monitor");
    });
    setInterval(link => {
        axios.post(link).then(() => {
            console.log("Sent a push to monitor");
        });
    }, time, url);
}

client.once("ready", () => {
    console.log("Ready!");

    if (process.env.MONITOR) {
        /**
         * Default time: 5 mins
         */
        const time = process.env.TIME || 300000;

        startMonitor(process.env.MONITOR, time);
    }
});

client.on("raw", e => {
    if (e.t == "INTERACTION_CREATE") {
        console.log("received an interaction");
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

        const original_unit = options[0].value;
        
        switch (name) {
            case "convert-temp": {
                const value = options[1].value;

                switch (original_unit) {
                    // option 0 is original temp
                    case "C":
                        reply(`${value}ºC = ${Math.round(((value * (9/5)) + 32) * 100) / 100}ºF`);
                        break;
                    case "F":
                        reply(`${value}ºF = ${Math.round(((value - 32) * (5/9)) * 100) / 100}ºC`);
                        break;
                }
                break;
            }
            case "convert-dist": {
                const desired_unit = options[1].value;
                let value = options[2].value;
                let system;

                // workflow:
                // if metric:
                //  convert to meter
                // else
                //  convert to inch
                // then
                //  convert it to meter or inch
                //  convert that to the desired unit

                switch(original_unit) {
                    case "km": {
                    //  1km    = 1000m
                        value *= 1000;
                        system = "metric";
                        break;
                    }
                    case "m": {
                        // no changes needed: already in base unit
                        system = "metric";
                        break;
                    }
                    case "in": {
                        // no changes needed: already in base unit
                        system = "imperial";
                        break;
                    }
                    case "ft": {
                        system = "imperial";
                    //  1ft    = 12in
                        value *= 12;
                        break;
                    }
                    case "yd": {
                        system = "imperial";
                    //  1yd    = 36in
                        value *= 36;
                        break;
                    }
                    case "mi": {
                        system = "imperial";
                    //  1mi    = 63360in
                        value *= 63360;
                        break;
                    }
                }
                // checks if system is already metric and if desired unit is also metric, returns the opposite
                if (!(system == "metric" && (desired_unit == "km" || desired_unit == "m"))) {
                    // system and unit doesn't match, converting it to the base counterparts
                    switch(system) {
                        case "metric": {
                            // convert meters to inches
                            value *= 39.37;
                            break;
                        }
                        case "imperial": {
                            // convert inches to meters
                            value /= 39.37;
                            break;
                        }
                    }
                }
                
                switch(desired_unit) {
                    case "km": {
                    //  1000m  = 1km
                        value /= 1000;
                        break;
                    }
                    case "m": {
                        // no changes needed, again
                        break;
                    }
                    case "in": {
                        // no changes needed
                        break;
                    }
                    case "ft": {
                    //  12 in  = 1 ft
                        value /= 12;
                        break;
                    }
                    case "yd": {
                    //  36 in  = 1 yd
                        value /= 36;
                        break;
                    }
                    case "mi": {
                    //  63360 in = 1 mi
                        value   /= 63360;
                        break;
                    }
                }

                value = Math.round(value * 100) / 100;
                
                reply(`${options[2].value}${original_unit} = ${value}${desired_unit}`);
            }
        }
    }
});

client.login(process.env.TOKEN);