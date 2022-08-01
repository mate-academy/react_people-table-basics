export type Person = {
  name: string,
  sex: 'm' | 'f',
  born: string,
  died: string,
  fatherName: string,
  motherName: string,
  slug: string,
};

export interface Status {
  isActive: boolean;
}
