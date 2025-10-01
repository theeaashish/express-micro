-- CreateTable
CREATE TABLE "public"."News" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "image" VARCHAR(100) NOT NULL,
    "usersId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."News" ADD CONSTRAINT "News_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "public"."Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
