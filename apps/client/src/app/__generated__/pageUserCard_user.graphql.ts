/**
 * @generated SignedSource<<0dbdb9fe3dfec65e8e0975a2c88be947>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageUserCard_user$data = {
  readonly caughtPokemon: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly nickname: string | null | undefined;
        readonly pokemon: {
          readonly name: string;
        } | null | undefined;
        readonly shiny: boolean;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  };
  readonly " $fragmentType": "pageUserCard_user";
};
export type pageUserCard_user$key = {
  readonly " $data"?: pageUserCard_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"pageUserCard_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "pageUserCard_user",
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
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
                    }
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "ba0f152cd89137139e98e48981ec4d84";

export default node;
