import PropTypes from 'prop-types';

export const personType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  fatherName: PropTypes.string,
  motherName: PropTypes.string,
  slug: PropTypes.string.isRequired,
});
