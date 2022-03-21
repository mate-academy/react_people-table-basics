type Sex = 'f' | 'm';

export interface People {
  name: string,
  sex:Sex,
  born: number,
  died: number,
  motherName: string,
  fatherName: string,
  slug: string
}
