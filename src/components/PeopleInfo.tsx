import React from 'react';
import { User } from '../types/People';

type Props = {
  user: User
};

export const PeopleInfo: React.FC<Props> = ({ user }) => (
  <>
    <td>{user.name}</td>
    <td>{user.sex}</td>
    <td>{user.born}</td>
    <td>{user.died}</td>
    <td>{user.fatherName}</td>
    <td>{user.motherName}</td>
  </>
);
