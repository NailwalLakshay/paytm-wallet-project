FROM node:20-alpine

WORKDIR /app

COPY package* .

# RUN npm install -g npm@10.8.0
RUN npm install

COPY . .

#  setting up db
RUN npm run build
# RUN cd ./packages/db && npx prisma migrate dev --name init
RUN cd ./packages/db && npx prisma generate
# RUN cd ./packages/db && npx prisma db seed

EXPOSE 2000
EXPOSE 3000

# for development purpose only
CMD [ "node" , "/apps/bank-webhook/dist/index.js"  && "node" , "/apps/User/dist/index.js" ]