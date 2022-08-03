import classNames from 'classnames';
import React from 'react';

type Props = {
  isLoadingPeopleError: boolean,
};

export const ModalError:React.FC<Props> = ({ isLoadingPeopleError }) => {
  return (
    <div className={classNames(
      'modal',
      { 'is-active': isLoadingPeopleError },
    )}
    >
      <div className="modal-background" />
      <div className="modal-content">
        <p style={{ fontSize: '50px', color: 'white' }}>
          Cant load people data from server
        </p>
      </div>
      <button
        className="modal-close is-large"
        type="button"
        aria-label="close"
      />
    </div>
  );
};
