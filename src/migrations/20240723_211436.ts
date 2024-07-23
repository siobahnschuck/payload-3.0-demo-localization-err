import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "_locales" AS ENUM('en-US', 'en-ES');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__pages_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "pages_blocks_nested_array_block_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb
);

CREATE TABLE IF NOT EXISTS "pages_blocks_nested_array_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_nested_localized_arr_level_block_items" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb
);

CREATE TABLE IF NOT EXISTS "pages_blocks_nested_localized_arr_level_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_nested_localized_arr_level_block_locales" (
	"title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" varchar NOT NULL,
	CONSTRAINT "pages_blocks_nested_localized_arr_level_block_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

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

CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_pages_status"
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_nested_array_block_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_nested_array_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_nested_localized_arr_level_block_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" jsonb,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_nested_localized_arr_level_block" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"_uuid" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_blocks_nested_localized_arr_level_block_locales" (
	"title" varchar,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "_pages_v_blocks_nested_localized_arr_level_block_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
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

CREATE TABLE IF NOT EXISTS "_pages_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_content" jsonb,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__pages_v_version_status",
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_array_block_items_order_idx" ON "pages_blocks_nested_array_block_items" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_array_block_items_parent_id_idx" ON "pages_blocks_nested_array_block_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_array_block_order_idx" ON "pages_blocks_nested_array_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_array_block_parent_id_idx" ON "pages_blocks_nested_array_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_array_block_path_idx" ON "pages_blocks_nested_array_block" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_arr_level_block_items_order_idx" ON "pages_blocks_nested_localized_arr_level_block_items" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_arr_level_block_items_parent_id_idx" ON "pages_blocks_nested_localized_arr_level_block_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_arr_level_block_order_idx" ON "pages_blocks_nested_localized_arr_level_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_arr_level_block_parent_id_idx" ON "pages_blocks_nested_localized_arr_level_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_arr_level_block_path_idx" ON "pages_blocks_nested_localized_arr_level_block" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_block_items_order_idx" ON "pages_blocks_nested_localized_block_items" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_block_items_parent_id_idx" ON "pages_blocks_nested_localized_block_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_block_order_idx" ON "pages_blocks_nested_localized_block" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_block_parent_id_idx" ON "pages_blocks_nested_localized_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_nested_localized_block_path_idx" ON "pages_blocks_nested_localized_block" ("_path");
CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" ("created_at");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_array_block_items_order_idx" ON "_pages_v_blocks_nested_array_block_items" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_array_block_items_parent_id_idx" ON "_pages_v_blocks_nested_array_block_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_array_block_order_idx" ON "_pages_v_blocks_nested_array_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_array_block_parent_id_idx" ON "_pages_v_blocks_nested_array_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_array_block_path_idx" ON "_pages_v_blocks_nested_array_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_arr_level_block_items_order_idx" ON "_pages_v_blocks_nested_localized_arr_level_block_items" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_arr_level_block_items_parent_id_idx" ON "_pages_v_blocks_nested_localized_arr_level_block_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_arr_level_block_order_idx" ON "_pages_v_blocks_nested_localized_arr_level_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_arr_level_block_parent_id_idx" ON "_pages_v_blocks_nested_localized_arr_level_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_arr_level_block_path_idx" ON "_pages_v_blocks_nested_localized_arr_level_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_block_items_order_idx" ON "_pages_v_blocks_nested_localized_block_items" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_block_items_parent_id_idx" ON "_pages_v_blocks_nested_localized_block_items" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_block_order_idx" ON "_pages_v_blocks_nested_localized_block" ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_block_parent_id_idx" ON "_pages_v_blocks_nested_localized_block" ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_blocks_nested_localized_block_path_idx" ON "_pages_v_blocks_nested_localized_block" ("_path");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version_created_at_idx" ON "_pages_v" ("version_created_at");
CREATE INDEX IF NOT EXISTS "_pages_v_created_at_idx" ON "_pages_v" ("created_at");
CREATE INDEX IF NOT EXISTS "_pages_v_updated_at_idx" ON "_pages_v" ("updated_at");
CREATE INDEX IF NOT EXISTS "_pages_v_latest_idx" ON "_pages_v" ("latest");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_nested_array_block_items" ADD CONSTRAINT "pages_blocks_nested_array_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_nested_array_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_nested_array_block" ADD CONSTRAINT "pages_blocks_nested_array_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_nested_localized_arr_level_block_items" ADD CONSTRAINT "pages_blocks_nested_localized_arr_level_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_nested_localized_arr_level_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_nested_localized_arr_level_block" ADD CONSTRAINT "pages_blocks_nested_localized_arr_level_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_nested_localized_arr_level_block_locales" ADD CONSTRAINT "pages_blocks_nested_localized_arr_level_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_nested_localized_arr_level_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

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
 ALTER TABLE "_pages_v_blocks_nested_array_block_items" ADD CONSTRAINT "_pages_v_blocks_nested_array_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_nested_array_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_nested_array_block" ADD CONSTRAINT "_pages_v_blocks_nested_array_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_nested_localized_arr_level_block_items" ADD CONSTRAINT "_pages_v_blocks_nested_localized_arr_level_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_nested_localized_arr_level_block"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_nested_localized_arr_level_block" ADD CONSTRAINT "_pages_v_blocks_nested_localized_arr_level_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_blocks_nested_localized_arr_level_block_locales" ADD CONSTRAINT "_pages_v_blocks_nested_localized_arr_level_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_pages_v_blocks_nested_localized_arr_level_block"("id") ON DELETE cascade ON UPDATE no action;
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

DO $$ BEGIN
 ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "pages"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "users";
DROP TABLE "pages_blocks_nested_array_block_items";
DROP TABLE "pages_blocks_nested_array_block";
DROP TABLE "pages_blocks_nested_localized_arr_level_block_items";
DROP TABLE "pages_blocks_nested_localized_arr_level_block";
DROP TABLE "pages_blocks_nested_localized_arr_level_block_locales";
DROP TABLE "pages_blocks_nested_localized_block_items";
DROP TABLE "pages_blocks_nested_localized_block_items_locales";
DROP TABLE "pages_blocks_nested_localized_block";
DROP TABLE "pages_blocks_nested_localized_block_locales";
DROP TABLE "pages";
DROP TABLE "_pages_v_blocks_nested_array_block_items";
DROP TABLE "_pages_v_blocks_nested_array_block";
DROP TABLE "_pages_v_blocks_nested_localized_arr_level_block_items";
DROP TABLE "_pages_v_blocks_nested_localized_arr_level_block";
DROP TABLE "_pages_v_blocks_nested_localized_arr_level_block_locales";
DROP TABLE "_pages_v_blocks_nested_localized_block_items";
DROP TABLE "_pages_v_blocks_nested_localized_block_items_locales";
DROP TABLE "_pages_v_blocks_nested_localized_block";
DROP TABLE "_pages_v_blocks_nested_localized_block_locales";
DROP TABLE "_pages_v";
DROP TABLE "media";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`)
};
