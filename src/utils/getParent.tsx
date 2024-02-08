import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';

export const getParent = (parentName: string | null, parent?: Person) => {
  if (parent) {
    return <PersonLink person={parent} />;
  }

  if (parentName) {
    return parentName;
  }

  return '-';
};
