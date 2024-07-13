export enum AppRoutes {
  HOME = 'Home',
  PEOPLE = 'People',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.PEOPLE]: 'people',
};
