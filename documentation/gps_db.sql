-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               PostgreSQL 14.7 (Debian 14.7-1.pgdg110+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit
-- Server OS:                    
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table public.device_types
CREATE TABLE IF NOT EXISTS "device_types" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''device_types_id_seq''::regclass)',
	"uuid" UUID NOT NULL,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	"update_at" TIMESTAMPTZ NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	"name" VARCHAR(100) NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "device_types_name_key" ("name")
);

-- Dumping data for table public.device_types: -1 rows
/*!40000 ALTER TABLE "device_types" DISABLE KEYS */;
INSERT INTO "device_types" ("id", "uuid", "created_at", "update_at", "name") VALUES
	(1, 'c836e4ad-ee3c-401e-80f5-607e5c56318f', '2023-11-20 08:25:12.118+00', '2023-11-20 08:25:12.118+00', 'Aircraft'),
	(2, '50e95ae2-728d-49a8-868b-46f392e061d5', '2023-11-20 08:25:12.127+00', '2023-11-20 08:25:12.127+00', 'Personal'),
	(3, 'ab2af194-f217-4b7f-97bb-453e208798d8', '2023-11-20 08:25:12.132+00', '2023-11-20 08:25:12.132+00', 'Asset');
/*!40000 ALTER TABLE "device_types" ENABLE KEYS */;

-- Dumping structure for table public.gps
CREATE TABLE IF NOT EXISTS "gps" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''gps_id_seq''::regclass)',
	"uuid" UUID NOT NULL,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	"update_at" TIMESTAMPTZ NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	"code" VARCHAR(255) NOT NULL,
	"device_type_id" INTEGER NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "gps_code_key" ("code"),
	CONSTRAINT "gps_device_type_id_fkey" FOREIGN KEY ("device_type_id") REFERENCES "device_types" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Dumping data for table public.gps: -1 rows
/*!40000 ALTER TABLE "gps" DISABLE KEYS */;
INSERT INTO "gps" ("id", "uuid", "created_at", "update_at", "code", "device_type_id") VALUES
	(1, 'a188f178-26d7-4bae-b784-36eadae85872', '2023-11-20 08:25:12.192+00', '2023-11-20 08:25:12.192+00', 'D-1567', 1),
	(2, '07963df9-0a79-4b79-b328-331f14a69d7a', '2023-11-20 08:25:12.209+00', '2023-11-20 08:25:12.209+00', 'D-1568', 2),
	(3, 'cdf7d015-b074-4fcd-a8ff-a4bddc970f61', '2023-11-20 08:25:12.228+00', '2023-11-20 08:25:12.228+00', 'D-1569', 3),
	(4, 'a3962ce5-c805-4f7e-be5d-332a1e274b34', '2023-11-20 08:25:12.239+00', '2023-11-20 08:25:12.239+00', 'D-1570', 2),
	(5, 'd2c8cc6d-5784-42d6-996a-11adeeb93d46', '2023-11-20 08:25:12.246+00', '2023-11-20 08:25:12.246+00', 'D-1571', 3),
	(6, '32d6420d-f890-4603-94d3-c3544e880e03', '2023-11-20 08:25:12.255+00', '2023-11-20 08:25:12.255+00', 'D-1572', 3);
/*!40000 ALTER TABLE "gps" ENABLE KEYS */;

-- Dumping structure for table public.gps_locations
CREATE TABLE IF NOT EXISTS "gps_locations" (
	"gps_id" INTEGER NOT NULL,
	"location_id" INTEGER NOT NULL,
	"timestamp" TIMESTAMPTZ NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	PRIMARY KEY ("gps_id", "location_id", "timestamp"),
	CONSTRAINT "gps_locations_gps_id_fkey" FOREIGN KEY ("gps_id") REFERENCES "gps" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT "gps_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

-- Dumping data for table public.gps_locations: -1 rows
/*!40000 ALTER TABLE "gps_locations" DISABLE KEYS */;
INSERT INTO "gps_locations" ("gps_id", "location_id", "timestamp") VALUES
	(1, 1, '2023-08-31 10:05:00+00'),
	(1, 2, '2023-08-31 10:25:00+00'),
	(1, 1, '2023-08-31 10:20:00+00'),
	(1, 1, '2023-08-31 10:15:00+00'),
	(1, 1, '2023-08-31 10:10:00+00'),
	(2, 3, '2023-08-31 10:05:00+00'),
	(2, 3, '2023-08-31 10:25:00+00'),
	(2, 3, '2023-08-31 10:20:00+00'),
	(2, 3, '2023-08-31 10:15:00+00'),
	(2, 3, '2023-08-31 10:10:00+00'),
	(3, 4, '2023-08-31 10:15:00+00'),
	(3, 1, '2023-08-31 10:35:00+00'),
	(3, 1, '2023-08-31 10:30:00+00'),
	(3, 4, '2023-08-31 10:20:00+00'),
	(4, 5, '2023-08-31 10:35:00+00'),
	(5, 6, '2023-08-31 10:35:00+00'),
	(6, 6, '2023-08-31 10:35:00+00'),
	(6, 6, '2023-08-31 10:40:00+00');
/*!40000 ALTER TABLE "gps_locations" ENABLE KEYS */;

-- Dumping structure for table public.locations
CREATE TABLE IF NOT EXISTS "locations" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''locations_id_seq''::regclass)',
	"uuid" UUID NOT NULL,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	"update_at" TIMESTAMPTZ NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	"name" VARCHAR(255) NOT NULL,
	"latitude" NUMERIC(9,6) NOT NULL,
	"longitude" NUMERIC(9,6) NOT NULL,
	PRIMARY KEY ("id"),
	UNIQUE INDEX "locations_name_key" ("name")
);

-- Dumping data for table public.locations: -1 rows
/*!40000 ALTER TABLE "locations" DISABLE KEYS */;
INSERT INTO "locations" ("id", "uuid", "created_at", "update_at", "name", "latitude", "longitude") VALUES
	(1, 'd7eef278-f918-4117-a9eb-021bd19758da', '2023-11-20 08:25:12.139+00', '2023-11-20 08:25:12.139+00', 'L1', 1.500000, 3.500000),
	(2, '02856c58-96f6-4076-b676-0e04333e5898', '2023-11-20 08:25:12.146+00', '2023-11-20 08:25:12.146+00', 'L2', 1.500000, 3.500000),
	(3, 'f0364454-ec45-4e6e-aebc-d63614655312', '2023-11-20 08:25:12.153+00', '2023-11-20 08:25:12.153+00', 'L3', 1.500000, 3.500000),
	(4, '6d306c20-541f-4365-a232-604bb2b1e372', '2023-11-20 08:25:12.16+00', '2023-11-20 08:25:12.16+00', 'L4', 1.500000, 3.500000),
	(5, '0a978097-4712-42dc-8439-53bffd7c9940', '2023-11-20 08:25:12.169+00', '2023-11-20 08:25:12.169+00', 'L5', 1.500000, 3.500000),
	(6, '96be2d02-1dbd-4f37-b99e-c3d1cf3fc516', '2023-11-20 08:25:12.179+00', '2023-11-20 08:25:12.179+00', 'L6', 1.500000, 3.500000);
/*!40000 ALTER TABLE "locations" ENABLE KEYS */;

-- Dumping structure for table public.users
CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''users_id_seq''::regclass)',
	"uuid" UUID NOT NULL,
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	"update_at" TIMESTAMPTZ NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
	"username" VARCHAR(100) NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	"password" TEXT NOT NULL,
	"full_name" VARCHAR(255) NOT NULL,
	"token" TEXT NULL DEFAULT NULL,
	"role" UNKNOWN NOT NULL DEFAULT 'USER',
	PRIMARY KEY ("id"),
	UNIQUE INDEX "users_username_key" ("username"),
	UNIQUE INDEX "users_email_key" ("email")
);

-- Dumping data for table public.users: -1 rows
/*!40000 ALTER TABLE "users" DISABLE KEYS */;
INSERT INTO "users" ("id", "uuid", "created_at", "update_at", "username", "email", "password", "full_name", "token", "role") VALUES
	(1, '0dd4df3d-a9aa-4cc2-81bd-291913a2f914', '2023-11-20 08:25:12.097+00', '2023-11-20 08:25:12.097+00', 'administrator', 'administrator@example.com', '$2b$10$aqxPaNVO0TtTEWmKFrCSEu8FthrCs9f6QEg4QIjmBsL.8lg5D7R66', 'Administrator', NULL, 'ADMINISTRATOR'),
	(2, '50831cda-4198-418b-afb8-b28a30a6686b', '2023-11-20 08:25:12.11+00', '2023-11-20 08:25:12.11+00', 'justin_bieber', 'justin_bieber@example.com', '$2b$10$ZVutWh/Wn8shnadSwz8NNeB8Y87ZYEYe8LYWbMmkcZDFpR.hzhqce', 'Justin Bieber', NULL, 'USER');
/*!40000 ALTER TABLE "users" ENABLE KEYS */;

-- Dumping structure for table public._prisma_migrations
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" VARCHAR(36) NOT NULL,
	"checksum" VARCHAR(64) NOT NULL,
	"finished_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"migration_name" VARCHAR(255) NOT NULL,
	"logs" TEXT NULL DEFAULT NULL,
	"rolled_back_at" TIMESTAMPTZ NULL DEFAULT NULL,
	"started_at" TIMESTAMPTZ NOT NULL DEFAULT 'now()',
	"applied_steps_count" INTEGER NOT NULL DEFAULT '0',
	PRIMARY KEY ("id")
);

-- Dumping data for table public._prisma_migrations: -1 rows
/*!40000 ALTER TABLE "_prisma_migrations" DISABLE KEYS */;
INSERT INTO "_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
	('e24ffe5e-2ed7-474d-9611-a4139aabe04b', '83871aeb8f6a6c110b21fc336743c22eded0b1fcccbb5537d292855c9e594f47', '2023-11-20 08:25:05.768616+00', '20231118143729_create_tables_schema', NULL, NULL, '2023-11-20 08:25:05.690174+00', 1);
/*!40000 ALTER TABLE "_prisma_migrations" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
