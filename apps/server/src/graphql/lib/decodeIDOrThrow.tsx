import parseInteger from '@nkzw/core/parseInteger.js';
import decodeGlobalID from './decodeGlobalID.tsx';
import { EntityIDPrefix } from './encodeGlobalID.tsx';

export default function decodeIDOrThrow(
  type: EntityIDPrefix,
  globalID: string,
) {
  const { id, typename } = decodeGlobalID(globalID);
  const number = parseInteger(id);
  if (typename !== type || !number) {
    throw new Error(
      `Expected '${type}' but received '${typename}' with id '${id}'.`,
    );
  }
  return number;
}
