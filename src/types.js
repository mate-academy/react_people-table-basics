import PropTypes from 'prop-types';

export const ObjectType = PropTypes.shape({
  name: PropTypes.string,
  sex: PropTypes.string,
  born: PropTypes.number,
  died: PropTypes.number,
  motherName: PropTypes.string,
  fatherName: PropTypes.string,
});
