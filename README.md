# Primea V3 Core

[![Lint](https://github.com/PrimeaNetwork/primea-v3-core/actions/workflows/lint.yml/badge.svg)](https://github.com/PrimeaNetwork/primea-v3-core/actions/workflows/lint.yml)
[![Tests](https://github.com/PrimeaNetwork/primea-v3-core/actions/workflows/tests.yml/badge.svg)](https://github.com/PrimeaNetwork/primea-v3-core/actions/workflows/tests.yml)
[![Fuzz Testing](https://github.com/PrimeaNetwork/primea-v3-core/actions/workflows/fuzz-testing.yml/badge.svg)](https://github.com/PrimeaNetwork/primea-v3-core/actions/workflows/fuzz-testing.yml)
[![npm version](https://img.shields.io/npm/v/@primea/v3-core/latest.svg)](https://www.npmjs.com/package/@primea/v3-core/v/latest)

This repository contains the core smart contracts for the Primea V3 Protocol. Forked from Uniswap v3-core (GPL-2.0-or-later) and adapted for Primea’s governance architecture.

For higher-level contracts and integrations, see the [primea-v3-periphery](https://github.com/PrimeaNetwork/primea-v3-periphery) repository.

## License and Attribution

This repository is a fork of [Uniswap v3-core (archived)](https://github.com/Uniswap/v3-core), originally licensed under Business Source License 1.1 (BUSL-1.1). As of **April 1, 2024**, per Uniswap Labs’ licensing policy, the code is now available under the **GNU General Public License v2.0 or later**.

All files in this repository are governed by the `GPL-2.0-or-later` license unless otherwise specified in the SPDX headers.

## Bug Bounty

Primea will offer a security bounty program for vulnerabilities discovered in this implementation. Details will be announced post-mainnet.

## Local Deployment

To deploy this code locally, install the npm package `@primea/v3-core` and import the factory bytecode located at:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@primea/v3-core/artifacts/contracts/PrimeaV3Factory.sol/PrimeaV3Factory.json'
```

## Solidity Interfaces

Interfaces are available via:

```solidity
import '@primea/v3-core/contracts/interfaces/IPrimeaV3Pool.sol';

contract MyContract {
  IPrimeaV3Pool pool;

  function doSomethingWithPool() external {
    // pool.swap(...);
  }
}
```

## SPDX Headers

All source files include proper SPDX identifiers:

- Most contracts: `SPDX-License-Identifier: GPL-2.0-or-later`
- Legacy libraries (e.g., FullMath.sol): `SPDX-License-Identifier: MIT`

## Note

This is a governance-controlled version of the v3 AMM model, tailored for asset-backed pairs on Primea, with enforced token whitelisting via `GovernedPoolFactory.sol` and `TokenRegistry.sol`.
