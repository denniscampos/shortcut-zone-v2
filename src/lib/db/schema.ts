import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
  uuid,
  boolean,
  index,
  unique,
} from 'drizzle-orm/pg-core';

export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const sessions = pgTable(
  'session',
  {
    id: varchar('id', { length: 128 }).primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    token: text('token').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    ipAddress: varchar('ip_address', { length: 45 }),
    userAgent: varchar('user_agent', { length: 256 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    {
      userIdIdx: index('session_user_id_idx').on(table.userId),
      tokenIdx: index('session_token_idx').on(table.token),
    },
  ],
);
export const accounts = pgTable(
  'account',
  {
    id: varchar('id', { length: 128 }).primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at', {
      withTimezone: true,
    }),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at', {
      withTimezone: true,
    }),
    scope: text('scope'),
    idToken: text('id_token'),
    password: varchar('password', { length: 256 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    {
      userIdIdx: index('account_user_id_idx').on(table.userId),
      providerIdIdx: index('account_provider_id_idx').on(table.providerId),
    },
  ],
);

export const verifications = pgTable(
  'verification',
  {
    id: varchar('id', { length: 128 }).primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    {
      identifierIdx: index('verification_identifier_idx').on(table.identifier),
    },
  ],
);

export const softwares = pgTable(
  'software',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    category: varchar({ length: 255 }).notNull(),
    icon: varchar({ length: 255 }).notNull(),
    createdBy: text('created_by')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    {
      categoryIdx: index('software_category_idx').on(table.category),
      createdByIdx: index('software_created_by_idx').on(table.createdBy),
      uniqueName: unique('unique_software_name').on(table.name),
    },
  ],
);

export const shortcuts = pgTable(
  'shortcut',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    softwareId: uuid('software_id')
      .notNull()
      .references(() => softwares.id, { onDelete: 'cascade' }),
    platform: varchar({ length: 255 }).notNull(),
    description: text(),
    keys: text().notNull(),
    // Category in this context is like, File, Edit, etc.
    category: varchar({ length: 255 }).notNull(),
    createdBy: text('created_by')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    {
      softwareIdIdx: index('shortcut_software_id_idx').on(table.softwareId),
      createdByIdx: index('shortcut_created_by_idx').on(table.createdBy),
      // Prevent duplicate shortcuts for same software+platform+keys combination
      uniqueShortcut: unique('unique_shortcut').on(
        table.softwareId,
        table.platform,
        table.keys,
      ),
    },
  ],
);

export const contributions = pgTable(
  'contribution',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    points: integer().notNull().default(0),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    softwareId: uuid('software_id')
      .notNull()
      .references(() => softwares.id, { onDelete: 'cascade' }),

    // software or shortcut
    resourceType: varchar('resource_type', { length: 255 }).notNull(),
    // ID of the software or shortcut
    resourceId: uuid('resource_id').notNull(),
    // What action was taken
    action: varchar('action', { length: 50 }).notNull(), // 'created' | 'updated' | 'deleted'

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    {
      softwareIdIdx: index('contribution_software_id_idx').on(table.softwareId),
      userIdIdx: index('contribution_user_id_idx').on(table.userId),
      resourceIdx: index('contribution_resource_idx').on(
        table.resourceType,
        table.resourceId,
      ),
    },
  ],
);

export const votes = pgTable(
  'vote',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
      .notNull()
      .references(() => users.id),
    softwareId: uuid('software_id')
      .notNull()
      .references(() => softwares.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    {
      userSoftwareIdx: index('vote_user_software_idx').on(
        table.userId,
        table.softwareId,
      ),
      softwareIdIdx: index('vote_software_id_idx').on(table.softwareId),
      // Prevent duplicate votes
      uniqueUserSoftware: unique('unique_user_software').on(
        table.userId,
        table.softwareId,
      ),
    },
  ],
);
