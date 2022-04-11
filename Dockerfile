# build stage
FROM 364595936796.dkr.ecr.ap-northeast-1.amazonaws.com/node:lts-alpine as build-stage
WORKDIR /app
 
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
 
RUN yarn build

# production stage
FROM 364595936796.dkr.ecr.ap-northeast-1.amazonaws.com/nginx-extras:1.21 as production-stage
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

