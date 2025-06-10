import { Person } from '../types/Person';

const getSlug = (person: Person) => person.name.toLowerCase().replace(/\s+/g, '-');

export default getSlug;
