export type Person = {
  name: string,
  sex: ('m' | 'f'),
  born: 1832,
  died: 1905,
  fatherName: string,
  motherName: string,
  slug: string,
  mother?: Person
};
