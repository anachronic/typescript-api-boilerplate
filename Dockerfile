FROM node:lts-buster

# Update repos and upgrade packages
RUN apt-get update -qq
RUN apt-get upgrade -yq

# Install required libs for pg_isready
RUN apt-get install -yq postgresql-client

# Create app dir
RUN mkdir -p /app
WORKDIR /app

# Copy yarn deps
COPY package.json /app
COPY yarn.lock /app

# install all deps
RUN yarn install --frozen-lockfile

# Copy files
COPY . /app

# Build
RUN yarn build

# Expose and go
EXPOSE 8080
ENTRYPOINT [ "./entrypoint.sh" ]
