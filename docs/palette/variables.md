---
title: Variables
autonav:
    group: In-Depth
    groupOrder: 3
    order: 1
---

# About Palette Variables

This is a technical description of how variables work on Palettes, and may help provide a better understanding of
where each variable can be used.

## Contexts

All Blocks in the Palette can use or add data in the hierarchy, and this data is what's called **variables**. Variables in the hierarchy are
managed through **contexts**. A context is a collection of variables that is made available to all descendants of the
block that created that context.

Every block that adds variables to the hierarchy can either create a new context, or add to an existing context. If creating
a new context, all descendant blocks will consider the new context their ancestor.

If the block uses an existing context, the closest ancestral block is found with its own created context, and that context is used.
That way child blocks can contribute variables to the hierarchy higher up, for example with form fields.

A context can either be anonymous, or a named context. Named contexts can be referenced by name in descendants, which
allows for overriding which context a block interacts with.

Blocks using variables will find the closest context that has the needed variable, or a context name can be provided to use
a specific ancestral context.
