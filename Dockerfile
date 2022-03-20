FROM node:14

WORKDIR /usr/src/apps/vhm

COPY package*.json ./
COPY prisma ./prisma/ 

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["node", "dist/src/main"]