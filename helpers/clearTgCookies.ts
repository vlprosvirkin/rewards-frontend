export function clearCookies(domain: string) {
  const cookies = document?.cookie?.split("; ");
  for (let cookie of cookies) {
    const domainParts = domain?.split(".");
    let cookieDomain = "";
    for (let i = domainParts?.length - 1; i >= 0; i--) {
      cookieDomain = `.${domainParts?.slice(i).join(".")}`;
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${cookieDomain}`;
    }
  }

}