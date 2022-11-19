-- CreateTable
CREATE TABLE `Field` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `plusOrMinus` BOOLEAN NOT NULL,
    `balanceId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Field` ADD CONSTRAINT `Field_balanceId_fkey` FOREIGN KEY (`balanceId`) REFERENCES `Balances`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
