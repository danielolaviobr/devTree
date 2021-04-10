/*
  Warnings:

  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `sites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sites" DROP CONSTRAINT "sites_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar";

-- DropTable
DROP TABLE "sites";
