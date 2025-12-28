# Plan-D Front-End Setup Guide

## Project Overview
This is a React + TypeScript project management application with the following features:
- Task assignment and tracking
- Daily report management
- User type and permissions management
- Persian/Jalali calendar support (Iranian calendar)
- Redux state management
- Ant Design UI components

## Technology Stack
- **React** 17.0.1
- **TypeScript** 4.0.3
- **Ant Design** 4.15.6 (with Jalali/Persian calendar support)
- **Redux** with Redux Saga and Redux Thunk
- **React Router** 5.2.0
- **CRACO** for custom webpack configuration
- **LESS** and **SASS** for styling

## Prerequisites
- **Node.js** 14.x, 16.x, or 22.x (tested with 22.21.1)
- **npm** 10.x or higher

## Installation Steps

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

**Note:** The `--legacy-peer-deps` flag is required due to peer dependency conflicts between React 17 and some legacy packages (antd-jalali requires React 16.9.0).

### 2. Running the Development Server

For **Node.js 17+** (uses OpenSSL 3.0), you need to set the legacy OpenSSL provider:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

For **Node.js 14 or 16**, you can run directly:
```bash
npm start
```

The application will start at `http://localhost:3000`

### 3. Building for Production

```bash
export NODE_OPTIONS=--openssl-legacy-provider
npm run build
```

The build output will be in the `build/` directory.

## Backend Configuration

The application is configured to proxy API requests to:
```
http://pd.buildtech:8000
```

This is defined in `package.json` under the `proxy` field. Update this URL to point to your backend server.

## Known Issues & Warnings

### Compilation Warnings
The project compiles successfully but shows some ESLint warnings:
- Unused variables
- Missing return statements in array callbacks
- Missing dependencies in useEffect hooks
- SASS @import deprecation warnings

These are non-critical and don't affect functionality, but could be cleaned up in future updates.

### Security Vulnerabilities
The project has **174 known vulnerabilities** from outdated dependencies:
- 5 low severity
- 107 moderate severity
- 53 high severity
- 9 critical severity

**Recommendation:** Consider upgrading dependencies or running `npm audit fix` to address these issues.

### Deprecated Packages
Several packages are deprecated but still functional:
- `jalali-react-datepicker` (no longer supported)
- `redux-devtools-extension` (moved to @redux-devtools/extension)
- Various Babel plugins (merged into ECMAScript standard)

## Project Structure

```
plan-d-front/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, fonts (Persian/IRANYekan fonts)
│   ├── components/      # Reusable components (datepicker, timepicker, etc.)
│   ├── forms/           # Form components
│   ├── layouts/         # Layout components (with-auth, without-auth)
│   ├── lib/             # Utility functions and libraries
│   ├── pages/           # Page components
│   │   ├── daily-report.page/
│   │   ├── task-assignment.page/
│   │   ├── user-type.page/
│   │   ├── login.page/
│   │   └── error.page/
│   ├── store/           # Redux store, actions, reducers, sagas
│   ├── types/           # TypeScript type definitions
│   ├── index.tsx        # Application entry point
│   └── URLS.ts          # API endpoint definitions
├── craco.config.js      # CRACO configuration (LESS variables)
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## Available Scripts

- `npm start` - Start development server (requires NODE_OPTIONS=--openssl-legacy-provider for Node 17+)
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run docker` - Install dependencies and build (for Docker builds)

## API Endpoints

The application connects to the following API endpoints (proxied through the backend):

- `/api/login` - Authentication
- `/api/self` - Current user info
- `/api/permissions` - User permissions
- `/api/task-assignment` - Task management
- `/api/daily-report` - Daily reports
- `/api/feature` - Feature management
- `/api/user_type` - User types

See `src/URLS.ts` for the complete list of endpoints.

## Troubleshooting

### Error: digital envelope routines::unsupported
**Solution:** Set the NODE_OPTIONS environment variable:
```bash
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

### Dependency conflicts during installation
**Solution:** Use the --legacy-peer-deps flag:
```bash
npm install --legacy-peer-deps
```

### Module not found errors
**Solution:** Delete node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## Recommendations for Future Updates

1. **Update React Scripts** to version 5+ for better Node.js compatibility
2. **Replace deprecated packages:**
   - `jalali-react-datepicker` → Find a maintained alternative
   - `redux-devtools-extension` → `@redux-devtools/extension`
3. **Address security vulnerabilities** by updating dependencies
4. **Fix ESLint warnings** for better code quality
5. **Consider migrating** to newer versions of React (18+) and Ant Design (5+)
6. **Update SASS imports** to use @use instead of @import

## Current Status

✅ **Project is functional and can be run**
✅ Dependencies install successfully (with --legacy-peer-deps)
✅ Development server starts and compiles successfully
✅ Only non-critical warnings present

The project is old but workable with the proper setup steps outlined above.
