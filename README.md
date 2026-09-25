# Games

A local-first hub for playing a curated set of free web games in one place.

## Run locally

Requires Node.js 18+.

```sh
npm start
```

Then open http://localhost:3000.

## Add a game

Edit the `games` array in `app.js` and add an entry with:

- `title`: display name
- `category`: filter bucket
- `mood`: short descriptor
- `art`: one of the existing art classes
- `label`: short card artwork label
- `embed`: URL to load in the iframe
- `source`: canonical page to open when a host blocks embedding

Some game hosts intentionally prevent iframe embedding. Arcade Atlas keeps a source link in the player so those games can still be opened without copying or hosting their files locally. Only add games you have permission to link to and that are free to play.
