FROM        node:0.12.5
MAINTAINER  jdassonvil

EXPOSE      80
CMD         ["node", "index.js"]

RUN         mkdir -p /opt/app

RUN         npm install -g npm

WORKDIR     /opt/app
ADD         ./app/package.json /opt/app/package.json
RUN         npm install

ADD         ./app /opt/app
