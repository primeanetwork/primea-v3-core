// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IPrimeaV3PoolImmutables.sol';
import './pool/IPrimeaV3PoolState.sol';
import './pool/IPrimeaV3PoolDerivedState.sol';
import './pool/IPrimeaV3PoolActions.sol';
import './pool/IPrimeaV3PoolOwnerActions.sol';
import './pool/IPrimeaV3PoolEvents.sol';

/// @title Interface for Primea V3 Pool (based on Uniswap V3)
/// @notice Implements swapping and automated market making logic based on the Uniswap V3 architecture.
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IPrimeaV3Pool is
    IPrimeaV3PoolImmutables,
    IPrimeaV3PoolState,
    IPrimeaV3PoolDerivedState,
    IPrimeaV3PoolActions,
    IPrimeaV3PoolOwnerActions,
    IPrimeaV3PoolEvents
{

}
