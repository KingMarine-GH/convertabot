# convertabot

Simple unit converter, because Americans love their freedom units too much

## Public Hosting

All of my not intensive bots will be hosted for public use (I may change my mind at any time).

For this bot, you can [invite the bot via this link](https://discord.com/api/oauth2/authorize?client_id=849130462747164732&permissions=0&scope=bot%20applications.commands).

You can find the status of all my hosted bots for the public [here](https://uptime.statuscake.com/?TestID=IRi2EiG69R).

## Installation

Once this respository has been downloaded, please run `npm i` to install all required packages.

Create the file `.env` and put `TOKEN="super-secret-token"` for the bot to run.

You can also put `MONITOR="www.monitor-service.kingmarine"` to add uptime monitoring for your bot. The bot supports POST (or push) monitors.
Add in `TIME` to set a timer for POST (timer is in miliseconds). Default is 5 mins.

Please ensure that you've already registered the commands via `command.json`. Check Discord's documentation page on how to register. Global or Guild command works.

[Global Command](https://discord.com/developers/docs/interactions/slash-commands#create-global-application-command)

[Guild Comamnd](https://discord.com/developers/docs/interactions/slash-commands#create-guild-application-command)

## Commands

This bot currently has 2 commands: 

- `/convert-temp`. It converts F to C and vice versa.
- `/convert-dist`, It converts distances.

## Copyright

convertabot: Converts one unit to another.
Copyright (C) 2021  KingMarine

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
