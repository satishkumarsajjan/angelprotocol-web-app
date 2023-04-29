import { WithoutInstallers } from "contexts/WalletContext/types";
import { Chain } from "types/aws";
import { WALLET_METADATA } from "contexts/WalletContext/constants";
import { chainIds } from "constants/chainIds";
import { EMAIL_SUPPORT } from "constants/common";
import { EXPECTED_NETWORK_TYPE } from "constants/env";

export const AP_ERROR_DISCRIMINATOR = "AP_ERROR_DISCRIMINATOR";

interface IAPError extends Error {
  discriminator: string;
}

export abstract class APError extends Error implements IAPError {
  discriminator: string;
  constructor(name: string, message: string) {
    super(message);
    this.name = name;
    this.discriminator = AP_ERROR_DISCRIMINATOR;
  }

  toSerializable(): IAPError {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      cause: this.cause,
      discriminator: this.discriminator,
    };
  }
}

export class LogApplicationUpdateError extends Error {
  chainId: string;
  pollId: string;
  constructor(chainId: string, pollId: string) {
    super("Failed to log the Poll ID of your proposal");
    this.chainId = chainId;
    this.pollId = pollId;
    this.name = "ApplicationReviewPollUpdateError";
  }
}

export class LogDonationFail extends Error {
  chainId: string;
  txHash: string;
  constructor(chainId: string, txHash: string) {
    super(
      `Failed to log your donation for receipt purposes. Kindly send an email to ${EMAIL_SUPPORT}`
    );
    this.chainId = chainId;
    this.txHash = txHash;
    this.name = "LogDonationFail";
  }
}

export class WalletDisconnectedError extends APError {
  constructor() {
    super("WalletDisconnectedError", "Wallet is not connected");
  }
}

export class UnexpectedStateError extends APError {
  constructor(message = "App is in unexpected state") {
    super("UnexpectedStateError", message);
  }
}

export class WrongChainError extends APError {
  constructor(expectedChain?: string) {
    super(
      "WrongChainError",
      `Connected to the wrong chain.${
        !expectedChain
          ? ""
          : ` Please connect to the ${expectedChain} chain and reload the page.`
      }`
    );
  }
}

export class WrongNetworkError extends APError {
  constructor() {
    super(
      "WrongNetworkError",
      `Please connect to ${EXPECTED_NETWORK_TYPE} network and reload the page.`
    );
  }
}

export class UnsupportedChainError extends APError {
  constructor(unsupportedChainId: string) {
    super(
      "UnsupportedChainError",
      `The chain you are connected to (ID: ${unsupportedChainId}) is not supported. Valid networks are ${EXPECTED_NETWORK_TYPE} ones on: Juno (${chainIds.juno}), Polygon (${chainIds.polygon}), Terra (${chainIds.terra}), Binance (${chainIds.binance}) and Ethereum (${chainIds.ethereum}). Please switch to one of those and reload the page.`
    );
  }
}

export class ManualChainSwitchRequiredError extends APError {
  constructor(chainId: string) {
    super(
      "ManualChainSwitchRequiredError",
      `Please use your wallet to switch to ${chainId} chain and reload the page`
    );
  }
}

export class CosmosTxSimulationFail extends APError {
  constructor(
    message = "Submission aborted. This transaction is likely to fail"
  ) {
    super("CosmosTxSimulationFail", message);
  }
}

export class TxResultFail extends Error {
  chain: Chain;
  txHash: string;
  constructor(chain: Chain, txHash: string) {
    //No need to dump to user technical details of why result failed, a link to failed tx is sufficient
    super("Failed to broadcast transaction");
    this.chain = chain;
    this.txHash = txHash;
    this.name = "TxResultFail";
  }
}

export class WalletNotInstalledError extends APError {
  providerId: WithoutInstallers;
  constructor(providerId: WithoutInstallers) {
    super(
      "WalletNotInstalledError",
      `Wallet ${WALLET_METADATA[providerId].name} not installed`
    );
    this.providerId = providerId;
  }
}

export class WalletError extends APError {
  //based on EIP1193 error spec
  code: number;
  data?: unknown;
  constructor(message: string, code: number, data?: unknown) {
    super("WalletError", message);
    this.code = code;
    this.data = data;
  }
}
