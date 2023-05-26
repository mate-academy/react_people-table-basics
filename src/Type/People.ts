export type PeopleType = {
  name: string;
  sex: string;
  born: number;
  died: number;
  motherName: string;
  fatherName: string;
  mother?: PeopleType | null;
  father?: PeopleType | null;
  slug: string;
};
