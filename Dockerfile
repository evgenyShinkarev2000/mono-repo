FROM node:current-alpine as stage-prepare-packages
WORKDIR /build
COPY . .
# Remove all files except package.json and yarn.lock with saving folder structure
RUN find . ! '(' -name package.json -o -name yarn.lock ')' -delete

# yarn install run after copy package.json but before copy other files. Yarn install is cached.
FROM node:current-alpine as stage-build
WORKDIR /build
COPY --from=stage-prepare-packages /build .
RUN yarn
COPY . .
RUN yarn
RUN yarn build

FROM nginx:latest as stage-server
COPY --from=stage-build /build/packages/root-project/dist usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]