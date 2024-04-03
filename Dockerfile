FROM node:18 as build


WORKDIR /temp

COPY ./package.json /temp
COPY ./tsconfig.json /temp
RUN npm i 
COPY ./src /temp/src
RUN npm run build


FROM node:18 

WORKDIR /app

COPY ./package.json /app
RUN npm install --production
COPY --from=build /temp/dist /app/


