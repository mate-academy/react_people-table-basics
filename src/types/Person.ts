export interface Person {
  fatherName: string;
  motherName: string;
  name: string;
  sex: string;
  born: number;
  died: number;
  mother: {
    name: string;
    slug: string;
  };
  father: {
    name: string;
    slug: string;
  };
  slug: string;
}
