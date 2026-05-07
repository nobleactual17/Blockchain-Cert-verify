# Blockchain Certificate Verification (Solidity + Truffle + Ganache)

Beginner-friendly Ethereum project for a college blockchain lab experiment. It stores certificates on-chain and lets you verify them.

## Project Structure

```
contracts/
  CertificateVerification.sol
  Migrations.sol
migrations/
  1_initial_migration.js
  2_deploy_contract.js
test/
  certificateVerification.test.js
truffle-config.js
package.json
```

## Project Walkthrough

1. **Smart contracts** (`contracts/`):
   - `CertificateVerification.sol` stores certificates in a mapping, emits events, and exposes `addCertificate` + `verifyCertificate`.
   - `Migrations.sol` is Truffle’s bookkeeping contract for migration history.
2. **Migrations** (`migrations/`):
   - `1_initial_migration.js` deploys the Truffle migrations contract.
   - `2_deploy_contract.js` deploys the certificate verification contract.
3. **Configuration** (`truffle-config.js`):
   - Targets a local Ganache node on `127.0.0.1:8545`.
   - Uses the bundled `solc` JavaScript build for offline-friendly compilation.
4. **Tests** (`test/certificateVerification.test.js`):
   - Adds certificates, verifies them, and asserts reverts for invalid operations.
5. **Scripts** (`package.json`):
   - `npm run ganache` starts the local chain.
   - `npm run compile`, `npm run migrate`, and `npm test` handle build + deployment + tests.

## Prerequisites

- Node.js 18+ and npm
- Truffle (installed via project dependencies)
- Ganache local blockchain (installed via project dependencies)

## Setup (GitHub Codespaces friendly)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start Ganache in a terminal (keep it running):
   ```bash
   npm run ganache
   ```
   > In Codespaces, this binds Ganache to `0.0.0.0:8545` so the port is accessible.

3. Compile the smart contracts:
   ```bash
   npm run compile
   ```

4. Deploy (migrate) to the local Ganache chain:
   ```bash
   npm run migrate
   ```

5. Run tests:
   ```bash
   npm test
   ```

## Expected Test Output

```
  Contract: CertificateVerification
    ✓ adds a certificate with default unverified status
    ✓ verifies an existing certificate
    ✓ reverts when adding a duplicate certificate
    ✓ reverts when verifying a missing certificate

  4 passing
```

## Smart Contract Overview

- **addCertificate(certificateId, studentName, courseName)**  
  Adds a new certificate and marks it as unverified.

- **verifyCertificate(certificateId)**  
  Marks an existing certificate as verified.

You can also read certificates directly via the public mapping:
`certificates(certificateId)`.

## Notes

- If you prefer the Ganache GUI, make sure it runs on port `8545` or update the `development` network in `truffle-config.js`.
- Compilation uses the local `solc` JavaScript build bundled in `node_modules` to keep the setup offline-friendly.
- This project uses Solidity `^0.8.0` and is designed for easy demo and learning.
