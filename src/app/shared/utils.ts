export function sanitisedUserInput(input: string): string {
  if (!input) return '';

  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
    '`': '&#x60;',
  };

  return input.replace(/[&<>"'`]/g, (char) => map[char]);
}
