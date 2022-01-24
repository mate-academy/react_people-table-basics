export interface IPeople {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
}

export interface IPeopleWithParents extends IPeople {
  mother: IPeople;
  father: IPeople;
}
