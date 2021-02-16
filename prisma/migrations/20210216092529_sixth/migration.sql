/*
  Warnings:

  - You are about to drop the column `hashTagId` on the `posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `posts` DROP FOREIGN KEY `posts_ibfk_2`;

-- AlterTable
ALTER TABLE `posts` DROP COLUMN `hashTagId`;

-- CreateTable
CREATE TABLE `_HashTagToPost` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,
UNIQUE INDEX `_HashTagToPost_AB_unique`(`A`, `B`),
INDEX `_HashTagToPost_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_HashTagToPost` ADD FOREIGN KEY (`A`) REFERENCES `hashtags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_HashTagToPost` ADD FOREIGN KEY (`B`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
