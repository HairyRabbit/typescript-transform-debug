-- CreateTable
CREATE TABLE "Directory" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
);
