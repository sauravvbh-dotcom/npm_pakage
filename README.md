# env-guard-cli

A simple zero-dependency CLI tool to scan and check environment variables in your project.

## Installation

```bash
npm install -D env-guard-cli
```

## Usage

Run any of the following commands:

```bash
npx env-guard-cli --check
npx env-guard-cli --sync
npx env-guard-cli --help
```

## Example

If your code contains:

```js
const port = process.env.PORT;
const db = process.env.DATABASE_URL;
```

Running `--check` compares these against `.env` and reports missing variables.
Running `--sync` writes missing keys into `.env.example`.

## License

MIT
