FROM node:8

RUN mkdir -p ~/app

ADD . ~/app

RUN cd ~/app

RUN npm i -g swagger

RUN npm i

CMD ["swagger", "project start"]