/**
 * @generated SignedSource<<13fd34080674b7577d59efc5d96dc413>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageRelayEntryPointQuery$variables = Record<PropertyKey, never>;
export type pageRelayEntryPointQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"pageUserCard_user">;
  } | null | undefined;
};
export type pageRelayEntryPointQuery = {
  response: pageRelayEntryPointQuery$data;
  variables: pageRelayEntryPointQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pageRelayEntryPointQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "pageUserCard_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pageRelayEntryPointQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserCaughtPokemonConnection",
            "kind": "LinkedField",
            "name": "caughtPokemon",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserCaughtPokemonConnectionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CaughtPokemon",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "nickname",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Pokemon",
                        "kind": "LinkedField",
                        "name": "pokemon",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "shiny",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d4cf5f9ecfe2a9db47467cf8616a006b",
    "id": null,
    "metadata": {},
    "name": "pageRelayEntryPointQuery",
    "operationKind": "query",
    "text": "query pageRelayEntryPointQuery {\n  viewer {\n    ...pageUserCard_user\n    id\n  }\n}\n\nfragment pageUserCard_user on User {\n  caughtPokemon {\n    edges {\n      node {\n        id\n        nickname\n        pokemon {\n          name\n          id\n        }\n        shiny\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b7dc865ab2f114c4d9bb5e59c8efda40";

export default node;
