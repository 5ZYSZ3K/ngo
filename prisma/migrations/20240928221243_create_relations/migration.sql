-- CreateTable
CREATE TABLE "FoundationRequest" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "foundation_id" TEXT NOT NULL,

    CONSTRAINT "FoundationRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FoundationRequest" ADD CONSTRAINT "FoundationRequest_foundation_id_fkey" FOREIGN KEY ("foundation_id") REFERENCES "Foundation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
