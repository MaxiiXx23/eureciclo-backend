-- CreateTable
CREATE TABLE "StatusCollect" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatusCollect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collect" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "collectedAt" TIMESTAMP(3),
    "receivedAt" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "statusCollectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectBy" (
    "id" SERIAL NOT NULL,
    "collectId" INTEGER NOT NULL,
    "collectorId" INTEGER,
    "companyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectBy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddressCollect" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "collectId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AddressCollect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagesCollect" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "collectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImagesCollect_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_statusCollectId_fkey" FOREIGN KEY ("statusCollectId") REFERENCES "StatusCollect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectBy" ADD CONSTRAINT "CollectBy_collectorId_fkey" FOREIGN KEY ("collectorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectBy" ADD CONSTRAINT "CollectBy_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectBy" ADD CONSTRAINT "CollectBy_collectId_fkey" FOREIGN KEY ("collectId") REFERENCES "Collect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressCollect" ADD CONSTRAINT "AddressCollect_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressCollect" ADD CONSTRAINT "AddressCollect_collectId_fkey" FOREIGN KEY ("collectId") REFERENCES "Collect"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagesCollect" ADD CONSTRAINT "ImagesCollect_collectId_fkey" FOREIGN KEY ("collectId") REFERENCES "Collect"("id") ON DELETE CASCADE ON UPDATE CASCADE;
