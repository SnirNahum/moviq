ALTER TABLE "users" DROP CONSTRAINT "users_permissions_id_permissions_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "permissions_id";