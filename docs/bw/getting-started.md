---
title: Getting Started
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

### Command help

To see more help for a specific command you can use the `-h` flag. For example:

```bash
./bw send -h
```

will show the help for the `send` command.

### Show version

To see bw's version, use:

```bash
./bw --version
```

### Running a command

To run a command, simply give the name of the command as the first argument. For
example, to use the [private-key](private-key) command run:

```bash
./bw private-key
```
