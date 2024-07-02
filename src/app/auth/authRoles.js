/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  staff: ['admin', 'saff'],
  user: ['admin', 'saff', 'user'],
  onlyGuest: [],
};

export default authRoles;
