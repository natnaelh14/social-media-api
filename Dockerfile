FROM node:14

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
COPY .env /app/.env
RUN npm install
COPY . .
EXPOSE 5001
VOLUME [ "/app/node_modules"]
CMD [ "npm", "run", "dev" ]
