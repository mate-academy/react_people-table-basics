/* eslint-disable react/jsx-filename-extension */
import './loader.css';

export const Loader = () => {
  return (
    <div className="loader-wrap">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
