import React from 'react';
import classNames from '../utils/class-names';

function Timer({
  state,
  playPause,
  handleClickOnStopBtn,
  isTimerRunning,
  setState,
}) {
  const { focusDuration, breakDuration } = state;
  return (
    <React.Fragment>
      <div className='row'>
        <div className='col'>
          <div className='input-group input-group-lg mb-2'>
            <span className='input-group-text' data-testid='duration-focus'>
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {('0' + focusDuration).substr(-2)}:00
            </span>
            <div className='input-group-append'>
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type='button'
                className='btn btn-secondary'
                data-testid='decrease-focus'
                onClick={() => {
                  if (focusDuration > 5)
                    setState((currentState) => ({
                      ...currentState,
                      focusDuration: currentState['focusDuration'] - 5,
                    }));
                }}
              >
                <span className='oi oi-minus' />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type='button'
                className='btn btn-secondary'
                data-testid='increase-focus'
                onClick={() => {
                  if (focusDuration < 60)
                    setState((currentState) => ({
                      ...currentState,
                      focusDuration: currentState['focusDuration'] + 5,
                    }));
                }}
              >
                <span className='oi oi-plus' />
              </button>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='float-right'>
            <div className='input-group input-group-lg mb-2'>
              <span className='input-group-text' data-testid='duration-break'>
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {('0' + breakDuration).substr(-2)}:00
              </span>
              <div className='input-group-append'>
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-testid='decrease-break'
                  onClick={() => {
                    if (breakDuration > 1) {
                      setState((currentState) => ({
                        ...currentState,
                        breakDuration: currentState['breakDuration'] - 1,
                      }));
                    }
                  }}
                >
                  <span className='oi oi-minus' />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-testid='increase-break'
                  onClick={() => {
                    if (breakDuration < 15) {
                      setState((currentState) => ({
                        ...currentState,
                        breakDuration: currentState['breakDuration'] + 1,
                      }));
                    }
                  }}
                >
                  <span className='oi oi-plus' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div
            className='btn-group btn-group-lg mb-2'
            role='group'
            aria-label='Timer controls'
          >
            <button
              type='button'
              className='btn btn-primary'
              data-testid='play-pause'
              title='Start or pause timer'
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  'oi-media-play': !isTimerRunning,
                  'oi-media-pause': isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button
              type='button'
              disabled={!isTimerRunning}
              className='btn btn-secondary'
              data-testid='stop'
              title='Stop the session'
              onClick={handleClickOnStopBtn}
            >
              <span className='oi oi-media-stop' />
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Timer;
