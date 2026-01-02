CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firstName" varchar(120) NOT NULL,
	"lastName" varchar(120) NOT NULL,
	"username" varchar(120) NOT NULL,
	"passwordHash" text NOT NULL,
	"permissionId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "permission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"permissionLevel" bigint NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "permission_name_unique" UNIQUE("name"),
	CONSTRAINT "permission_permissionLevel_unique" UNIQUE("permissionLevel")
);
--> statement-breakpoint
CREATE TABLE "movie" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"language" varchar(50) NOT NULL,
	"genres" text[] NOT NULL,
	"runtime" integer NOT NULL,
	"releaseDate" date NOT NULL,
	"rating" numeric(3, 1) NOT NULL,
	"country" varchar(100) NOT NULL,
	"network" varchar(100) NOT NULL,
	"officialSite" text,
	"image" text,
	"imdbLink" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_permissionId_permission_id_fk" FOREIGN KEY ("permissionId") REFERENCES "public"."permission"("id") ON DELETE no action ON UPDATE no action;