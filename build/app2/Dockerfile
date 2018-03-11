FROM node:8

ARG port

ENV PORT $port

#RUN printenv

RUN mkdir -p /root/app

COPY ./ /root/app

WORKDIR /root/app

RUN rm -rf node_modules

RUN npm i -g swagger

RUN npm i

CMD ["swagger", "project", "start"]

EXPOSE $port