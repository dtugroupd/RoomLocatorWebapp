FROM node:alpine AS builder

WORKDIR /app

COPY . .
COPY nginx.conf /nginx.conf

WORKDIR /app
RUN npm install
RUN npm install --global @angular/cli
RUN ng build --prod

FROM nginx:alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html/
COPY --from=builder /nginx.conf /etc/nginx/conf.d/default.conf
