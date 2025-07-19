import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimePrimeaV3Pool } from '../../typechain/MockTimePrimeaV3Pool'
import { TestERC20 } from '../../typechain/TestERC20'
import { PrimeaV3Factory } from '../../typechain/PrimeaV3Factory'
import { TestPrimeaV3Callee } from '../../typechain/TestPrimeaV3Callee'
import { TestPrimeaV3Router } from '../../typechain/TestPrimeaV3Router'
import { MockTimePrimeaV3PoolDeployer } from '../../typechain/MockTimePrimeaV3PoolDeployer'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: PrimeaV3Factory
}

async function factoryFixture(): Promise<FactoryFixture> {
  const factoryFactory = await ethers.getContractFactory('PrimeaV3Factory')
  const factory = (await factoryFactory.deploy()) as PrimeaV3Factory
  return { factory }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestPrimeaV3Callee
  swapTargetRouter: TestPrimeaV3Router
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimePrimeaV3Pool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimePrimeaV3PoolDeployerFactory = await ethers.getContractFactory('MockTimePrimeaV3PoolDeployer')
  const MockTimePrimeaV3PoolFactory = await ethers.getContractFactory('MockTimePrimeaV3Pool')

  const calleeContractFactory = await ethers.getContractFactory('TestPrimeaV3Callee')
  const routerContractFactory = await ethers.getContractFactory('TestPrimeaV3Router')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestPrimeaV3Callee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestPrimeaV3Router

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer = (await MockTimePrimeaV3PoolDeployerFactory.deploy()) as MockTimePrimeaV3PoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string
      return MockTimePrimeaV3PoolFactory.attach(poolAddress) as MockTimePrimeaV3Pool
    },
  }
}
