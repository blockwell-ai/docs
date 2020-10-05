---
title: API Miner changelog
---

# Changelog

## 1.1.7

* Contract methods accept `value` in body to include an Ether value in the transaction.
* Transactions accept `waitForAsset` and `waitForValue`, which makes the transaction
  be delayed until the sending account has the specified asset with the given value
  or greater.

## 1.1.6

* More options for filtering and sorting transaction history.
* Transactions include `contractAddress`, `contractNetwork`, `contractName` and
  `contractBwtype` when applicable.
* Contracts include `bwtype` and `bwver` when applicable.
* Batch calls accept `abi` in addition to `type`.

## 1.1.5

* Added endpoint for retrieving all events for a contract at `GET /contracts/:contractId/events`.
* Added endpoints for getting block information `GET /contracts/network/:network/block/latest`
  and `GET /contracts/network/:network/block/:number`.

## 1.1.4

* Added batch contract call endpoint at `POST /contracts/call`.

## 1.1.3

* Added API endpoints for getting the default account, as well as ETH balances.

## 1.1.2

* Added the option to `PUT /contracts` to provide `type` instead of `abi`.

## 1.1.1

* Added `/tokens/:network/:address` endpoint for general token information.

## 1.1.0

* Updated to OpenAPI 3. No actual API changes.

## 1.0.8

* Contract transactions can now depend on other transactions.

## 1.0.7

* All contracts now return their ABI when retrieving them.
* New endpoints for directly calling contracts without needing to add them first.

## 1.0.6

* Transactions now output additional data, including contract ID, method, parameters and events.
* New endpoint `GET /transactions` for retrieving a list of past transactions.

## 1.0.5

* ERC-20 Security contract type.

## 1.0.4

* Postman quick start.

## 1.0.3

* Added curl quickstart.
* Added the Spout environment.
* Added `spout` Ethereum network.

## 1.0.2

* Added `auth` and `ownerless` flags to creating new users.
* Added auth token to POST user response.
* Added `account` flag to creating new users.
* Added account to POST user response.

## 1.0.1

* Changed `/contracts/{contractId}/send/{method}` to accept any type in the
`arg` parameter to allow for array arguments to methods.
* Fixed some links in the descriptions.
