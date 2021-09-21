import React from 'react';
import { secondsToDuration } from '../utils/duration';

function SessionInfo({ session, state }) {
  const { focusDuration, breakDuration, aria } = state;
  if (!session) {
    return null;
  } else {
    return (
      <React.Fragment>
        <div className='row mb-2'>
          <div className='col'>
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
            <h2 data-testid='session-title'>
              {session && session.label} for{' '}
              {(
                '0' +
                (session.label.toLowerCase().indexOf('ocus') > 0
                  ? focusDuration
                  : breakDuration)
              ).substr(-2)}
              :00 minutes
            </h2>
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className='lead' data-testid='session-sub-title'>
              {session && secondsToDuration(session.timeRemaining)} remaining
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
                aria-valuenow={aria} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${aria}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SessionInfo;
