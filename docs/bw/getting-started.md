---
title: Getting Started
sidebarDepth: 2
---

# Getting Started

bw is a command-line application, so you'll first need the files to run it. We have
not released the tool openly at this point.

You can sign up for SSH access to a bw server that has everything setup for you:

[bw Server](https://bw.blockwell.ai)

## Basic Usage

To see a list of global options and commands, you can run:

```bash
./bw
```

### Running a command

To run a command, simply give the name of the command as the first argument. For
example, to use the [private-key](./commands.md#private-key) command run:

```bash
./bw private-key
```

## Walkthrough

This walkthrough will go over a few basic commands to get you started with bw.
You should start by opening your terminal and connecting to the bw Server.

There is also a [video walkthrough](./demo.md) available.

### Reading token information

Let's start with something simple: reading some token information from the
blockchain using the [`contract-call`](./commands.md#contract-call) command.

Run the following command:

```bash
./bw contract-call name
```

The output will look something like this:

```
info: Network: Rinkeby
Food Coin
```

The first line begins with `info:`, which means it's just an informative
log message. It's telling you the network bw is currently configured to use.

The second line is the actual output of the command, which in this case
was `Food Coin`. That's the name of the token.

With that, we've read the name of the token from the blockchain!

::: tip
The exact output you see may be slightly different, since it depends on
bw's current configuration.

If you're seeing `Network: Mainnet` instead of Rinkeby and want to follow
this walkthrough, you should edit the `config.yaml` file in the same
directory and change the second line to read:

```yaml
network: rinkeby
```

instead of `mainnet`.
:::

We can read other information as well. All ERC20 tokens should have a
`symbol` as well. We can read that the same way:

```bash
./bw contract-call symbol
```

The output is similar to before:

```
info: Network: Rinkeby
FC
```

This time, it's giving us `FC`, which is the symbol of the Food Coin token.

### Reading token balances

We've read basic info on the token using [`contract-call`](./commands.md#contract-call).
Those are simple and easy, because there's only one "name" in a contract.

We'd also like to read token balances for wallets, which can be done using
the `balanceOf` function in ERC20 tokens. However,  we need to tell the
command which wallet's balance we want to know.

This can be provided by giving additional arguments to 
[`contract-call`](./commands.md#contract-call). In this case, I want to know
the balance of the wallet `0x96cfe56665be4e5819416b352c4c86c525a7cf7d`. I can
do that by simply adding the address as an additional argument:

```bash
./bw contract-call balanceOf 0x96cfe56665be4e5819416b352c4c86c525a7cf7d
```

Here's the output from this command:

```
info: Network: Rinkeby
7000000000000000000
```

Okay, we have the balance, but there's an awful lot of zeroes. That's because
Ethereum doesn't support decimals, so instead it's just a really big number.
To get the value with decimals, you divide it:

$$
\frac{7000000000000000000}{1000000000000000000} = 7
$$

bw has a utility to do this for you as well:

```bash
./bw from-wei 7000000000000000000
```

Output:

```
7
```

Note that this time it didn't show the `info: Network` line. That's because
the `from-wei` conversion doesn't require connecting to Ethereum.

::: warning
The above assumes the token you're working with has 18 decimals. If it has
a different number of decimals, you can specify that with the [`from-wei`](./commands.md#from-wei)
command. For example, with 6 decimals:

```bash
./bw from-wei 7000000 -d 6
```
:::

Because reading token balances is such a common need, bw has a simpler command
that does the decimal conversion for you:

```bash
./bw balance 0x96cfe56665be4e5819416b352c4c86c525a7cf7d
```

Here's the output:

```
info: Network: Rinkeby
7
```

### Changing contracts

So far we've been using the default contract already configured in bw, but
chances are you'll want to look at a different contract.

You can set the default contract bw uses by editing the `config.yaml` file
and changing the value of `contract_address`:

```yaml
# Address of the contract. This must be in quotes, otherwise it's interpreted 
# as a hex number
contract_address: "0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae"
```

`0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae` is the address for Food Coin.
You can change it to any contract address you want.

Instead of editing `config.yaml`, you can also use a different contract
address with the [`--address`](./global-options.md#address-address) option.
For example:

```bash
./bw --address 0xE595564689D6E0206b095915C219a8c7a130cF7B contract-call name
```

Output:

```
info: Network: Rinkeby
Rinkeby Roar
```

We're reading the name of the contract like in the beginning of this walkthrough,
but this time the contract address is for Blockwell Roar on Rinkeby.

### Changing networks

Sooner or later you'll probably also want to look at different Ethereum networks.
So far we've been looking at Rinkeby, let's switch over to the Main Ethereum
Network. 

Like with the contract address, you can change the network by either editing
`config.yaml`:

```yaml
# Name of the network to connect to. You can configure the specific nodes to use below.
network: rinkeby
```

If you change `rinkeby` to `mainnet` and save the file, bw will use the Main
Network.

Alternatively, you can use the [`-n`](./global-options.md#network-name) option
and specify a network. Try running this command:

```bash
./bw --address 0xB8c77482e45F1F44dE1745F52C74426C631bDD52 -n mainnet \
    contract-call name
```

You should see the following output:

```bash
info: Network: Mainnet
BNB
```

With that command we asked it to use the Main Network with `-n mainnet`, and
gave it the Binance token's contract address with
`--address 0xB8c77482e45F1F44dE1745F52C74426C631bDD52`. "BNB" is what the
Binance token has for a name.

::: tip
You may have noticed that the command above is split into two lines, and has a
`\` at the end of it.

Using `\` is a way in terminal to split your command on to multiple lines so
it's easier to read. For example, these two commands are identical:

```bash
./bw contract-call name
```

```bash
./bw \
    contract-call \
    name
```

Every time you want to use multiple lines for easier reading, just put in
`\` before you hit enter.
:::

### Get all balances for a token

As the last part of this walkthrough, let's get a list of all wallets for
a token and their balances. Run the following command:

```bash
./eth-tool -n rinkeby token-balances 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae
```

This will get all balances for Food Coin on Rinkeby. The output will start
like this:

```
info: Network: Rinkeby
address,balance
0x8f5dfA044fB51a4F392689F0f67AB19FBB869BE4,99990298.9
0xfD8894e1E78Bbe44fF49Fd5c5996177bB6EC6305,87
0xdb6B13013A0Ba6e724c3f81537670959F97BC9C1,154.00048
0xCF1f8E012E55044472FCb98367C3cF8574AdE8Dc,100
...lots more
```

That output may look confusing at first, but it's actually just CSV data
that you can open as a spreadsheet in Excel or Google Sheets.

We'll want it in a file rather than the terminal though. Fortunately there's
a handy terminal trick for that:

```bash
./eth-tool -n rinkeby --plain \ 
    token-balances 0xe8340FdfE79851e9E117b3033E147a654dbDb0Ae > foodcoin.csv
```

There are two changes from the previous command. First, we added `--plain`,
which tells bw to not output any `info`, because that would interfere with
the spreadsheet.

Secondly, the end has ` > foodcoin.csv`. This is a standard method to tell
your terminal that instead of showing the output, you want it to go into
a file called `foodcoin.csv`.

After running that command, you should see the file in your current directory.

::: tip
You'll probably want the csv file on your computer to load it into a
spreadsheet, so here's how you can get it from the bw Server.

You can use a tool called `scp` that comes installed on most computers.
Open another terminal on your own computer without connecting to the bw
Server, and run the following command. **Note!** change "username" to
what your actual username for bw.blockwell.ai is.

```bash
scp username@bw.blockwell.ai:~/bw/foodcoin.csv .
```

That may be a lot to unpack, but we're telling the tool we want to copy
a file from the server bw.blockwell.ai. The file's location is
`~/bw/foodcoin.csv`. The last `.` just means we want to copy it to
our current directory.

:::
