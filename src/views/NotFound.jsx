import PropTypes from 'prop-types';

export default function NotFound({ text }) {
  return <p>{text}</p>;
}

NotFound.propTypes = {
  text: PropTypes.string,
};
