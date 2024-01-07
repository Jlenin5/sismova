/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['Administrador'],
  staff: ['Administrador', 'staff'],
  user: ['Administrador', 'staff', 'user'],
  onlyGuest: [],
};

export default authRoles;
