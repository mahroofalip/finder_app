import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store'; // Adjust import based on your store setup
import socket from '../../socket.ts/socket';
import { intewellToFetch, offlineInterwel } from '../../consts';

const useUserActivity = () => {
  const { user } = useSelector((state: RootState) => state.auth); // Adjust according to your state structure
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now()); // Track the last activity time
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Timeout for inactivity

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    // Emit online status immediately
    socket.emit('online', user);
    // Set up a timeout to check for inactivity
    inactivityTimeoutRef.current = setTimeout(() => {
      const currentTime = Date.now();
      const timeDiff = currentTime - lastActivityRef.current;

      if (timeDiff >= offlineInterwel) { // 1 minute (60000 ms)
        socket.emit('offline', user);
      }
    }, offlineInterwel); // Check inactivity after 1 minute
  };

  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now(); // Update last activity time
      resetTimeout(); // Reset the online status and inactivity timeout
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        socket.emit('offline', user);
      } else {
        socket.emit('online', user);
      }
    };

    const handleBeforeUnload = () => {
      socket.emit('offline', user);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [user]);

  return null;
};

export default useUserActivity;
