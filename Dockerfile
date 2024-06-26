FROM node:latest
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 3001

# Run the code
CMD [ "node", "app.js" ]