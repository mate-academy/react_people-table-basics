import PropTypes from 'prop-types';

export const PersonRowShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  motherName: PropTypes.string.isRequired,
  fatherName: PropTypes.string.isRequired,
}).isRequired;
