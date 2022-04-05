---
title: bApp MetaMask Embed 
autonav:
  groupOrder: 3 
  group: bApps
---

# bApp MetaMask Embed

## Introduction

[bApps](./bapps.md) can be embedded as a simple MetaMask-compatible button on any website. With a **simple copy and
paste**, you can **enable your users to use the blockchain** directly on your website without any significant time
investment.

## Usage

At the bottom of any bApp page ([for example](https://app.blockwell.ai/izfd2j))
the following button is shown:

![Embed This bApp](./img/embed-bapp.png)

Clicking it opens a dialog that shows you the code you can copy and paste to a page to embed the bApp as a button.

The code will look something like this:

```html

<div class="bappembed-container"
     data-label="Sample bApp"
     data-shortcode="izfd2j"
     data-args="value=1"></div>
<script src="https://cdn.blockwell.ai/bappembed/bundle.js"/>
<link rel="stylesheet" type="text/css" href="https://cdn.blockwell.ai/bappembed/main.css"/>
```

And here is that code on this page, fully working:

<div class="bappembed-container"
    data-label="Sample bApp"
    data-shortcode="izfd2j"
    data-args="value=1"></div>
<script src="https://cdn.blockwell.ai/bappembed/bundle.js" />
<link rel="stylesheet" type="text/css" href="https://cdn.blockwell.ai/bappembed/main.css" />

## Configuration

The embed is configured using the `data-*` HTML attributes. The options are:

- `data-label` is the label text inside the button. Changing this will change what the button says.
- `data-shortcode` is the shortcode for the specific bApp to load. This is the same as in the link for a bApp on
  Blockwell Wallet. For example, the link
  `https://app.blockwell.ai/izfd2j` has the shortcode `izfd2j`.
- `data-args` specifies the arguments to give to the bApp.
  [Read more about arguments](#arguments).

Any configuration change will be picked up immediately by the embed, so you can use JavaScript to change the values on
the fly.

## Arguments

The easiest way to specify arguments is to use the Embed This bApp button on the Blockwell Wallet page, but the
arguments can be set or updated directly as well.

Let's take a closer look at the arguments in `data-args`:

```properties
data-args="value=1"
```

It's setting `value` to `1` - in this case that means the token transfer will transfer 1 FC. If you change the `1` to
a `2`, like so:

```properties
data-args="value=2"
```

The app would then transfer 2 FC.

Here's a more complex example:

```properties
data-args="account=0xd684ea9d172552e28ca8dfe4d9d39b49180741e7&value=1"
```

This time it's giving the value for two different arguments, `account`
and `value`. Each argument is separated by an ampersand `&`.

That may look familiar from web links; it's the same format used by what's called
a [query string](https://en.wikipedia.org/wiki/Query_string) at the end of a link.

In technical terms, the arguments need to be encoded as a query string. Changing
`data-args` will update the button immediately as well, so you can control it from your application.

### Argument Examples

Here's a quick example demonstrating how that might be done with plain JavaScript:

```javascript
function updateButton(tokenValue) {
  let element = document.querySelector(".bappembed-container");
  let query = new URLSearchParams({value: tokenValue});
  element.setAttribute("data-args", query.toString());
}
```

In Vue.js it might look like this:

```vue

<div class="bappembed-container"
     data-label="Sample bApp"
     data-shortcode="izfd2j"
     :data-args="new URLSearchParams({value: tokenValue}).toString()"></div>
```

And in React:

```jsx
render()
{
  const {tokenValue} = this.props;
  let query = new URLSearchParams({value: tokenValue});
  return (
    <div class="bappembed-container"
         data-label="Sample bApp"
         data-shortcode="izfd2j"
         data-args={query.toString()}
    ></div>
  )
}
```

## Styling

The embed code includes the addition of a base style sheet with a neutral theme:

```html
<link rel="stylesheet" type="text/css" href="https://cdn.blockwell.ai/bappembed/main.css"/>
```

There are two options for customizing the styling:

1. The colors all use CSS variables, so you can just override the variables.
2. You can download and modify the linked stylesheet and use that instead.

### Styling with CSS variables

If you set the variables in the inner element, those will be prioritized. For example:

```html
<style>
.bappembed-inner {
  --button-text: #ffffff;
  --button-color: #6d358f;
  --button-border: #6d358f;
  --button-hover: #592e80;
  --button-focus-outline: rgba(0, 0, 0, 0.3);
  --button-disabled: #999;
  --button-disabled-text: #eee;
  --button-disabled-border: #999;
  --button-border-radius: 3px;
  --progress-color: #6d358f;
  --error-text: #650a30;
}
</style>
```

Here's what that looks like:


<div class="bappembed-container bappembed-theme1"
    data-label="Sample bApp"
    data-shortcode="izfd2j"
    data-args="value=1"></div>
<script src="https://cdn.blockwell.ai/bappembed/bundle.js" />
<link rel="stylesheet" type="text/css" href="https://cdn.blockwell.ai/bappembed/main.css" />

<style>
.bappembed-theme1 .bappembed-inner {
  --button-text: #ffffff;
  --button-color: #6d358f;
  --button-border: #6d358f;
  --button-hover: #592e80;
  --button-focus-outline: rgba(0, 0, 0, 0.3);

  --button-disabled: #999;
  --button-disabled-text: #eee;
  --button-disabled-border: #999;

  --button-border-radius: 3px;

  --progress-color: #6d358f;

  --error-text: #650a30;
}
</style>

And here's another alternative:

```html
<style>
.bappembed-inner {
  --button-text: #02806e;
  --button-color: transparent;
  --button-border: #02806e;
  --button-hover: rgba(1, 119, 92, 0.2);
  --button-border-radius: 20px;
}
</style>
```

And again here's what that looks like:

<div class="bappembed-container bappembed-theme2"
    data-label="Sample bApp"
    data-shortcode="izfd2j"
    data-args="value=1"></div>
<script src="https://cdn.blockwell.ai/bappembed/bundle.js" />
<link rel="stylesheet" type="text/css" href="https://cdn.blockwell.ai/bappembed/main.css" />
<style>
.bappembed-theme2 .bappembed-inner {
  --button-text: #02806e;
  --button-color: transparent;
  --button-border: #02806e;
  --button-hover: rgba(1, 119, 92, 0.2);
  --button-border-radius: 20px;
}
</style>
