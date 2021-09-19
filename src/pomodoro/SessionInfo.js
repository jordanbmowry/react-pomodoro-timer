import React from 'react';

function SessionInfo({
  session,
  displayFocusOrBreakText,
  displayRemainingMinutesText,
  fillProgressBar,
}) {
  let sessionInfo;
  const currentPercentage = fillProgressBar(session);
  if (!session) {
    sessionInfo = null;
  } else {
    sessionInfo = (
      <React.Fragment>
        <div className='row mb-2'>
          <div className='col'>
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid='session-title'>
              {displayFocusOrBreakText(session)}
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className='lead' data-testid='session-sub-title'>
              {displayRemainingMinutesText(session)}
            </p>
          </div>
        </div>
        <div className='row mb-2'>
          <div className='col'>
            <div className='progress' style={{ height: '20px' }}>
              <div
                className='progress-bar'
                role='progressbar'
                aria-valuemin='0'
                aria-valuemax='100'
                aria-valuenow={currentPercentage} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${currentPercentage}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  return sessionInfo;
}

export default SessionInfo;
