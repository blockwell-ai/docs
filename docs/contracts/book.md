---
title: Book
sidebarDepth: 2
autonav:
  group: Other Contracts
---

# Book

<Deployer code="rmqe1l">Book</Deployer>

<Dapp url="https://app.blockwell.ai/book">Book</Dapp>

## Introduction

Book is a way to store information on the blockchain in an organized fashion. It has
many uses:

- Keep a catalog on the blockchain.
- Manage organizational directives and use voting to effect changes to those directives.
- Store content on the blockchain and have your users vote for modifications and new content.

## Organization

Each book consists of a list of Folders with names. Each folder then has a list of
Files with content.

You can think of it like a filing cabinet, and one Book is essentially a drawer in a filing
cabinet. It is similar to how files are organized on computers as well.

For example, here's what the Book for a charity working on improving water quality might
look like:

```
 📁 Phone fundraising
  ├  🗎 Phone call opening speech
  └  🗎 Suggested donations
 📁 Initiatives
  ├  🗎 Clean Drinking Water
  └  🗎 Irrigation
```

Each file can have any kind of content, as long as the size of the file doesn't exceed
about 14,000 characters. It could be plain text, structured data (such as JSON),
binary data (for example a small image), and so on.

## Making Changes

Because all data on the blockchain is public, anyone can always read the contents of the
files (unless it's [encrypted](#encryption)). Making changes on the other hand can be
restricted in several ways.

### A. Fully Open Mode

You can have the Book be fully open to making changes, which means anyone can create
Folders and edit any Files. **This is the default mode**.

### B. Creator Editing Mode

This is like the Fully Open Mode, but after Files have been created, only the creator of
the File can change it.

There is one exception: special users who are assigned as Editors can still make changes
to any Files.

### C. Restricted Editing Mode

In this mode, normal users are not allowed to create Files or make changes. Instead, in
order to make changes, a user must either be given the Editor role or hold a specific
ERC-20 or ERC-721 token.

When using a token, you can make all Folders require the same token, or different
Folders can require different tokens. Some Folders could also still be open to anyone
to make changes.

For example, in our charity example, all Files under the "Phone fundraising" Folder
could require you to have the "Fundraising Team Token" before you can make changes.

### D. Voting Only Mode

With this mode no one, not even Admins or Editors, can make changes directly to Files. 
Instead, any changes must go through a process of voting. See [Voting](#voting) below 
for details on how this works.

## Voting

Instead of making changes to Files directly, Book allows for Voting for changes to
Files. Each File can have any number of Suggestions for its new content, and then
those Suggestions can be voted on. The winning Suggestion will then replace the
File and voting is closed.

Using the charity example from above, here's one possible scenario:

- The charity's fundraising team wants to come up with a better opening speech for
  their phone fundraising efforts.
- Anyone who has ever donated funds to the charity is allowed to create Suggestions
  for new or altered speeches, as well as anyone part of the organization.
- Donors can then vote on the Suggestions.
- After some time has passed, the Suggestion with the most votes replaces the current
  File, and the callers see the new opening speech.
  
After voting is complete, at any time a new round of voting can be started to replace
the File again the same way. All vote counts and Suggestions are cleared between
rounds.

Different parts of the process can be configured as follows.

### Who Can Create Suggestions

By default, anyone can create Suggestions for any File. There are two optional
restrictions you can configure:

- You can require that anyone creating a Suggestion must be a token holder of a specific
  token. For example, anyone who donated to our example charity would have a token to
  signify that they are a donor.
- You can limit Suggestion creation to Writers. That means only users who you have
  specifically given the Writer role to can create them.

::: tip
If you need more advanced controls, you can use a special ERC-20 token with its own rules
to determine who gets to create Suggestions.
:::

### Who Can Cast Votes

There are two options for who can cast votes. You can either keep voting open, allowing
anyone to vote, or you can use a token like with creating Suggestions.

### What Is a Winning Suggestion

There are three ways you can configure which Suggestion will be selected:

- *Editor choice*. Users you have given the Editor role will simply choose the winner.
  **This is the default**.
- *Voting winner*. The Suggestion with the highest number of votes is selected as the
  new content. In case of ties, an Editor can choose between the tied Suggestions.
- *First past the post*. The first Suggestion to reach a given number of votes is
  selected as the winner.
  
With *Editor choice* and *Voting winner* the File won't be changed until an Editor
accepts the results. These are ideal for situations where the quantity of votes
may vary, and you want to retain some amount of control.

With *First past the post*, the File will be changed immediately and automatically
when the required number of votes is reached. This works well when you know how many 
people are voting, such as with a board or a committee.

::: tip
With *First past the post* you can also set the number of votes required to be 1, 
and then it can act as content review that needs to be approved by someone else.
:::

## Technical Details

### Folders

Each folder is identified by a unique name, and contains a list of files as well as the
following additional data:

- `encoding` holds information on the formatting of the content of the files. For example,
  this could be set to "json", in which case you know the files have JSON data.
- `metadata` can hold any additional information on the contents of the Folder that you
  want to store that applies to all Files inside it.
- `accessToken` can specify an ERC-20 or ERC-721 token that the user must have in order
  to have access to the Folder's Files. Note that access in this case can mean different
  things depending on the configuration of the Book, for details see 
  [Making Changes](#making-changes).

Both `encoding` and `accessToken` have default values in the Book itself that get applied
to every new Folder. Only Admins can change the default values. Editors can modify them
on existing Folders.

::: tip
While Folders can't technically have other Folders inside them, you can still have
a hierarchy of Folders by simply including it in the names of the Folders. For example,
if the charity example from above has a Folder called `Initiatives/Africa`, that turns
into a hierarchy:

```
 📁 Initiatives
  ├ 🗎 Clean Drinking Water
  ├ 🗎 Irrigation
  └ 📁 Africa
     └ 🗎 Rain Water Purification
```
:::

### Files

Each File is stored on the blockchain as a `string`, which means it can naturally hold 
anything that can be turned into plain text.

In addition, the blockchain itself does not store a `string` and an array of bytes any
differently, so as long as you treat it as such, the value can also be a byte array.
This is where `encoding` and `metadata` are very useful.

There is not a specific limit to the size of a File, but in practice there is a limit
to how much data you can assign at one time. This is due to the _block gas limit_,
which is an upper limit on how much a transaction can do. This means the public
blockchains can currently hold up to about 14,000 bytes. 

::: detail
The calculation to get the maximum size is fairly simple:

- At time of writing, the gas limit for the Ethereum Main Network is **10 million**.
- The gas cost of data is paid in 32 byte chunks, with each chunk costing **20,000** gas.
- You can reasonably expect to use up about **90%** of the block gas limit and still be
  able to get the transaction to go through.
  
$${10,000,000 \times 90\%\over 20,000} \times 32 = 14,400$$
:::

For text that uses ASCII characters (the normal English alphabet, numbers, punctuation),
each character takes up exactly one byte, which means 14,000 characters.

International text and other special characters typically takes 2 bytes per character,
so the size is reduced to about 7,000 characters. To learn more about how that works,
read up on [UTF-8](https://en.wikipedia.org/wiki/UTF-8).

### Using Tokens For Access Control

ERC-20 and ERC-721 tokens can be used to restrict some aspects of a Folder's Files.
Tokens can be:

- Required for making changes to Files.
- Required for creating Suggestions.
- Required for casting votes.

In these cases, when a Folder is configured to use a token, the user's balance of that
token must be above 0. More specifically, the `balanceOf` function is called with
the user's wallet address.

In addition, a token can be:

- Used as the number of votes a user casts when they vote. This way you could give
  different users a different amount of say in voting.

In this case, the result of the `balanceOf` function for the user's wallet address
is used as the number of votes they cast.

With an ERC-721, `balanceOf` will give the number of different tokens the user holds
instead of a fungible balance, but it will work the same.

::: detail
Strictly speaking the contract used for access control doesn't even need to be a token.
It just needs to respond to `balanceOf(address)` with a number that makes sense.
:::

### Encryption

While the contents of Files are publicly on the blockchain, you can still make them
private by encrypting the contents. For this purpose, the Folder's `encoding` and
`metadata` fields can be used to track the type of encryption used. You could directly
store the type of algorithm being used, or you can just store some kind of identifier
that will indicate to you which algorithm was used without revealing it publicly.

Encryption of the contents is an area Blockwell is actively working on, we will be
adding more information on it in the near future.
