import PropTypes from 'prop-types';

export const PersonShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sex: PropTypes.string.isRequired,
  born: PropTypes.number.isRequired,
  died: PropTypes.number.isRequired,
  father: PropTypes.string,
  mother: PropTypes.string,
  slug: PropTypes.string.isRequired,
};
