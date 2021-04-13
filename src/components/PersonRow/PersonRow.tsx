import React from 'react';

export interface Person {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
}

export const PersonRow = ({
  name,
  sex,
  born,
  died,
  motherName,
  fatherName,
}: Person) => (
  <tr>
    <td>{name}</td>
    <td>{sex}</td>
    <td>{born}</td>
    <td>{died}</td>
    <td>{motherName}</td>
    <td>{fatherName}</td>
</tr>
);