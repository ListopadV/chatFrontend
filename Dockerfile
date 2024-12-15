FROM node:18-alpine
LABEL authors="vladl"

WORKDIR /app

ENV BACKEND_URL=${BACKEND_URL}

COPY package.json package-lock.json ./
RUN npm install --production

COPY . ./

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]