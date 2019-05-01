## Documentation

You can see below the API reference of this module.

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

