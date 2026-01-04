CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(120) NOT NULL,
	"last_name" varchar(120) NOT NULL,
	"username" varchar(120) NOT NULL,
	"password_hash" text NOT NULL,
	"permissions_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
CREATE TABLE "permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"permission_level" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "permissions_name_unique" UNIQUE("name"),
	CONSTRAINT "permissions_permission_level_unique" UNIQUE("permission_level")
);
CREATE TABLE "movies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"language" varchar(50) NOT NULL,
	"genres" text [] NOT NULL,
	"runtime" integer NOT NULL,
	"release_date" date NOT NULL,
	"rating" numeric(3, 1) NOT NULL,
	"country" varchar(100) NOT NULL,
	"network" varchar(100) NOT NULL,
	"official_site" text,
	"image" text,
	"imdb_link" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
ALTER TABLE "users"
ADD CONSTRAINT "users_permissions_id_permissions_id_fk" FOREIGN KEY ("permissions_id") REFERENCES "public"."permissions"("id") ON DELETE no action ON UPDATE no action;