/*
  Warnings:

  - You are about to drop the column `salt` on the `User_Credential` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User_Credential" DROP COLUMN "salt";
