// TODO: move in common js package
const base64UrlDecode = (input: string): string => {
  // Convert Base64Url to regular Base64
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  // Add padding if needed
  const padLength = 4 - (base64.length % 4);
  if (padLength !== 4) base64 += '='.repeat(padLength);
  // Decode using browser's atob function
  return decodeURIComponent(escape(atob(base64)));
};

export const parseJWT = (input: string): { jwt: string } => {
  return JSON.parse(base64UrlDecode(input || ''));
};
