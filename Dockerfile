FROM node:14.18-alpine

ADD . /app
WORKDIR /app
## eliminar default y ponerle default al otro. mv
RUN ls
RUN cd config && rm -f default.json && mv default-docker.json default.json
RUN npm i && npm run build
ENTRYPOINT ["npm", "run","production"]
