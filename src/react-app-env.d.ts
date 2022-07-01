// eslint-disable-next-line
/// <reference types="react-scripts" />

export interface Person {
  'name': string,
  'sex': 'm' | 'f',
  'born': number,
  'died': number,
  'motherName': string | null,
  'fatherName': string | null,
  'slug': string,
}

export interface PreperedPerson {
  'name': string,
  'sex': 'm' | 'f',
  'born': number,
  'died': number,
  'motherName': Person | null,
  'fatherName': Person | null,
  'slug': string,
}
