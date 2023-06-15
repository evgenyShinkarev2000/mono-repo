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
# Application take from .env if not defined
ARG KANBAN_API_URI
ENV KANBAN_API_URI=${KANBAN_API_URI}
ARG GANT_API_URI
ENV GANT_API_URI=${GANT_API_URI}
ARG GRADE_API_URI
ENV GRADE_API_URI=${GRADE_API_URI}
RUN yarn build

FROM nginx:latest as stage-server
COPY --from=stage-build /build/packages/root-project/dist usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]