-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Answers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "Answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Answers" ("body", "createdAt", "id", "questionId", "updatedAt", "userId") SELECT "body", "createdAt", "id", "questionId", "updatedAt", "userId" FROM "Answers";
DROP TABLE "Answers";
ALTER TABLE "new_Answers" RENAME TO "Answers";
CREATE TABLE "new_Questions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Questions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Questions" ("body", "createdAt", "id", "title", "updatedAt", "userId") SELECT "body", "createdAt", "id", "title", "updatedAt", "userId" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
