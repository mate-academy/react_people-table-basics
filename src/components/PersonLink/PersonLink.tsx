import React from 'react';
import { Person, Sex } from '../../types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

type Props = {
  person: Person;
};

const sexColorMap: Record<Sex, string> = {
  [Sex.Male]: 'has-text-link',
  [Sex.Female]: 'has-text-danger',
  [Sex.Intersex]: 'has-text-warning',
  [Sex.TransMale]: 'has-text-info',
  [Sex.TransFemale]: 'has-text-primary',
  [Sex.NonBinary]: 'has-text-success',
  [Sex.Genderqueer]: 'has-text-purple',
  [Sex.Agender]: 'has-text-grey',
  [Sex.Bigender]: 'has-text-orange',
  [Sex.TwoSpirit]: 'has-text-link-dark',
  [Sex.Genderfluid]: 'has-text-pink',
  [Sex.Other]: 'has-text-dark',
  [Sex.Unknown]: 'has-text-grey-light',
};

const PersonLink: React.FC<Props> = ({ person }) => {
  const colorClass = sexColorMap[person.sex] || 'has-text-grey';

  return (
    <Link to={`${person.slug}`} className={cn(colorClass)}>
      {person.name}
    </Link>
  );
};

export default PersonLink;
