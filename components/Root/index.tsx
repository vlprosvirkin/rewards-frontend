'use client';

import { type PropsWithChildren } from 'react';

import { init } from '@/core';
import './styles.css';
import { useClientOnce } from '@/hooks/useClientOnce';
import { useDidMount } from '@/hooks/useDidMount';
import { ErrorBoundary } from '../Telegram/ErrorBoundary';
import { ErrorPage } from '../Telegram/ErrorPage';
import { postEvent } from '@telegram-apps/sdk-react';


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

  postEvent('web_app_expand');
  postEvent('web_app_setup_main_button', { is_visible: false })
  postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false })
  postEvent('web_app_ready');


  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : <div className="root__loading">Loading</div>;
}