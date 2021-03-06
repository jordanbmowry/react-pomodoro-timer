import React, { useState } from 'react';
import useInterval from '../utils/useInterval';
import SessionInfo from './SessionInfo';
import Timer from './Timer';

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === 'Focusing') {
      return {
        label: 'On Break',
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: 'Focusing',
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  const initialState = {
    elapsed: 0,
    focusDuration: 25,
    breakDuration: 5,
    aria: 0,
    breakLeft: 0,
  };

  const [state, setState] = useState({ ...initialState });
  const { focusDuration, breakDuration, aria } = state;

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      setState((currentState) => ({
        ...currentState,
        breakLeft: currentState['breakLeft'] + 1,
      }));
      if (session.timeRemaining === 0) {
        new Audio('https://bigsoundbank.com/UPLOAD/mp3/1482.mp3').play();
        setSession(nextSession(focusDuration, breakDuration));
      }
      setSession(nextTick);
      const left = session.timeRemaining;
      if (session.label === 'Focusing') {
        setState((currentState) => ({
          ...currentState,
          aria: (100 * (focusDuration * 60 - left)) / (focusDuration * 60),
        }));
      } else {
        setState((currentState) => ({
          ...currentState,
          aria: (100 * (breakDuration * 60 - left)) / (breakDuration * 60),
        }));
      }
    },
    isTimerRunning ? 1000 : null
  );

  useInterval(() => {
    if (session && session.timeRemaining) {
      // return setElapsed(elapsed + 1);
      return setState((currentState) => ({
        ...currentState,
        elapsed: currentState['elapsed'] + 1,
      }));
    }
  }, 1000);
  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: 'Focusing',
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  function handleClickOnStopBtn() {
    setSession(null);
    setIsTimerRunning(false);
    setState({ ...initialState });
  }

  return (
    <div className='pomodoro'>
      <link
        rel='stylesheet'
        href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
        integrity='sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z'
        crossorigin='anonymous'
      />
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css'
        integrity='sha512-UyNhw5RNpQaCai2EdC+Js0QL4RlVmiq41DkmCJsRV3ZxipG2L0HhTqIf/H9Hp8ez2EnFlkBnjRGJU2stW3Lj+w=='
        crossorigin='anonymous'
      />
      <Timer
        isTimerRunning={isTimerRunning}
        state={state}
        playPause={playPause}
        handleClickOnStopBtn={handleClickOnStopBtn}
        setState={setState}
      />
      {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
      <SessionInfo state={state} session={session} />
    </div>
  );
}

export default Pomodoro;
