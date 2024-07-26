import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
await db.execute(sql`
 CREATE TABLE IF NOT EXISTS "nlblock_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"arr_title" varchar
);

CREATE TABLE IF NOT EXISTS "nlblock_items_locales" (
	"content" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "nlblock_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "nlblock" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "nlblock_locales" (
	"title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "nlblock_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "pages_locales" (
	"title" varchar,
	"content" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "pages_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "_nlblock_v_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"arr_title" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_nlblock_v_items_locales" (
	"content" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "_nlblock_v_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "_nlblock_v" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_nlblock_v_locales" (
	"title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "_nlblock_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "_pages_v_locales" (
	"version_title" varchar,
	"version_content" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "_pages_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

DROP TABLE "pages_blocks_nested_localized_block_items";
DROP TABLE "pages_blocks_nested_localized_block_items_locales";
DROP TABLE "pages_blocks_nested_localized_block";
DROP TABLE "pages_blocks_nested_localized_block_locales";
DROP TABLE "_pages_v_blocks_nested_localized_block_items";
DROP TABLE "_pages_v_blocks_nested_localized_block_items_locales";
DROP TABLE "_pages_v_blocks_nested_localized_block";
DROP TABLE "_pages_v_blocks_nested_localized_block_locales";
CREATE INDEX IF NOT EXISTS "nlblock_items_order_idx" ON "nlblock_items" ("_order");
CREATE INDEX IF NOT EXISTS "nlblock_items_parent_id_idx" ON "nlblock_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "nlblock_order_idx" ON "nlblock" ("_order");
CREATE INDEX IF NOT EXISTS "nlblock_parent_id_idx" ON "nlblock" ("_parent_id");
CREATE INDEX IF NOT EXISTS "nlblock_path_idx" ON "nlblock" ("_path");
CREATE INDEX IF NOT EXISTS "_nlblock_v_items_order_idx" ON "_nlblock_v_items" ("_order");
CREATE INDEX IF NOT EXISTS "_nlblock_v_items_parent_id_idx" ON "_nlblock_v_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_nlblock_v_order_idx" ON "_nlblock_v" ("_order");
CREATE INDEX IF NOT EXISTS "_nlblock_v_parent_id_idx" ON "_nlblock_v" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_nlblock_v_path_idx" ON "_nlblock_v" ("_path");
CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" ("_status");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" ("version__status");
ALTER TABLE "pages" DROP COLUMN IF EXISTS "title";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "content";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_title";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_content";
DO $$ BEGIN
 ALTER TABLE "nlblock_items" ADD CONSTRAINT "nlblock_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "nlblock"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "nlblock_items_locales" ADD CONSTRAINT "nlblock_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "nlblock_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "nlblock" ADD CONSTRAINT "nlblock_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "nlblock_locales" ADD CONSTRAINT "nlblock_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "nlblock"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_nlblock_v_items" ADD CONSTRAINT "_nlblock_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_nlblock_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_nlblock_v_items_locales" ADD CONSTRAINT "_nlblock_v_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_nlblock_v_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_nlblock_v" ADD CONSTRAINT "_nlblock_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_nlblock_v_locales" ADD CONSTRAINT "_nlblock_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_nlblock_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
await db.execute(sql`
 CREATE TABLE IF NOT EXISTS "pages_blocks_nested_localized_block_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_blocks_nested_localized_block_items_locales" (
	"title" varchar,
	"content" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "pages_blocks_nested_localized_block_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "pages_blocks_nested_localized_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_nested_localized_block_locales" (
	"title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "pages_blocks_nested_localized_block_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_nested_localized_block_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_nested_localized_block_items_locales" (
	"title" varchar,
	"content" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "_pages_v_blocks_nested_localized_block_items_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_nested_localized_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_nested_localized_block_locales" (
	"title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "_pages_v_blocks_nested_localized_block_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

DROP TABLE "nlblock_items";
DROP TABLE "nlblock_items_locales";
DROP TABLE "nlblock";
DROP TABLE "nlblock_locales";
DROP TABLE "pages_locales";
DROP TABLE "_nlblock_v_items";
DROP TABLE "_nlblock_v_items_locales";
DROP TABLE "_nlblock_v";
DROP TABLE "_nlblock_v_locales";
DROP TABLE "_pages_v_locales";
DROP INDEX IF EXISTS "pages__status_idx";
DROP INDEX IF EXISTS "_pages_v_version_version__status_idx";
ALTER TABLE "pages" ADD COLUMN "title" varchar;
ALTER TABLE "pages" ADD COLUMN "content" jsonb;
ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
ALTER TABLE "_pages_v" ADD COLUMN "version_content" jsonb;
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_block_items_order_idx" ON "pages_blocks_nested_localized_block_items" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_block_items_parent_id_idx" ON "pages_blocks_nested_localized_block_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_block_order_idx" ON "pages_blocks_nested_localized_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_block_parent_id_idx" ON "pages_blocks_nested_localized_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_block_path_idx" ON "pages_blocks_nested_localized_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_block_items_order_idx" ON "_pages_v_blocks_nested_localized_block_items" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_block_items_parent_id_idx" ON "_pages_v_blocks_nested_localized_block_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_block_order_idx" ON "_pages_v_blocks_nested_localized_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_block_parent_id_idx" ON "_pages_v_blocks_nested_localized_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_block_path_idx" ON "_pages_v_blocks_nested_localized_block" ("_path");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_nested_localized_block_items" ADD CONSTRAINT "pages_blocks_nested_localized_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_nested_localized_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_nested_localized_block_items_locales" ADD CONSTRAINT "pages_blocks_nested_localized_block_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_nested_localized_block_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_nested_localized_block" ADD CONSTRAINT "pages_blocks_nested_localized_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_nested_localized_block_locales" ADD CONSTRAINT "pages_blocks_nested_localized_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_nested_localized_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_nested_localized_block_items" ADD CONSTRAINT "_pages_v_blocks_nested_localized_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_nested_localized_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_nested_localized_block_items_locales" ADD CONSTRAINT "_pages_v_blocks_nested_localized_block_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_nested_localized_block_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_nested_localized_block" ADD CONSTRAINT "_pages_v_blocks_nested_localized_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_nested_localized_block_locales" ADD CONSTRAINT "_pages_v_blocks_nested_localized_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_nested_localized_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
}
