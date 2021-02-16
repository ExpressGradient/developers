/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[content]` on the table `posts`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[image]` on the table `users`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE `posts` MODIFY `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `posts.content_unique` ON `posts`(`content`);

-- CreateIndex
CREATE UNIQUE INDEX `users.image_unique` ON `users`(`image`);
