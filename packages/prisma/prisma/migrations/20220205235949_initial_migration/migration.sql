-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3),
    "duration" DOUBLE PRECISION,
    "loading" BOOLEAN,
    "mediaurl" TEXT,
    "name" TEXT,
    "thumbnails" TEXT,
    "trimmed" BOOLEAN,
    "type" TEXT,
    "uid" TEXT,
    "thumbnailSprites" TEXT,
    "metadata" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "confirmed" BOOLEAN,
    "email" TEXT,
    "googleuserid" TEXT,
    "name" TEXT,
    "password" TEXT,
    "picture" TEXT,
    "stripecustomerid" TEXT,
    "stripelifetimeid" TEXT,
    "admin" BOOLEAN,
    "emailPrefs" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleuserid_key" ON "User"("googleuserid");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
