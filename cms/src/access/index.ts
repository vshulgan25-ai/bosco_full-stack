import type { Access, FieldAccess } from 'payload'

export const hasRole = (user: any, ...roles: string[]): boolean => {
  if (!user || !user.roles) return false
  return roles.some((role) => user.roles.includes(role))
}

export const anyone: Access = () => true

export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => hasRole(user, 'admin')

export const isStaff: Access = ({ req: { user } }) => hasRole(user, 'admin', 'editor')

export const staffOrOwn = (studentField = 'student'): Access => {
  return ({ req: { user } }) => {
    if (!user) return false
    if (hasRole(user, 'admin', 'editor')) return true
    return {
      [studentField]: {
        equals: user.id,
      },
    }
  }
}

export const staffOnlyField: FieldAccess = ({ req: { user } }) => {
  return hasRole(user, 'admin', 'editor')
}
