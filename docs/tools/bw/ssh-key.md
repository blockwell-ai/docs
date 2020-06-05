---
title: SSH Key
autonav:
    order: 3
---

# SSH Key For Server Access

## Why you need an SSH key

When connecting to a server you need to login to the system so that the
server is protected from unauthorized access. Most commonly you do this
by entering a username and a password.

However, passwords have some problems:

- If they're long and complex, they're hard to remember.
- If they're short, they're easy for an attacker to compromise.
- A compromised server can see your password, which most people reuse in
  multiple places.
  
A more secure way to login to a server is to use what's commonly called
[SSH keys](https://wiki.archlinux.org/index.php/SSH_keys). It relies on
[public-key cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography)
to securely authenticate to the server.

To use SSH keys you create two related keys, also called a **key pair**:

- A **private key** that only you know and you never share with anyone.
- A **public key** you can freely share that you give to the server.

The server can then use the public key to issue a challenge, and only
someone with the matching private key can solve the challenge. This way
you prove to the server you are who you say you are.

::: tip
Ethereum and Bitcoin also use public-key cryptography in a similar way,
and in fact your Ethereum wallet address is just the last 20 bytes of your
public key.
:::

## How to create a key pair

First, open a Terminal on your computer, and run the following command by 
copy-pasting it and pressing Enter.

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/bwqr_rsa -C qr@bw \
    && chmod 600 ~/.ssh/bwqr_rsa \
    && ssh-add ~/.ssh/bwqr_rsa
```

It will then ask you for a passphrase. You can leave it empty, or type 
a passphrase for added security.

Now run the following command to display your SSH public key:

```bash
cat ~/.ssh/bwqr_rsa.pub
```

The output will look like this:

```
ssh-rsa AAAABreallylongtext== qr@bw
```

This output is what you need to provide Blockwell for server access. This
is your public key.

::: danger
Never share your private key that's in the file `bwqr_rsa`. This file begins
with something like this:

```
-----BEGIN RSA PRIVATE KEY-----
```

If someone gets hold of this private key it's as bad as someone learning
your password.
:::
