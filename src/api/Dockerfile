FROM node:18-alpine

WORKDIR /app

RUN npm install -g json-server

COPY users.json .

EXPOSE 3000

CMD ["json-server", "--watch", "users.json", "--host", "0.0.0.0", "--port", "3000"]
