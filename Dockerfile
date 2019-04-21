FROM node:latest as admin-build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-prod

FROM nginx:alpine
COPY --from=admin-build /usr/src/app/build-prod /usr/share/nginx/html
COPY --from=admin-build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]