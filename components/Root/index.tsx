'use client';

import { type PropsWithChildren } from 'react';

import { init } from '@/core';
import './styles.css';
import { useClientOnce } from '@/hooks/useClientOnce';
import { useDidMount } from '@/hooks/useDidMount';
import { ErrorBoundary } from '../Telegram/ErrorBoundary';
import { ErrorPage } from '../Telegram/ErrorPage';


function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === 'development';

  // Initialize the library.
  useClientOnce(() => {
    init(isDev);
  });

  return (
    <>
      {children}
    </>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();

  if (process.env.NEXT_PUBLIC_APP_NAME !== "TG") {
    const { children } = props
    return <>{children}</>
  }


  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : <div className="root__loading">Loading</div>;
}