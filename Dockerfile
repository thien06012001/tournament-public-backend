# ---------- deps ----------
FROM oven/bun:alpine AS deps
WORKDIR /app

# Disable all lifecycle scripts during install (postinstall won't run)
ENV BUN_INSTALL_DISABLE_SCRIPTS=1

COPY package.json bun.lock* ./
COPY prisma ./prisma            

RUN bun install

# ---------- build ----------
FROM oven/bun:alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate client explicitly
RUN bun x prisma generate --schema=./prisma/schema.prisma

# Build app
RUN bun run build

# ---------- runtime ----------
FROM oven/bun:alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Prisma runtime bits
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Built app
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/generated/prisma ./src/generated/prisma

EXPOSE 8000
CMD ["bun", "dist/index.js"]


# FROM oven/bun:alpine

# WORKDIR /app

# COPY package.json .
# COPY bun.lock .
# COPY prisma ./prisma
# RUN bun install

# COPY src src
# COPY tsconfig.json .

# # COPY public public

# ENV NODE_ENV production

# EXPOSE 8000

# CMD ["bun", "src/index.ts"]

