import { column, defineDb, defineTable } from "astro:db";

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    githubId: column.number({ unique: true }),
    username: column.text(),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expiresAt: column.number(),
    userId: column.text({ references: () => User.columns.id }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { User, Session },
});
