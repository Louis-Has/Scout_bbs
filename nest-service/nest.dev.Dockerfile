FROM node:18-alpine

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY . .

ARG MONGO_DATABASE
ENV MONGO_DATABASE=${MONGO_DATABASE}
ARG MONGO_USERNAME
ENV MONGO_USERNAME=${MONGO_USERNAME}
ARG MONGO_PASSWORD
ENV MONGO_PASSWORD=${MONGO_PASSWORD}

# Start Next.js in development mode based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn start:dev; \
  elif [ -f package-lock.json ]; then npm run start:dev; \
  elif [ -f pnpm-lock.yaml ]; then pnpm start:dev; \
  else yarn start:dev; \
  fi