# Mnemonic Missing Word Recovery 🔍

This project provides a TypeScript script that helps recover the missing 12th word of a 12-word mnemonic recovery
phrase (also known as a Secret Recovery Phrase) for an Ethereum wallet. The script compares derived Ethereum addresses
from candidate phrases with a known public key to identify the correct phrase.

## Features

- 🔄 **Automated Search** for the missing 12th word from a given 11-word mnemonic recovery phrase.
- ✅ **Validates** the derived Ethereum address against the provided public key.
- 💥 **Error Handling** for invalid mnemonics and unexpected issues.
- 📜 **BIP39 Compliance** for generating and validating mnemonic phrases.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) v16+
- [pnpm](https://pnpm.io/) (recommended package manager)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/mnemonic-missing-word-recovery.git
    cd mnemonic-missing-word-recovery
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

## Usage

Run the script using `npx ts-node`. You need to provide the 11-word mnemonic phrase and the target Ethereum public
address.

```bash
npx ts-node src/index.ts "word1 word2 ... word11" "0xYourEthereumAddress"
```

### Example

```bash
npx ts-node src/index.ts "injury forest race chuckle capable wedding leg hobby wood evoke panther" "0x6BBf5B41491870Dcb446281311CFD8d8350bCfDf"
```

### Output

If the correct 12th word is found, the script will output:

```
✅ Success! Derived address: 0x6BBf5B41491870Dcb446281311CFD8d8350bCfDf matches the target.
🎉 Found the correct phrase: injury forest race chuckle capable wedding leg hobby wood evoke panther [12th word]
```

## Scripts

- `pnpm start`: Starts the script in development mode.
- `pnpm build`: Builds the TypeScript code to JavaScript.
- `pnpm serve`: Runs the JavaScript version of the built code.

## Project Structure

```bash
.
├── src
│   └── index.ts   # Main script to find the missing mnemonic word
├── package.json   # Project configuration and dependencies
├── tsconfig.json  # TypeScript configuration
└── README.md      # This documentation
```

## Dependencies

- `bip39`: For mnemonic generation and validation.
- `ethers`: For deriving Ethereum addresses from mnemonic phrases.
- `lodash`: For utility functions such as string manipulation and array chunking.
