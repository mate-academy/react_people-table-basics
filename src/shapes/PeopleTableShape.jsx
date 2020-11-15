import PropTypes from 'prop-types';
import { PersonRowShape } from './PersonRowShape';

export const PeopleTableShape = PropTypes.arrayOf(
  PersonRowShape,
).isRequired;
