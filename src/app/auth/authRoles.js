/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['Admin'],
  staff: ['Admin', 'Staff'],
  user: ['Admin', 'Staff', 'user'],
  onlyGuest: [],
};

export default authRoles;
