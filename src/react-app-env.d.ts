// eslint-disable-next-line
/// <reference types="react-scripts" />

type UserFromServerType = {
  name: string,
  sex: string,
  fatherName: string | UserFromServerType,
  motherName: string | UserFromServerType,
  slug: string,
  father: UserFromServerType,
  mother: UserFromServerType,
  born: number,
  died: number,
};
