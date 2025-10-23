import parseInteger from '@nkzw/core/parseInteger.js';
import decodeGlobalID from './decodeGlobalID.tsx';
import type { EntityIDPrefix } from './encodeGlobalID.tsx';

export default function decodeIDOrThrow(
  type: EntityIDPrefix,
  globalID: string,
) {
  const { id, typename } = decodeGlobalID(globalID);

  if (type === 'pm') {
    // If type is pokemon, we expect a numeric ID
    const number = parseInteger(id);
    if (typename !== type || !number) {
      throw new Error(
        `Expected '${type}' but received '${typename}' with id '${id}'.`,
      );
    }

    return number;
  }

  if (typename !== type) {
    // For other types (like caught_pokemon), we return the string ID
    throw new Error(
      `Expected '${type}' but received '${typename}' with id '${id}'.`,
    );
  }

  return id;
}
