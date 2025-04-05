/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedRouteImport } from './routes/_authenticated/route'
import { Route as IndexImport } from './routes/index'
import { Route as authSignInImport } from './routes/(auth)/sign-in'
import { Route as AuthenticatedTeacherRouteImport } from './routes/_authenticated/teacher/route'
import { Route as AuthenticatedStudentRouteImport } from './routes/_authenticated/student/route'
import { Route as AuthenticatedAdminRouteImport } from './routes/_authenticated/admin/route'
import { Route as AuthenticatedAdminUsersIndexImport } from './routes/_authenticated/admin/users/index'
import { Route as AuthenticatedAdminCoursesIndexImport } from './routes/_authenticated/admin/courses/index'

// Create Virtual Routes

const errors503LazyImport = createFileRoute('/(errors)/503')()
const errors500LazyImport = createFileRoute('/(errors)/500')()
const errors404LazyImport = createFileRoute('/(errors)/404')()
const errors403LazyImport = createFileRoute('/(errors)/403')()
const errors401LazyImport = createFileRoute('/(errors)/401')()
const AuthenticatedTeacherIndexLazyImport = createFileRoute(
  '/_authenticated/teacher/',
)()
const AuthenticatedStudentIndexLazyImport = createFileRoute(
  '/_authenticated/student/',
)()
const AuthenticatedComingSoonIndexLazyImport = createFileRoute(
  '/_authenticated/coming-soon/',
)()
const AuthenticatedAdminIndexLazyImport = createFileRoute(
  '/_authenticated/admin/',
)()

// Create/Update Routes

const AuthenticatedRouteRoute = AuthenticatedRouteImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const errors503LazyRoute = errors503LazyImport
  .update({
    id: '/(errors)/503',
    path: '/503',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/503.lazy').then((d) => d.Route))

const errors500LazyRoute = errors500LazyImport
  .update({
    id: '/(errors)/500',
    path: '/500',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/500.lazy').then((d) => d.Route))

const errors404LazyRoute = errors404LazyImport
  .update({
    id: '/(errors)/404',
    path: '/404',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/404.lazy').then((d) => d.Route))

const errors403LazyRoute = errors403LazyImport
  .update({
    id: '/(errors)/403',
    path: '/403',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/403.lazy').then((d) => d.Route))

const errors401LazyRoute = errors401LazyImport
  .update({
    id: '/(errors)/401',
    path: '/401',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/401.lazy').then((d) => d.Route))

const authSignInRoute = authSignInImport.update({
  id: '/(auth)/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedTeacherRouteRoute = AuthenticatedTeacherRouteImport.update({
  id: '/teacher',
  path: '/teacher',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)

const AuthenticatedStudentRouteRoute = AuthenticatedStudentRouteImport.update({
  id: '/student',
  path: '/student',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)

const AuthenticatedAdminRouteRoute = AuthenticatedAdminRouteImport.update({
  id: '/admin',
  path: '/admin',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)

const AuthenticatedTeacherIndexLazyRoute =
  AuthenticatedTeacherIndexLazyImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthenticatedTeacherRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/teacher/index.lazy').then((d) => d.Route),
  )

const AuthenticatedStudentIndexLazyRoute =
  AuthenticatedStudentIndexLazyImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthenticatedStudentRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/student/index.lazy').then((d) => d.Route),
  )

const AuthenticatedComingSoonIndexLazyRoute =
  AuthenticatedComingSoonIndexLazyImport.update({
    id: '/coming-soon/',
    path: '/coming-soon/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/coming-soon/index.lazy').then(
      (d) => d.Route,
    ),
  )

const AuthenticatedAdminIndexLazyRoute =
  AuthenticatedAdminIndexLazyImport.update({
    id: '/',
    path: '/',
    getParentRoute: () => AuthenticatedAdminRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/admin/index.lazy').then((d) => d.Route),
  )

const AuthenticatedAdminUsersIndexRoute =
  AuthenticatedAdminUsersIndexImport.update({
    id: '/users/',
    path: '/users/',
    getParentRoute: () => AuthenticatedAdminRouteRoute,
  } as any)

const AuthenticatedAdminCoursesIndexRoute =
  AuthenticatedAdminCoursesIndexImport.update({
    id: '/courses/',
    path: '/courses/',
    getParentRoute: () => AuthenticatedAdminRouteRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedRouteImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/admin': {
      id: '/_authenticated/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AuthenticatedAdminRouteImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/student': {
      id: '/_authenticated/student'
      path: '/student'
      fullPath: '/student'
      preLoaderRoute: typeof AuthenticatedStudentRouteImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/teacher': {
      id: '/_authenticated/teacher'
      path: '/teacher'
      fullPath: '/teacher'
      preLoaderRoute: typeof AuthenticatedTeacherRouteImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/(auth)/sign-in': {
      id: '/(auth)/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof authSignInImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/401': {
      id: '/(errors)/401'
      path: '/401'
      fullPath: '/401'
      preLoaderRoute: typeof errors401LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/403': {
      id: '/(errors)/403'
      path: '/403'
      fullPath: '/403'
      preLoaderRoute: typeof errors403LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/404': {
      id: '/(errors)/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof errors404LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/500': {
      id: '/(errors)/500'
      path: '/500'
      fullPath: '/500'
      preLoaderRoute: typeof errors500LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/503': {
      id: '/(errors)/503'
      path: '/503'
      fullPath: '/503'
      preLoaderRoute: typeof errors503LazyImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/admin/': {
      id: '/_authenticated/admin/'
      path: '/'
      fullPath: '/admin/'
      preLoaderRoute: typeof AuthenticatedAdminIndexLazyImport
      parentRoute: typeof AuthenticatedAdminRouteImport
    }
    '/_authenticated/coming-soon/': {
      id: '/_authenticated/coming-soon/'
      path: '/coming-soon'
      fullPath: '/coming-soon'
      preLoaderRoute: typeof AuthenticatedComingSoonIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/student/': {
      id: '/_authenticated/student/'
      path: '/'
      fullPath: '/student/'
      preLoaderRoute: typeof AuthenticatedStudentIndexLazyImport
      parentRoute: typeof AuthenticatedStudentRouteImport
    }
    '/_authenticated/teacher/': {
      id: '/_authenticated/teacher/'
      path: '/'
      fullPath: '/teacher/'
      preLoaderRoute: typeof AuthenticatedTeacherIndexLazyImport
      parentRoute: typeof AuthenticatedTeacherRouteImport
    }
    '/_authenticated/admin/courses/': {
      id: '/_authenticated/admin/courses/'
      path: '/courses'
      fullPath: '/admin/courses'
      preLoaderRoute: typeof AuthenticatedAdminCoursesIndexImport
      parentRoute: typeof AuthenticatedAdminRouteImport
    }
    '/_authenticated/admin/users/': {
      id: '/_authenticated/admin/users/'
      path: '/users'
      fullPath: '/admin/users'
      preLoaderRoute: typeof AuthenticatedAdminUsersIndexImport
      parentRoute: typeof AuthenticatedAdminRouteImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedAdminRouteRouteChildren {
  AuthenticatedAdminIndexLazyRoute: typeof AuthenticatedAdminIndexLazyRoute
  AuthenticatedAdminCoursesIndexRoute: typeof AuthenticatedAdminCoursesIndexRoute
  AuthenticatedAdminUsersIndexRoute: typeof AuthenticatedAdminUsersIndexRoute
}

const AuthenticatedAdminRouteRouteChildren: AuthenticatedAdminRouteRouteChildren =
  {
    AuthenticatedAdminIndexLazyRoute: AuthenticatedAdminIndexLazyRoute,
    AuthenticatedAdminCoursesIndexRoute: AuthenticatedAdminCoursesIndexRoute,
    AuthenticatedAdminUsersIndexRoute: AuthenticatedAdminUsersIndexRoute,
  }

const AuthenticatedAdminRouteRouteWithChildren =
  AuthenticatedAdminRouteRoute._addFileChildren(
    AuthenticatedAdminRouteRouteChildren,
  )

interface AuthenticatedStudentRouteRouteChildren {
  AuthenticatedStudentIndexLazyRoute: typeof AuthenticatedStudentIndexLazyRoute
}

const AuthenticatedStudentRouteRouteChildren: AuthenticatedStudentRouteRouteChildren =
  {
    AuthenticatedStudentIndexLazyRoute: AuthenticatedStudentIndexLazyRoute,
  }

const AuthenticatedStudentRouteRouteWithChildren =
  AuthenticatedStudentRouteRoute._addFileChildren(
    AuthenticatedStudentRouteRouteChildren,
  )

interface AuthenticatedTeacherRouteRouteChildren {
  AuthenticatedTeacherIndexLazyRoute: typeof AuthenticatedTeacherIndexLazyRoute
}

const AuthenticatedTeacherRouteRouteChildren: AuthenticatedTeacherRouteRouteChildren =
  {
    AuthenticatedTeacherIndexLazyRoute: AuthenticatedTeacherIndexLazyRoute,
  }

const AuthenticatedTeacherRouteRouteWithChildren =
  AuthenticatedTeacherRouteRoute._addFileChildren(
    AuthenticatedTeacherRouteRouteChildren,
  )

interface AuthenticatedRouteRouteChildren {
  AuthenticatedAdminRouteRoute: typeof AuthenticatedAdminRouteRouteWithChildren
  AuthenticatedStudentRouteRoute: typeof AuthenticatedStudentRouteRouteWithChildren
  AuthenticatedTeacherRouteRoute: typeof AuthenticatedTeacherRouteRouteWithChildren
  AuthenticatedComingSoonIndexLazyRoute: typeof AuthenticatedComingSoonIndexLazyRoute
}

const AuthenticatedRouteRouteChildren: AuthenticatedRouteRouteChildren = {
  AuthenticatedAdminRouteRoute: AuthenticatedAdminRouteRouteWithChildren,
  AuthenticatedStudentRouteRoute: AuthenticatedStudentRouteRouteWithChildren,
  AuthenticatedTeacherRouteRoute: AuthenticatedTeacherRouteRouteWithChildren,
  AuthenticatedComingSoonIndexLazyRoute: AuthenticatedComingSoonIndexLazyRoute,
}

const AuthenticatedRouteRouteWithChildren =
  AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteRouteWithChildren
  '/admin': typeof AuthenticatedAdminRouteRouteWithChildren
  '/student': typeof AuthenticatedStudentRouteRouteWithChildren
  '/teacher': typeof AuthenticatedTeacherRouteRouteWithChildren
  '/sign-in': typeof authSignInRoute
  '/401': typeof errors401LazyRoute
  '/403': typeof errors403LazyRoute
  '/404': typeof errors404LazyRoute
  '/500': typeof errors500LazyRoute
  '/503': typeof errors503LazyRoute
  '/admin/': typeof AuthenticatedAdminIndexLazyRoute
  '/coming-soon': typeof AuthenticatedComingSoonIndexLazyRoute
  '/student/': typeof AuthenticatedStudentIndexLazyRoute
  '/teacher/': typeof AuthenticatedTeacherIndexLazyRoute
  '/admin/courses': typeof AuthenticatedAdminCoursesIndexRoute
  '/admin/users': typeof AuthenticatedAdminUsersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthenticatedRouteRouteWithChildren
  '/sign-in': typeof authSignInRoute
  '/401': typeof errors401LazyRoute
  '/403': typeof errors403LazyRoute
  '/404': typeof errors404LazyRoute
  '/500': typeof errors500LazyRoute
  '/503': typeof errors503LazyRoute
  '/admin': typeof AuthenticatedAdminIndexLazyRoute
  '/coming-soon': typeof AuthenticatedComingSoonIndexLazyRoute
  '/student': typeof AuthenticatedStudentIndexLazyRoute
  '/teacher': typeof AuthenticatedTeacherIndexLazyRoute
  '/admin/courses': typeof AuthenticatedAdminCoursesIndexRoute
  '/admin/users': typeof AuthenticatedAdminUsersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteRouteWithChildren
  '/_authenticated/admin': typeof AuthenticatedAdminRouteRouteWithChildren
  '/_authenticated/student': typeof AuthenticatedStudentRouteRouteWithChildren
  '/_authenticated/teacher': typeof AuthenticatedTeacherRouteRouteWithChildren
  '/(auth)/sign-in': typeof authSignInRoute
  '/(errors)/401': typeof errors401LazyRoute
  '/(errors)/403': typeof errors403LazyRoute
  '/(errors)/404': typeof errors404LazyRoute
  '/(errors)/500': typeof errors500LazyRoute
  '/(errors)/503': typeof errors503LazyRoute
  '/_authenticated/admin/': typeof AuthenticatedAdminIndexLazyRoute
  '/_authenticated/coming-soon/': typeof AuthenticatedComingSoonIndexLazyRoute
  '/_authenticated/student/': typeof AuthenticatedStudentIndexLazyRoute
  '/_authenticated/teacher/': typeof AuthenticatedTeacherIndexLazyRoute
  '/_authenticated/admin/courses/': typeof AuthenticatedAdminCoursesIndexRoute
  '/_authenticated/admin/users/': typeof AuthenticatedAdminUsersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/admin'
    | '/student'
    | '/teacher'
    | '/sign-in'
    | '/401'
    | '/403'
    | '/404'
    | '/500'
    | '/503'
    | '/admin/'
    | '/coming-soon'
    | '/student/'
    | '/teacher/'
    | '/admin/courses'
    | '/admin/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/sign-in'
    | '/401'
    | '/403'
    | '/404'
    | '/500'
    | '/503'
    | '/admin'
    | '/coming-soon'
    | '/student'
    | '/teacher'
    | '/admin/courses'
    | '/admin/users'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/_authenticated/admin'
    | '/_authenticated/student'
    | '/_authenticated/teacher'
    | '/(auth)/sign-in'
    | '/(errors)/401'
    | '/(errors)/403'
    | '/(errors)/404'
    | '/(errors)/500'
    | '/(errors)/503'
    | '/_authenticated/admin/'
    | '/_authenticated/coming-soon/'
    | '/_authenticated/student/'
    | '/_authenticated/teacher/'
    | '/_authenticated/admin/courses/'
    | '/_authenticated/admin/users/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRouteRoute: typeof AuthenticatedRouteRouteWithChildren
  authSignInRoute: typeof authSignInRoute
  errors401LazyRoute: typeof errors401LazyRoute
  errors403LazyRoute: typeof errors403LazyRoute
  errors404LazyRoute: typeof errors404LazyRoute
  errors500LazyRoute: typeof errors500LazyRoute
  errors503LazyRoute: typeof errors503LazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  authSignInRoute: authSignInRoute,
  errors401LazyRoute: errors401LazyRoute,
  errors403LazyRoute: errors403LazyRoute,
  errors404LazyRoute: errors404LazyRoute,
  errors500LazyRoute: errors500LazyRoute,
  errors503LazyRoute: errors503LazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authenticated",
        "/(auth)/sign-in",
        "/(errors)/401",
        "/(errors)/403",
        "/(errors)/404",
        "/(errors)/500",
        "/(errors)/503"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authenticated": {
      "filePath": "_authenticated/route.tsx",
      "children": [
        "/_authenticated/admin",
        "/_authenticated/student",
        "/_authenticated/teacher",
        "/_authenticated/coming-soon/"
      ]
    },
    "/_authenticated/admin": {
      "filePath": "_authenticated/admin/route.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/admin/",
        "/_authenticated/admin/courses/",
        "/_authenticated/admin/users/"
      ]
    },
    "/_authenticated/student": {
      "filePath": "_authenticated/student/route.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/student/"
      ]
    },
    "/_authenticated/teacher": {
      "filePath": "_authenticated/teacher/route.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/teacher/"
      ]
    },
    "/(auth)/sign-in": {
      "filePath": "(auth)/sign-in.tsx"
    },
    "/(errors)/401": {
      "filePath": "(errors)/401.lazy.tsx"
    },
    "/(errors)/403": {
      "filePath": "(errors)/403.lazy.tsx"
    },
    "/(errors)/404": {
      "filePath": "(errors)/404.lazy.tsx"
    },
    "/(errors)/500": {
      "filePath": "(errors)/500.lazy.tsx"
    },
    "/(errors)/503": {
      "filePath": "(errors)/503.lazy.tsx"
    },
    "/_authenticated/admin/": {
      "filePath": "_authenticated/admin/index.lazy.tsx",
      "parent": "/_authenticated/admin"
    },
    "/_authenticated/coming-soon/": {
      "filePath": "_authenticated/coming-soon/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/student/": {
      "filePath": "_authenticated/student/index.lazy.tsx",
      "parent": "/_authenticated/student"
    },
    "/_authenticated/teacher/": {
      "filePath": "_authenticated/teacher/index.lazy.tsx",
      "parent": "/_authenticated/teacher"
    },
    "/_authenticated/admin/courses/": {
      "filePath": "_authenticated/admin/courses/index.tsx",
      "parent": "/_authenticated/admin"
    },
    "/_authenticated/admin/users/": {
      "filePath": "_authenticated/admin/users/index.tsx",
      "parent": "/_authenticated/admin"
    }
  }
}
ROUTE_MANIFEST_END */
