type Sex = 'm' | 'f';

export interface Person {
  name: string,
  sex: Sex,
  born: number,
  died: number,
  fatherName: string | null,
  motherName: string | null,
  slug: string,
}
