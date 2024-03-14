import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { GitHub } from "arctic";
import { Session, User, db } from "astro:db";
import { Lucia } from "lucia";

const { PROD, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = import.meta.env;

// @ts-expect-error - Suppressing type mismatch errors
const adapter = new DrizzleSQLiteAdapter(db, Session, User);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: PROD,
    },
  },
  getUserAttributes: ({ githubId, username }) => ({ githubId, username }),
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      githubId: number;
      username: string;
    };
  }
}

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);
