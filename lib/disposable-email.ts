export const disposableDomains = new Set([
  "10minutemail.com",
  "mailinator.com",
  "guerrillamail.com",
  "temp-mail.org",
  "yopmail.com",
  "tempmail.com",
  "throwawaymail.com",
  "getnada.com",
  "dispostable.com",
  "fake-email.com",
  // Add more domains as needed
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1];
  if (!domain) {
    return false;
  }
  return disposableDomains.has(domain.toLowerCase());
}
