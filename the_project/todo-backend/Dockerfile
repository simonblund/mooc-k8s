FROM node:24-alpine3.21 AS build-env
COPY . /app
WORKDIR /app

RUN npm ci
RUN npm run build


FROM gcr.io/distroless/nodejs24-debian12
COPY --from=build-env /app /app
WORKDIR /app

CMD ["dist/index.js"]