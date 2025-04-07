export type Person = {
  name: string;
  sex: 'm' | 'f';
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
};

export type PeopleContextType = {
  people: Person[];
  isLoading: boolean;
  hasError: boolean;
};
