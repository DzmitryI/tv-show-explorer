import { useCallback, useEffect, useRef, useState } from 'react';
import { searchShows } from './api/TvMazeApi';
import type { TvShow } from './types';

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

interface SearchState {
  status: SearchStatus
  query: string
  shows: TvShow[]
}

export function useShowSearch() {
  const [state, setState] = useState<SearchState>({ status: 'idle', query: '', shows: [] });
  const controllerRef = useRef<AbortController | null>(null);
  const loadingQueryRef = useRef<string | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const search = useCallback(async (query: string) => {
    if (loadingQueryRef.current === query) {
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    loadingQueryRef.current = query;
    setState({ status: 'loading', query, shows: [] });

    try {
      const shows = await searchShows(query, controller.signal);
      setState({ status: 'success', query, shows });
    } catch {
      if (!controller.signal.aborted) {
        setState({ status: 'error', query, shows: [] });
      }
    } finally {
      if (controllerRef.current === controller) {
        loadingQueryRef.current = null;
      }
    }
  }, []);

  const reset = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    loadingQueryRef.current = null;
    setState({ status: 'idle', query: '', shows: [] });
  }, []);

  return { ...state, search, reset };
}
