---
title: API Miner Quickstart
sidebarDepth: 2
---

# API Miner Quickstart

There are two options for quickstart:

1. Using the `curl` command line tool, which is commonly already installed on
many systems.
2. Using the Postman HTTP client.

In this quickstart you'll be interacting with 

## Access Token

You'll need an API Miner access token to go through the quickstarts. You can get a free
Access Token if you sign up for Blockwell-QR:

[Get Access Token](https://qr.blockwell.ai/app/wallet/apiminer)

## Using cURL

### cURL Prerequisites

`curl` is used in a terminal, so some familiarity with running a command line
terminal is needed. All commands in this curl section are intended to be
typed into a terminal. Most of them will also need some values inserted,
and those are marked with `<value>`. For example, if you see:

```
    "<address>"
```

You should replace it with the proper address like this:

```
    "0x4a4f61b39873b96429a261ba04fd0d8c5368d2c7"
```


You'll need `curl` itself installed. You can test to see if it's already
installed by running:

```
curl --version
```

If it's not installed, install it using the appropriate installation method
for your system:

- **Linux**
    - **Debian** and derivatives: `sudo apt-get install curl`
    - **Arch** and derivatives: `pacman -S curl`
    - **Fedora**: `yum install curl`
- **Mac OS X**
    - If you don't have it, first install [Homebrew](https://brew.sh/)
    - Then run `brew install curl`
- **Windows**
    - **NOTE!** The curl commands in this quickstart won't work in Windows' cmd or PowerShell terminals without modification. We recommend using Postman, or some other REST client.
    - Download the curl binary [here](https://curl.haxx.se/dlwiz/?type=bin&os=Win32&flav=-)
    and add it to your PATH.

#### Using `jq` (optional)

If your system has `jq` installed (or you can always install it 
[from here](https://stedolan.github.io/jq/download/)), you can use it to make the JSON
output easier to read. Simply add ` | jq` at the end of every command.

### 1. List accounts

You should've already received the address of your first Ethereum account on
API Miner, but as the first step we'll go ahead and list all of our accounts.

First, edit the following `curl` command:

- replace `<token>` with your access token.

```bash
curl -X GET \
    https://test.apiminer.com/accounts \
    -H 'Authorization: Bearer <token>'
```

As mentioned earlier, copy and paste the curl command to your terminal. Make
sure you get the whole command, as it's split on multiple lines for easier
reading.

The response will look like this, except it will be unformatted if not using [jq](#using-jq-optional):

```json
{
    "data": [
        {
            "id": "9a5d68bd-84d7-4ec0-8b11-642de45b1d5d",
            "address": "0x897a705d4ae51e66f9e64a0ff446e65b55c47385",
            "owner": "df9dd7fc-9007-49f2-b92a-e7952d4d9ca3",
            "defaultAccount": true
        }
    ]
}
```

The `id` is the globally unique identifier of this account, and the `address`
is the Ethereum address of the account. You'll need the `address` for some of
the quickstart steps.

### 2. Getting Pump tokens

Next, call the `mint` function on the Pump token smart contract to get
yourself some tokens.

Use the following with:

- `<token>` replaced with your access token.
- `<address>` replaced with your account address.

```bash
curl -X POST \
    https://test.apiminer.com/contracts/44740750-522f-46ae-a63c-fcd1a8f5e308/send/mint \
    -H 'Authorization: Bearer <token>' \
    -H 'Content-Type: application/json' \
    -d '{
        "arg": [
        "<address>",
        "100000000000000000000"
        ]
    }'
```

The response will look like this:

```json
{
    "data": {
        "id": "491a20cd-43a6-42fc-a0e9-b8438ac7308b",
        "type": "contract-method",
        "contractId": "44740750-522f-46ae-a63c-fcd1a8f5e308",
        "from": "0x6b377a6a5505896fdec4e72fb780b819e46169bb",
        "method": "mint",
        "parameters": [
            "0x6b377a6a5505896fdec4e72fb780b819e46169bb",
            "100000000000000000000"
        ],
        "status": "new",
        "created": "2019-10-10T23:42:34.312Z",
        "network": "libra"
    }
}
```

Since transactions on the blockchain take some time, the API doesn't wait for
it to finish, it just gives you the info you submitted and an ID you can use
to refer to it later.

### 3. Getting the status of a transaction

To see what happened to the transaction from the previous step, use the following
with:

- `<id>` replaced with the transaction ID you received in the previous step.
- `<token>` replaced with your access token.

```bash
curl -X GET \
    https://test.apiminer.com/transactions/<id> \
    -H 'Authorization: Bearer <token>'
```

The transfer should be completed within 15 seconds, after which you'll see
the following response:

```json
{
    "data": {
        "id": "491a20cd-43a6-42fc-a0e9-b8438ac7308b",
        "type": "contract-method",
        "contractId": "44740750-522f-46ae-a63c-fcd1a8f5e308",
        "from": "0x6b377a6a5505896fdec4e72fb780b819e46169bb",
        "method": "mint",
        "parameters": [
            "0x6b377a6a5505896fdec4e72fb780b819e46169bb",
            "100000000000000000000"
        ],
        "status": "completed",
        "created": "2019-10-10T23:42:34.312Z",
        "submitted": "2019-10-10T23:42:37.662Z",
        "ended": "2019-10-10T23:42:46.712Z",
        "transactionHash": "0x51088ae5bcd3ca0674f7cdb9d86d6898f5a0c82dd8699de7b446545381d0119e",
        "blockNumber": 4050510,
        "events": [
            "..."
        ],
        "network": "libra"
    }
}
```

The status showing `completed` means the call was successful.

### 4. Getting your token balance

To double check that you did actually get the Pump tokens, use:

- `<token>` replaced with your access token.

```bash
curl -X GET \
    https://test.apiminer.com/tokens/44740750-522f-46ae-a63c-fcd1a8f5e308/balances/default \
    -H 'Authorization: Bearer <token>'
```

This will get the token balance for token ID `44740750-522f-46ae-a63c-fcd1a8f5e308` -
which is the Pump token - for your default account.

The response is as follows:

```json
{"data":"100000000000000000000"}
```

### 5. Creating an Ethereum account

To create a second Ethereum account, use:

- `<token>` replaced with your access token.

```bash
curl -X POST \
    https://test.apiminer.com/accounts \
    -H 'Authorization: Bearer <token>'
```

The response is as follows:

```json
{
    "data": {
        "id": "8afe086b-2cb8-4feb-bfbe-064a996e137a",
        "address": "0x632777aeb73f955a660817d5f1ab1a36365485aa",
        "owner": "36731315-1ec0-4ad2-99a9-c7c3e22dce9f",
        "defaultAccount": false
    }
}
```

Note that this new account is not your default account, so it will only be used
if you specify it in the API calls. We'll look at how to do that below.

### 6. Transferring tokens

To transfer 2 PMP tokens from your default account to the newly created one, use:

- `<token>` replaced with your access token.
- `<address>` replaced with the address of your second account you just created.

```bash
curl -X POST \
    https://test.apiminer.com/tokens/44740750-522f-46ae-a63c-fcd1a8f5e308/transfers \
    -H 'Authorization: Bearer <token>' \
    -H 'Content-Type: application/json' \
    -d '{
        "to": "<address>",
        "value": "2000000000000000000"
    }'
```

The response is as follows:

```json
{
    "data": {
        "id": "f48913b3-1559-4c5b-8e03-bfe95bf6988b",
        "type": "contract-method",
        "contractId": "44740750-522f-46ae-a63c-fcd1a8f5e308",
        "from": "0x6b377a6a5505896fdec4e72fb780b819e46169bb",
        "method": "transfer",
        "parameters": [
            "0x24c8aea9c45953e6d54715dbe4964e9757f5a67a",
            "2000000000000000000"
        ],
        "status": "new",
        "created": "2019-10-10T23:52:23.728Z",
        "network": "libra"
    }
}
```

As before, the response refers to a transaction, rather than the result of the
transfer. Refer to step 3 to check on the status of the transaction.

### 7. Get the token balance of another account

In step 4 we retrieved the balance of your default account, but you can also
query the balance of any other account by their address.

To check the balance of your second account, use:

- `<token>` replaced with your access token.
- `<address>` replaced with the address of your second account.

```bash
curl -X GET \
    https://test.apiminer.com/tokens/44740750-522f-46ae-a63c-fcd1a8f5e308/balances/<address> \
    -H 'Authorization: Bearer <token>'
```

The response is as follows:

```json
{
    "data": "2000000000000000000"
}
```

### 8. Return half of the tokens

To demonstrate sending tokens from a non-default account, we'll send half of the
tokens back:

- `<token>` replaced with your access token.
- `<new-address>` replaced with the address of your second account.
- `<default-address>` replaced with the address of your default account.

```bash
curl -X POST \
    https://test.apiminer.com/tokens/44740750-522f-46ae-a63c-fcd1a8f5e308/transfers \
    -H 'Authorization: Bearer <token>' \
    -H 'Content-Type: application/json' \
    -d '{
        "from": "<new-address>",
        "to": "<default-address>",
        "value": "1000000000000000000"
    }'
```

The response is as follows:

```json
{
    "data": {
        "id": "fcd358f9-efff-46ed-92c9-9b13c2540f48",
        "type": "contract-method",
        "contractId": "44740750-522f-46ae-a63c-fcd1a8f5e308",
        "from": "0x24c8aea9c45953e6d54715dbe4964e9757f5a67a",
        "method": "transfer",
        "parameters": [
            "0x6b377a6a5505896fdec4e72fb780b819e46169bb",
            "1000000000000000000"
        ],
        "status": "new",
        "created": "2019-10-10T23:53:50.487Z",
        "network": "libra"
    }
}
```

As before, refer to step 3 to get the status of the transaction.

## Using Postman

### Postman Prerequisites

You'll need [Postman](https://www.getpostman.com/) installed, follow their
documentation for installation.

Download the Postman collection for API Miner:

[API Miner collection](https://apidocs.apiminer.com/apiminer-collection.json)

After installing, import the collection:

![import](./img/import.png)

Under Import File click Choose Files and find the `apiminer-collection.json` 
file you downloaded, or drag and drop it to where it says "Drop files here".

Next, create a new Postman environment by clicking the gear icon:

![gear](./img/gear.png)

In the top-right corner. Click the Add button, and configure the new environment
as follows:

![environment](./img/environment.png)

- token: Your access token
- contractId: `44740750-522f-46ae-a63c-fcd1a8f5e308`

For the name you can enter anything you want, it's for your own reference.

You can now use the API Miner collection to make calls to the API.

::: tip
If you want to use a different API Miner environment than the default
`test.apiminer.com`, you can add another variable called `host` with
the hostname of the environment to use.
:::

### 1. List accounts

You should've already received the address of your first Ethereum account on
API Miner, but as the first step we'll go ahead and list all of our accounts.

![list accounts](./img/list-accounts.png)

Find the "GET List accounts" endpoint, and click Send 
<img class="inline" src="./img/send.png" height="35">.

You'll see a response like this:

```json
{
    "data": [
        {
            "id": "3d48d487-de83-49ab-b5de-4bf8fcab3dbc",
            "address": "0x8769a34484b038e96edb82a3f72e47a13d543459",
            "owner": "89f6b915-71c8-4980-8650-c8d29d1791d0",
            "defaultAccount": true
        }
    ]
}
```

The `id` is the globally unique identifier of this account, and the `address`
is the Ethereum address of the account. You'll need the `address` for some of
the quickstart steps.

::: detail
The `owner` value shows the ID of the user that owns the account, so it will
show your user ID. `defaultAccount` indicates if the account will be the one
used by default when submitting transactions without specifying an account.
:::

### 2. Getting Pump tokens

![contract send picture](./img/contract-send.png)

Next, use the "POST Contract send call" endpoint to call the token contract with
the token minting function.

Under *Params* find the `method` Path Variable, and give it the value `mint`.

![method mint picture](./img/method-mint.png)

Use the following Body with:

- `<address>` replaced with your account address from the first step.

```json
{
    "arg": [
        "<address>",
        "100000000000000000000"
    ]
}
```

Then click Send 
<img class="inline" src="./img/send.png" height="35">.

The response will look like this:

```json
{
    "data": {
        "id": "aac997c4-1fe0-4d24-9d3a-430968dfa238",
        "type": "contract-method",
        "contractId": "44740750-522f-46ae-a63c-fcd1a8f5e308",
        "from": "0x8769a34484b038e96edb82a3f72e47a13d543459",
        "method": "mint",
        "parameters": [
            "0x8769a34484b038e96edb82a3f72e47a13d543459",
            "1000000000000000000"
        ],
        "status": "new",
        "created": "2019-10-22T20:10:21.120Z",
        "network": "libra"
    }
}
```

Since transactions on the blockchain take some time, the API doesn't wait for
it to finish, it just gives you an ID that you can use to refer to it later.

::: detail
In addition to the `id`, there are several fields as part of the response.
You can read more about each field in the 
[API Spec](https://apidocs.apiminer.com/#operation/ContractSend), just scroll
down to the Responses and click `data` to show the fields.
:::

### 3. Getting the status of a transaction

![get a transaction](./img/get-transaction.png)

To see what happened to the transaction from the previous step, use the
"POST Get a transaction" endpoint. Under Params, Path Variables, set the value
of `id` to the `id` from the mint response.

The transfer should be completed within 15 seconds, after which you'll see
the following response:

```json
{
    "data": {
        "id": "aac997c4-1fe0-4d24-9d3a-430968dfa238",
        "type": "contract-method",
        "contractId": "44740750-522f-46ae-a63c-fcd1a8f5e308",
        "from": "0x8769a34484b038e96edb82a3f72e47a13d543459",
        "method": "mint",
        "parameters": [
            "0x8769a34484b038e96edb82a3f72e47a13d543459",
            "1000000000000000000"
        ],
        "status": "completed",
        "created": "2019-10-22T20:10:21.120Z",
        "submitted": "2019-10-22T20:10:26.157Z",
        "ended": "2019-10-22T20:10:30.254Z",
        "transactionHash": "0x5501d9565b75a5918ce6cbcf25eedf0b1f1ca71d14cb09acc07c331bae031666",
        "blockNumber": 4178518,
        "events": [
            {
                "event": "Mint",
                "address": "0x4CfC7bF1e8eB43d27DE0a4e648D9Cf3b6198D0EC",
                "returnValues": {
                    "account": "0x8769a34484b038e96edb82a3f72e47a13d543459",
                    "value": "1000000000000000000"
                }
            },
            {
                "event": "Transfer",
                "address": "0x4CfC7bF1e8eB43d27DE0a4e648D9Cf3b6198D0EC",
                "returnValues": {
                    "from": "0x0000000000000000000000000000000000000000",
                    "to": "0x8769a34484b038e96edb82a3f72e47a13d543459",
                    "value": "1000000000000000000"
                }
            }
        ],
        "network": "libra"
    }
}
```

The status showing `completed` means the call was successful.

### 4. Getting your token balance

To double check that you did actually get the Pump tokens, use the "GET Default
account balance" endpoint.

![default account balance](./img/default-account-balance.png)

No parameter changes are needed, just hit Send 
<img class="inline" src="./img/send.png" height="35">.

The response is as follows:

```json
{"data":"100000000000000000000"}
```

::: tip
Ethereum doesn't support decimals, so instead it's just a really big number.
To get the value with decimals, you divide it:

$${100000000000000000000 \over 1000000000000000000} = 100$$

The divisor is `1e18`, or in other words 1 followed by eighteen 0's. The 18
is arbitrary, but it's what ETH and most tokens use. If you're dealing with
a token using a different number of decimals, just use that number instead
of 18. The raw value is often also called "Wei".

That means we just minted 100 tokens to ourselves.
:::

### 5. Creating an Ethereum account

![create account](./img/create-account.png)

To create a second Ethereum account, use the "POST Create account" endpoint.

No parameter changes are needed, just hit Send
<img class="inline" src="./img/send.png" height="35"> , and you'll see a 
response like this:

```json
{
    "data": {
        "id": "8afe086b-2cb8-4feb-bfbe-064a996e137a",
        "address": "0x632777aeb73f955a660817d5f1ab1a36365485aa",
        "owner": "36731315-1ec0-4ad2-99a9-c7c3e22dce9f",
        "defaultAccount": false
    }
}
```

Note that this new account is not your default account, so it will only be used
if you specify it in the API calls. We'll look at how to do that below.

### 6. Transferring tokens

To transfer 2 PMP tokens from your default account to the newly created one, use
the "POST Transfer tokens" endpoint.

![transfer tokens](./img/transfer-tokens.png)

In Body, change the `to` address to match the second account's address you
created in the previous step:

![transfer body](./img/transfer-body.png)

Then change `value` to `2000000000000000000`:

![change value](./img/change-value.png)

Then hit Send. The response is as follows:

```json
{
    "data": {
        "id": "024c9ea7-a8a8-42ca-8e4b-c233f6f4f4e1",
        "type": "contract-method",
        "contractId": "44740750-522f-46ae-a63c-fcd1a8f5e308",
        "from": "0x8769a34484b038e96edb82a3f72e47a13d543459",
        "method": "transfer",
        "parameters": [
            "0x632777aeb73f955a660817d5f1ab1a36365485aa",
            "2000000000000000000"
        ],
        "status": "new",
        "created": "2019-10-22T21:07:27.916Z",
        "network": "libra"
    }
}
```

As before, the response refers to a transaction, rather than the result of the
transfer. Refer to [Step 3](#_3-getting-the-status-of-a-transaction-2) to check 
on the status of the transaction.

### 7. Get the token balance of another account

In Step 5 we retrieved the balance of your default account, but you can also
query the balance of any other account by their address.

To check the balance of your second account, use the "GET Token balance"
endpoint.

![token balance](./img/token-balance.png)

In Params, set the `address` value to match your second account's address.

Hit Send. The response is as follows:

```json
{
    "data": "2000000000000000000"
}
```

### 8. Return half of the tokens

To demonstrate sending tokens from a non-default account, we'll send half of the
tokens back, again using "POST Transfer tokens".

![transfer tokens](./img/transfer-tokens.png)

This time, replace the Body with the following:

- `<new-address>` replaced with the address of your second account.
- `<default-address>` replaced with the address of your default account.

```json
{
    "from": "<new-address>",
    "to": "<default-address>",
    "value": "1000000000000000000"
}
```

Like this:

![transfer from body](./img/transfer-from-body.png)

Hit Send. The response is as follows:

```json
{
    "data": {
        "id": "e3981e4b-d31e-47f4-862e-ccdb3b39ccce",
        "status": "new",
        "created": "2018-08-15T19:32:33.153Z"
    }
}
```

As before, refer to [Step 3](#_3-getting-the-status-of-a-transaction-2) 
to get the status of the transaction.
