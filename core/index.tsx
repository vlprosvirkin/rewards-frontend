import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
  postEvent,
} from '@telegram-apps/sdk-react';

/**
 * Initializes the application and configures its dependencies.
 */
export function init(debug: boolean): void {
  // Set @telegram-apps/sdk-react debug mode.
  $debug.set(debug);

  // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
  // Also, configure the package.
  initSDK();

  postEvent('web_app_expand');
  postEvent('web_app_setup_main_button', { is_visible: false })
  postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false })
  postEvent('web_app_ready');

  // Mount all components used in the project.
  backButton.isSupported() && backButton.mount();
  miniApp.mount();
  themeParams.mount();
  initData.restore();
  void viewport.mount().catch(e => {
    console.error('Something went wrong mounting the viewport', e);
  });

  // Define components-related CSS variables.
  viewport.bindCssVars();
  miniApp.bindCssVars();
  themeParams.bindCssVars();

  // Add Eruda if needed.
  debug && import('eruda')
    .then((lib) => lib.default.init())
    .catch(console.error);
}