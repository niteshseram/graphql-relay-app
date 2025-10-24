import type { ReaderFragment } from 'relay-runtime';

function extractConnectionKey(value: string): string | null {
  const match = /^__([a-zA-Z0-9_\s]+)_connection$/.exec(value);
  return match ? match[1] : null;
}

/**
 * This is a runtime check for verifying that the provided connection key exists,
 * throw during development, warning during production.
 *
 * @param connectionKey Connection string
 * @param node GraphQL node
 * @returns
 */
export function connectionAnnotationKey(
  connectionKey: string,
  node: ReaderFragment,
) {
  const names = node.selections
    .filter((selection) => selection.kind === 'LinkedField')
    .map((selection) => extractConnectionKey(selection.name))
    .filter(Boolean);

  if (names.length === 0) {
    const error = `The provided fragment does not contain any connections.`;

    if (process.env.NODE_ENV !== 'production') {
      throw new Error(error);
    } else {
      console.warn(error);
    }
  }

  if (!names.includes(connectionKey)) {
    const error = `The provided connection key "${connectionKey}" does not match any keys in the fragment:\n\n${names.map((name) => `- ${name}`).join('\n')}`;

    if (process.env.NODE_ENV !== 'production') {
      throw new Error(error);
    } else {
      console.warn(error);
    }
  }

  return connectionKey;
}
