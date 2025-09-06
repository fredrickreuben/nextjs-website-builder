# Project Management Platform

A modern Next.js application for managing and showcasing projects with a clean, responsive interface.

## Features

### 🚀 Project Management

-   **Create Projects**: Add new projects with title, description, category, tags, and live URLs
-   **Update Projects**: Edit existing project details
-   **Delete Projects**: Remove projects with confirmation
-   **View Projects**: Browse all projects in a responsive gallery layout
-   **Featured Projects**: Mark projects as featured for highlighting

### 🎨 User Interface

-   **Responsive Design**: Works seamlessly on desktop and mobile devices
-   **Modern UI Components**: Built with shadcn/ui components
-   **Toast Notifications**: Real-time feedback for user actions
-   **Modal Forms**: Clean, accessible forms for project creation/editing
-   **Loading States**: Proper loading indicators and error handling

### 🛠 Technical Features

-   **Server Actions**: Type-safe server-side operations with Next.js 14
-   **Database Integration**: PostgreSQL with Prisma ORM
-   **Form Validation**: Zod schema validation with react-hook-form
-   **Tag Management**: Flexible tag system with CSV storage and normalization
-   **Path Revalidation**: Automatic cache invalidation for fresh data
-   **Error Boundaries**: Graceful error handling throughout the app

## Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Database**: PostgreSQL with Prisma ORM
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui
-   **Forms**: react-hook-form + Zod validation
-   **Notifications**: Sonner toast library
-   **TypeScript**: Full type safety

## Getting Started

### Prerequisites

-   Node.js 18+
-   PostgreSQL database
-   npm/yarn/pnpm

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd project-management-platform
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` with your database URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

4. **Set up the database**

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed the database (optional)
npx prisma db seed
```

5. **Start the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── actions/
│   └── projects/
│       └── actions.ts          # Server actions for CRUD operations
├── app/
│   ├── projects/
│   │   └── page.tsx           # Projects gallery page
│   └── layout.tsx             # Root layout with toast provider
├── components/
│   ├── projects/
│   │   ├── create.tsx         # Project creation modal
│   │   ├── list.tsx           # Projects grid display
│   │   └── title.tsx          # Page header component
│   └── ui/                    # Reusable UI components
├── schemas/
│   └── projects.ts            # Zod validation schemas
└── lib/
    └── prisma.ts              # Prisma client instance
```

## API Reference

### Server Actions

#### `createProject(input: ProjectCreateInput)`

Creates a new project with validation and toast notifications.

```typescript
const result = await createProject({
    title: "My Project",
    description: "Project description",
    category: "Web App",
    tags: "react, nextjs, typescript",
    liveUrl: "https://example.com",
    featured: false,
    userId: 1,
});
```

#### `updateProject(input: ProjectUpdateInput)`

Updates an existing project by ID.

```typescript
const result = await updateProject({
    id: 1,
    title: "Updated Title",
    featured: true,
});
```

#### `deleteProject(input: { id: number })`

Deletes a project by ID.

```typescript
const result = await deleteProject({ id: 1 });
```

#### `getProjects(options?)`

Retrieves projects with optional filtering and pagination.

```typescript
// Get all projects
const allProjects = await getProjects();

// Get featured projects only
const featured = await getProjects({ featured: true });

// Get paginated results
const page1 = await getProjects({ limit: 10, offset: 0 });
```

#### `getProjectById(id: number)`

Retrieves a single project by ID.

```typescript
const project = await getProjectById(123);
```

### Response Format

All server actions return a consistent response format:

```typescript
// Success
{
    success: true,
    data: ProjectObject,
    message: "Success message"
}

// Error
{
    success: false,
    error: "Error message"
}
```

## Database Schema

### Project Model

```prisma
model Project {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  category    String?
  tags        String?   // CSV format: "react,nextjs,typescript"
  liveUrl     String?   @map("live_url")
  featured    Boolean   @default(false)
  userId      Int       @map("user_id")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  @@index([userId, createdAt(sort: Desc)])
  @@map("projects")
}
```

## Development

### Adding New Features

1. **Create Schema**: Add validation schemas in `src/schemas/`
2. **Create Server Action**: Add server-side logic in `src/actions/`
3. **Create Components**: Build UI components in `src/components/`
4. **Update Pages**: Integrate components in `src/app/`

### Database Changes

1. **Update Schema**: Modify `prisma/schema.prisma`
2. **Create Migration**: Run `npx prisma migrate dev --name migration_name`
3. **Update Types**: Regenerate client with `npx prisma generate`

### Testing

Test the application with various project data:

```typescript
// Minimal project
{
    title: "Test Project",
    userId: 1
}

// Complete project
{
    title: "Full Featured Project",
    description: "Complete project with all fields",
    category: "Web Application",
    tags: "react, typescript, tailwind",
    liveUrl: "https://example.com",
    featured: true,
    userId: 1
}
```

## Deployment

### Vercel (Recommended)

1. **Connect Repository**: Import your GitHub repository to Vercel
2. **Set Environment Variables**: Add `DATABASE_URL` in Vercel dashboard
3. **Deploy**: Vercel will automatically build and deploy

### Manual Deployment

1. **Build the application**

```bash
npm run build
```

2. **Set up production database**

```bash
npx prisma migrate deploy
```

3. **Start production server**

```bash
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
