import React from 'react';
import { ServerIPerson } from '../../api/interface';

import './Parents.scss';

type Parents = {
  parents: ServerIPerson;
};

export const Parents: React.FC<Parents> = ({ parents }) => (
  <ul>
    <li className="parents-info">
      Name:
      {parents.name}
    </li>
    <li className="parents-info">
      Sex:
      {parents.sex}
    </li>
    <li className="parents-info">
      Born:
      {parents.born}
    </li>
    <li className="parents-info">
      Died:
      {parents.died}
    </li>
    <li className="parents-info">
      Father:
      {parents.fatherName}
    </li>
    <li className="parents-info">
      Mother:
      {parents.motherName}
    </li>
  </ul>
);
