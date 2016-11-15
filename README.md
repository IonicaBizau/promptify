
# promptify

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/promptify.svg)](https://www.npmjs.com/package/promptify) [![Downloads](https://img.shields.io/npm/dt/promptify.svg)](https://www.npmjs.com/package/promptify) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> An easy-to-use prompt for Node.js.

## :cloud: Installation

```sh
$ npm i --save promptify
```


## :clipboard: Example



```js
const promptify = require("promptify");

let name = promptify("Enter your name");
console.log(`Hey, ${name}!`);

let pass = promptify("Enter your password", {
    char: "*"
});
console.log(`You entered: ${pass}`);
```

## :memo: Documentation


### `Promptify(conf)`
Creates a new `Promptify`. In most of the cases,
there will be one such instance per process.

#### Params
- **Object** `conf`: The `Promptify` config:

#### Return
- **Promptify** The `Promptify` instance.

### `sync(message, defMsg, options)`
Synchronous version of the prompt.

#### Params
- **String** `message`: The message do display.
- **String** `defMsg`: The default value.
- **Object** `options`: An object containing the following fields:
   - `char` (String): The character to display when writing something. For
      example, if it's `*`, the text characters will be replaced with `*`.
   - `delimiter` (String): The delimiter between message and the value (default: `": "`).

#### Return
- **String** The result.

### `promptify()`
Prompt a message to the user. The arguments are passed to the `sync` method.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:

## :cake: Thanks

 - Highly inspired from [`prompt-sync`](https://github.com/0x00A/prompt-sync). Thanks! :cake:


## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`tilda`](https://github.com/IonicaBizau/tilda)—Tiny module for building command line tools.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png


[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit

[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
