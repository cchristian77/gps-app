-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMINISTRATOR', 'USER');

-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('AIRCRAFT', 'PERSONAL', 'ASSET');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "token" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gps" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" VARCHAR(255) NOT NULL,
    "device_type" "DeviceType" NOT NULL DEFAULT 'PERSONAL',

    CONSTRAINT "gps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gps_id" INTEGER NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "timestamp" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "gps_code_key" ON "gps"("code");

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_gps_id_fkey" FOREIGN KEY ("gps_id") REFERENCES "gps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
