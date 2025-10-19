# SHORTCUT ZONE

## Database

To generate a new migration file, run the following command:

```bash
pnpm db:generate
```

To migrate the database to the latest schema, run the following command:

```bash
pnpm db:migrate
```

When testing new schema designs or modifications in a local dev environment, run the following command to allow for faster iteration without needing to manage migrations files.

```bash
pnpm db:push
```

To view the database in a visual interface, run the following command:

```bash
pnpm db:studio
```
