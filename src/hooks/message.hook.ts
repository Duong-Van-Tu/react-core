import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useRootSelector } from './selector.hook';
import { clearMessageAction } from '../redux/slicers/api-message.slice';

export function useWatchMessage(...keys: string[]) {
  const box = useRootSelector((state) => {
    const box = state.apiMessage.box;
    return keys.map((key) => box[key]);
  });
  const dispatch = useDispatch();

  const _keys = useMemo(() => {
    return keys;
  }, [...keys]);

  useEffect(() => {
    return () => {
      dispatch(clearMessageAction(_keys));
    };
  }, [dispatch, _keys]);

  return useMemo(() => {
    const errors = [];
    const successes = [];
    for (const { type, messages } of box.filter(Boolean) as MessageOptions[]) {
      if (type === 'error') {
        errors.push(...messages);
      } else {
        successes.push(...messages);
      }
    }
    return {
      errors,
      successes,
    };
  }, [...box]);
}
