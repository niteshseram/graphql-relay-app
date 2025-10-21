import {
  type CacheConfig,
  Environment,
  type GraphQLResponse,
  Network,
  QueryResponseCache,
  RecordSource,
  type RequestParameters,
  Store,
  type Variables,
} from 'relay-runtime';

const HTTP_ENDPOINT = `${process.env.NEXT_PUBLIC_SERVER_URL ?? ''}/graphql`;
const IS_SERVER = typeof window === typeof undefined;
const CACHE_TTL = 5 * 1000; // 5 seconds, to resolve preloaded results

export async function networkFetch(
  request: RequestParameters,
  variables: Variables,
): Promise<GraphQLResponse> {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  const json = await resp.json();

  // Log errors for debugging
  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
  }

  if (!resp.ok) {
    throw new Error(`Response failed with status ${resp.status}`);
  }

  return json;
}

export const responseCache: QueryResponseCache | null = IS_SERVER
  ? null
  : new QueryResponseCache({
      size: 100,
      ttl: CACHE_TTL,
    });

function createNetwork() {
  async function fetchResponse(
    params: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig,
  ) {
    const isQuery = params.operationKind === 'query';
    const cacheKey = params.id ?? params.cacheID;
    const forceFetch = cacheConfig?.force;
    if (responseCache != null && isQuery && !forceFetch) {
      const fromCache = responseCache.get(cacheKey, variables);
      if (fromCache != null) {
        return Promise.resolve(fromCache);
      }
    }

    return networkFetch(params, variables);
  }

  const network = Network.create(fetchResponse);
  return network;
}

function createEnvironment() {
  return new Environment({
    network: createNetwork(),
    store: new Store(RecordSource.create()),
    isServer: IS_SERVER,
  });
}

export const environment = createEnvironment();

export function getCurrentEnvironment() {
  if (IS_SERVER) {
    return createEnvironment();
  }

  return environment;
}
