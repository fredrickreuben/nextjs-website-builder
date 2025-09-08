# Next.js Website Builder Project Index

## Overview

This is a modern website builder application built with Next.js 14+, TypeScript, and Prisma. It allows users to create and manage website projects with drag-and-drop section-based editing capabilities. The application features a project gallery, real-time section editing, and a responsive design built with Tailwind CSS.

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Tailwind Typography** (for rich text)

### UI Components
- **ShadCN/ui** (Radix UI components)
- **Lucide React** (Icons)
- **Sonner** (Toast notifications)
- **Class Variance Authority** (CVA for styling variants)
- **clsx/tailwind-merge** (Class name utilities)

### Backend/Database
- **Prisma ORM** (Database toolkit)
- **PostgreSQL** (Primary database)
- **Prisma Client** (6.15.0)

### Forms & Validation
- **React Hook Form** (Form handling)
- **Zod** (Schema validation)
- **@hookform/resolvers** (Zod integration)

### Development Tools
- **ESLint** (Code linting)
- **TypeScript ESLint** (TS-specific linting)
- **ESLint Config Next** (Next.js rules)
- **PostCSS** (CSS processing)
- **@tailwindcss/postcss** (Tailwind integration)

### Rich Text Editing
- **TipTap** (Rich text editor)
- **@tiptap/pm** (ProseMirror core)
- **@tiptap/react** (React integration)
- **@tiptap/starter-kit** (Core editing features)

## Project Structure

```
/ (Root)
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── backup/                   # Backup pages
│   │   ├── api/                      # API routes (if any)
│   │   ├── favicon.ico               # Site favicon
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout component
│   │   ├── page.tsx                  # Home page
│   │   └── projects/                 # Projects section
│   │       ├── page.tsx              # Projects gallery
│   │       └── [id]/                 # Dynamic project pages
│   │           ├── not-found.tsx     # 404 for projects
│   │           └── page.tsx          # Individual project page
│   ├── actions/                      # Server Actions
│   │   ├── projects/                 # Project-related actions
│   │   │   └── actions.ts            # CRUD operations for projects
│   │   └── sections/                 # Section-related actions
│   │       └── actions.ts            # CRUD operations for sections
│   ├── components/                   # Reusable components
│   │   ├── builder/                  # Page builder components
│   │   │   ├── index.tsx             # Main page builder
│   │   │   ├── SectionButton.tsx     # Button to add sections
│   │   │   ├── SectionOptions.tsx    # Section type options
│   │   │   └── SectionOptionsDialog.tsx # Modal for section selection
│   │   ├── layout/                   # Layout components
│   │   │   ├── container.tsx         # Container wrapper
│   │   │   ├── footer.tsx            # Site footer
│   │   │   └── header.tsx            # Site header
│   │   ├── projects/                 # Project-related components
│   │   │   ├── create.tsx            # Project creation form
│   │   │   ├── footer.tsx            # Project page footer
│   │   │   ├── header.tsx            # Project page header
│   │   │   ├── item.tsx              # Individual project card
│   │   │   ├── list.tsx              # Projects gallery grid
│   │   │   ├── sections/             # Project sections components
│   │   │   │   ├── index.tsx         # Section list renderer
│   │   │   │   └── text/             # Text section component
│   │   │   │       └── editor.tsx    # TipTap editor component
│   │   │   └── title.tsx             # Projects page title component
│   │   └── ui/                       # UI component library
│   │       ├── alert-dialog.tsx      # Alert dialog component
│   │       ├── button.tsx            # Button component
│   │       ├── card.tsx              # Card component
│   │       ├── checkbox.tsx          # Checkbox component
│   │       ├── dialog.tsx            # Dialog component
│   │       ├── form.tsx              # Form component
│   │       ├── input.tsx             # Input component
│   │       ├── label.tsx             # Label component
│   │       ├── select.tsx            # Select component
│   │       ├── sonner.tsx            # Toast component
│   │       ├── textarea.tsx          # Textarea component
│   │       └── ***                       # Other UI components
│   ├── lib/                          # Utility libraries
│   │   ├── prisma/                   # Database utilities
│   │   │   └── index.ts              # Prisma client instance
│   │   └── utils.ts                 # General utilities
│   ├── generated/                   # Generated files (Prisma client)
│   │   └── prisma/                   # Prisma generated client
│   ├── schemas/                     # Zod validation schemas
│   │   └── projects.ts               # Project-related schemas
│   └── types                         # TypeScript type definitions (if any)
├── prisma/                          # Database schema and migrations
│   ├── schema.prisma                 # Prisma schema file
│   ├── seed.ts                       # Database seeding script
│   └── migrations/                   # Migration files
├── public/                          # Static assets
│   ├── file.svg                      # File icon
│   ├── globe.svg                     # Globe icon
│   ├── next.svg                      # Next.js logo
│   ├── vercel.svg                    # Vercel logo
│   └── window.svg                    # Window icon
├── node_modules/                    # Dependencies (auto-generated)
├── package.json                     # Package configuration
├── pnpm-lock.yaml                   # Lockfile for pnpm
├── tsconfig.json                    # TypeScript configuration
├── next.config.ts                   # Next.js configuration
├── eslint.config.mjs                # ESLint configuration
├── postcss.config.mjs               # PostCSS configuration
├── components.json                  # Component configuration
├── .gitignore                       # Git ignore file
├── README.md                        # Project documentation
├── verify-relationships.ts          # Database relationship verification script
└── tsconfig.json                    # TypeScript configuration
```

## Database Schema

### Core Models

#### Project Model
- **Fields**: id (Int, Primary Key), title (String), description (String?), category (String?), tags (String? CSV), liveUrl (String? @map=live_url), featured (Boolean default=false), userId (Int @map=user_id), createdAt (DateTime default=now() @map=created_at), updatedAt (DateTime @updatedAt @map=updated_at)
- **Relations**: sections (to Section[])
- **Features**: Supports user-specific projects, tagging system stored as CSV, featured marking, URL linking
- **Indexing**: Composite index on user_id + created_at (desc)

#### Section Model
- **Fields**: id (Int, Primary Key), type (SectionType Enum), position (Int default=0), projectId (Int @map=project_id), createdAt (DateTime default=now() @map=created_at), updatedAt (DateTime @updatedAt @map=updated_at)
- **Enum Types**: Text, Image, Video, TextImage, Layout
- **Relations**: project (to Project), text (to Text?)
- **Features**: Orderable sections with positions, supports multiple content types
- **Indexing**: Index on project_id for efficient querying

#### Text Model
- **Fields**: id (Int, Primary Key), content (String default=HTML template), sectionId (Int unique @map=section_id), createdAt (DateTime default=now() @map=created_at), updatedAt (DateTime @updatedAt @map=updated_at)
- **Relations**: section (to Section)
- **Features**: HTML content storage for rich text sections, one-to-one with sections

### Database Configuration
- **Provider**: PostgreSQL
- **Connection**: Environment variable DATABASE_URL
- **Generator**: Prisma Client (output: ../src/generated/prisma)
- **Best Practices**: Foreign key constraints, cascading deletes, proper indexing

## Key Features

### 1. Project Management
- ✅ Create projects with metadata (title, description, category, tags)
- ✅ Update project details and live URLs
- ✅ Delete projects with confirmation dialogs
- ✅ Mark projects as featured
- ✅ Responsive project gallery with filtering
- ✅ View project details individually

### 2. Section-Based Editing
- ✅ Add sections with different types (Text, Image, Video, TextImage, Layout)
- ✅ Order sections with drag-and-drop positioning
- ✅ Rich text editing with TipTap for text sections
- ✅ Real-time preview of changes
- ✅ Save/Restore unsaved changes with notifications
- ✅ Delete sections with automatic reordering

### 3. User Interface
- ✅ Modern, responsive design with Tailwind CSS
- ✅ Dark/Light theme support (next-themes)
- ✅ Toast notifications for feedback (Sonner)
- ✅ Accessible components with Radix UI
- ✅ Loading states and error handling
- ✅ Modal dialogs and form validation

### 4. Technical Features
- ✅ Server Actions for type-safe operations
- ✅ Zod validation schemas for data integrity
- ✅ Path revalidation for fresh data
- ✅ Metadata and SEO optimization
- ✅ Error boundaries and graceful error handling
- ✅ Database seeding and migration support

## Component Architecture

### Layout Components
- **Header**: Navigation bar with site branding
- **Footer**: Site footer with links and information
- **Container**: Wrapper for consistent page widths and padding

### Project Components
- **ProjectsList**: Gallery grid layout with category filtering
- **ProjectItem**: Individual project card with actions
- **ProjectsTitle**: Page header with title and description
- **ProjectCreate**: Modal form for creating new projects

### Builder Components
- **PageBuilder**: Main page builder container with section management
- **SectionList**: Render and manage existing sections
- **SectionButton**: Button to add new sections
- **SectionOptions**: Type selection for new sections
- **SectionOptionsDialog**: Modal dialog for section type selection

### UI Components
- **Button**: Customizable button with variants (default, outline, destructive)
- **Dialog**: Modal wrapper component
- **Form**: Form wrapper with react-hook-form integration
- **Input**: Form input component
- **Select**: Dropdown selection component
- **Card**: Content card container
- **AlertDialog**: Confirmation dialog component
- **Sonner**: Toast notification system

## Server Actions

### Project Actions (`/src/actions/projects/actions.ts`)
- **createProject**: Create new project with validation
- **updateProject**: Update existing project by ID
- **deleteProject**: Delete project by ID
- **getProjects**: Fetch projects with optional filtering
- **getProjectById**: Fetch single project with sections

### Section Actions (`/src/actions/sections/actions.ts`)
- **createSection**: Create new section
- **updateSection**: Update existing section
- **deleteSection**: Delete section
- **getSectionById**: Fetch single section
- **getSectionsByProject**: Fetch all sections for a project
- **updateTextContent**: Update HTML content for text sections
- **reorderSections**: Reorder sections within a project
- **createSectionWithReorder**: Create section with automatic reordering
- **deleteSectionWithReorder**: Delete section with automatic reordering
- **normalizePositions**: Fix section positions (0, 1, 2...)
- **createOrUpdateSections**: Bulk operations for sections
- **upsertSection**: Create or update single section

## Validation Schemas

### Project Schemas (`/src/schemas/projects.ts`)
```typescript
projectCreateSchema: {
  title: string (required, min:1)
  description: string? (optional)
  category: string? (optional)
  liveUrl: string? (optional, URL format)
  tags: string? (optional)
  featured: boolean? (optional)
  userId: number (required, integer)
}

projectUpdateSchema: {
  id: number (required, integer)
  title: string? (optional, min:1)
  description: string? (optional, nullable)
  category: string? (optional, nullable)
  liveUrl: string? (optional, nullable, URL)
  tags: string? (optional, nullable)
  featured: boolean? (optional)
}
```

## Available Scripts

### Development
- `npm run dev` / `yarn dev` / `pnpm dev`: Start development server (with Turbopack)
- `npm run build` / `yarn build` / `pnpm build`: Build for production (with Turbopack)
- `npm run start` / `yarn start` / `pnpm start`: Start production server

### Database
- `npm run migrate` / `yarn migrate` / `pnpm migrate`: Run Prisma migrations
- `npm run gen` / `yarn gen` / `pnpm gen`: Generate Prisma client
- `npm run seed` / `yarn seed` / `pnpm seed`: Run database seeding

### Quality
- `npm run lint` / `yarn lint` / `pnpm lint`: Run ESLint

## Key Utilities

### Database Helpers (`/src/lib/utils.ts`)
- **cn**: Tailwind class name utilities (clsx + tailwind-merge)
- **Prisma Client**: Database connection instance

### Schema Helpers (`/src/actions/projects/actions.ts`)
- **normalizeTagsToCsv**: Convert tags array/string to CSV format

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm/yarn/pnpm package manager

### Setup Steps
1. Clone repository
2. Install dependencies: `npm install`
3. Copy environment example: `cp .env.example .env.local`
4. Set `DATABASE_URL` in `.env.local`
5. Generate Prisma client: `npm run gen`
6. Run migrations: `npm run migrate dev`
7. Seed database: `npm run seed`
8. Start development: `npm run dev`

## Notable Implementation Details

1. **Server Actions**: All data mutations use Server Actions for type safety and performance
2. **Real-time Updates**: Path revalidation ensures fresh data after mutations
3. **Responsive Design**: All components are mobile-first with responsive breakpoints
4. **Type Safety**: Full TypeScript coverage with Prisma generated types
5. **Rich Text**: TipTap integration for HTML content editing
6. **Form Validation**: Zod schemas ensure data integrity at all levels
7. **Error Handling**: Comprehensive error boundaries and user feedback
8. **SEO Optimization**: Metadata API usage for dynamic page optimization
9. **Database Consistency**: Transactions for complex operations (bulk section updates)
10. **Performance**: Index optimization and efficient database queries

## Future Enhancements

Potential improvements for future development:
- User authentication and authorization
- Image upload and management for sections
- Template system for pre-built sections
- Collaboration features for multi-user projects
- Export functionality (HTML/CSS generation)
- Analytics and usage tracking
- AI-powered content suggestions
- Version control for projects
- Custom domain management
- API endpoints for integrations

---

*This index provides a comprehensive overview of the Next.js Website Builder codebase. For specific implementation details, refer to the actual source code files.*
