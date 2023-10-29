declare global {
  interface Window {
    grecaptcha: {
      ready: (readyCallback: () => void) => void;
      execute: (recaptchaPublicApiKey: string, option: { action: string }) => Promise<string>
    }
  }
}

export {}
