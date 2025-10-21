/**
 * @generated SignedSource<<b1ba29d6d6a23c763e4eb07805f42882>>
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
            "concreteType": "UserPokemonsConnection",
            "kind": "LinkedField",
            "name": "pokemons",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserPokemonsConnectionEdge",
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
    "cacheID": "2c76ac627783b15616245d7e93b90a3f",
    "id": null,
    "metadata": {},
    "name": "pageRelayEntryPointQuery",
    "operationKind": "query",
    "text": "query pageRelayEntryPointQuery {\n  viewer {\n    ...pageUserCard_user\n    id\n  }\n}\n\nfragment pageUserCard_user on User {\n  pokemons {\n    edges {\n      node {\n        id\n        nickname\n        pokemon {\n          name\n          id\n        }\n        shiny\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b7dc865ab2f114c4d9bb5e59c8efda40";

export default node;
