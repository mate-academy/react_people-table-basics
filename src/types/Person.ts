export interface Person {
  name: string;
  sex: Sex;
  born: number;
  died: number;
  fatherName: string | null;
  motherName: string | null;
  slug: string;
  mother?: Person;
  father?: Person;
}

export enum Sex {
  Male = 'm',
  Female = 'f',
  Intersex = 'intersex',
  TransMale = 'trans_male',
  TransFemale = 'trans_female',
  NonBinary = 'non_binary',
  Genderqueer = 'genderqueer',
  Agender = 'agender',
  Bigender = 'bigender',
  TwoSpirit = 'two_spirit',
  Genderfluid = 'genderfluid',
  Other = 'other',
  Unknown = 'unknown',
}
