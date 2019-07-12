FROM node:12.6.0

ENV APP_ROOT /app

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install

ENV HOST 0.0.0.0

CMD ["npm", "run", "dev"]
