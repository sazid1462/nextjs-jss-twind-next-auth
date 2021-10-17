export const hasPermission = (permission: any) => {
  const user: any = localStorage.getItem('current_user');
  const perms = user.permissions.map((p: string) => p.toLowerCase());

  return user && perms.includes(permission.toLowerCase());
};
