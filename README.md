## Bot posting Covid-19 moroccan's stats to a Telegram channel

* Create a .env file based on .env.template
* Fill the blanks in the .env file
* docker-compose up --build

Stats source: http://www.covidmaroc.ma/

/!\ WIP /!\ Any contribution is welcome

## TODO
- [ ] Switch to TypeScript
- [ ] Add unit tests
- [ ] Add static tests and integrate them with vscode
- [ ] Reduce dependencies count and size
- [ ] (maybe) Bundle code into main.js and vendor.js files
- [ ] Apply Node dockerization best practices:
* https://medium.com/better-programming/docker-for-node-js-in-production-b9dc0e9e48e0
* https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
* https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
* https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/
- [ ] Setup CI/CD
- [ ] Enhance error handling
- [ ] More logs to console and channel admins
- [ ] Add contribution guidelines
- [ ] Rework the notification content, more text and less JSON
- [ ] Deploy the bot on a public dedicated Telegram channel
