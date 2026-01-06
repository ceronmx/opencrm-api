/*
  Warnings:

  - You are about to drop the `Credential` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_credentialId_fkey";

-- DropTable
DROP TABLE "Credential";

-- CreateTable
CREATE TABLE "User_Credential" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "User_Credential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Information" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,

    CONSTRAINT "User_Information_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Credential_email_key" ON "User_Credential"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "User_Credential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
