# ShutterWebshop
> Web Technologies II. assignment
---
### Prerequisites
All the `code` required to get started. `Linux` is recommended because of the docker-mongo. This things you need to install:
- Docker
```
$ sudo apt install docker.io
$ sudo systemctl start docker
$ sudo systemctl enable docker
$ sudo groupadd docker
$ sudo usermod -a -G docker $USER
```
> You need to logout then login
- mongodb-clients
```
$ sudo apt-get install mongodb-clients
```
- <a href="https://github.com/nvm-sh/nvm" target="_blank">Node Version Manager</a>
```
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```
> Reset the terminal
- Node (<a href="https://github.com/nvm-sh/nvm#usage" target="_blank">install with nvm</a>)
```
$ nvm install node
```
- <a href="https://sass-lang.com/ruby-sass" target="_blank">Ruby Sass</a>
```
$ sudo apt install ruby-sass
```
---
## Installation
Clone this repo to your local machine using https://github.com/MihalyPapp/ShutterWebshop.git
```
$ npm install
$ cd client
$ npm install
$ npm run-script build
$ cd ..
$ npm start
$ cd database
$ sh mongo-shutter-webshop.sh
```
Server listening on http://localhost:8080
