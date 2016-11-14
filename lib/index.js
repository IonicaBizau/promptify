"use strict";

const ul = require("ul")
    , isWin = require("is-win")
    , fs = require("fs")
    ;

const CARRIAGE_RETURN = 13;

class Promptify {
    /**
     * Promptify
     * Creates a new `Promptify`. In most of the cases,
     * there will be one such instance per process.
     *
     * @name Promptify
     * @function
     * @param {Object} conf The `Promptify` config:
     * @returns {Promptify} The `Promptify` instance.
     */
    constructor (conf) {
        conf = ul.merge(conf, {
            sigint: true
        });
        this.conf = conf;
    }

    /**
     * sync
     * Synchronous version of the prompt.
     *
     * @name sync
     * @function
     * @param {String} message The message do display.
     * @param {String} defMsg The default value.
     * @param {Object} options An object containing the following fields:
     *
     *    - `char` (String): The character to display when writing something. For
     *       example, if it's `*`, the text characters will be replaced with `*`.
     *    - `delimiter` (String): The delimiter between message and the value (default: `": "`).
     *
     * @returns {String} The result.
     */
    sync (message, defMsg, options) {
        let insert = 0
          , savedinsert = 0
          , res
          ;

        if (typeof defMsg === "object") {
            options = defMsg;
            defMsg = "";
        }

        options = ul.merge(options, {
            delimiter: ": "
        });

        message = message || "";
        message = `${message}${options.delimiter}`;

        let char = options.char;
        let mmessageed = "char" in options;

        let fd = isWin() ?process.stdin.fd : fs.openSync("/dev/tty", "rs");

        let wasRaw = process.stdin.isRaw;
        if (!wasRaw) { process.stdin.setRawMode(true); }

        let buf = new Buffer(3);
        let str = "", character, read;

        if (message) {
            process.stdout.write(message);
        }

        let cycle = 0;
        let prevComplete;

        while (true) {
            read = fs.readSync(fd, buf, 0, 3);
            if (read > 1) {
                switch(buf.toString()) {
                    // Up/Down arrows
                    case '\u001b[A':
                    case '\u001b[B':
                        process.stdout.write('\u001b[2K\u001b[0G' + message + str);
                        break;
                    // Left arrow
                    case "\u001b[D":
                        if (mmessageed) break;
                        let before = insert;
                        insert = (--insert < 0) ? 0 : insert;
                        if (before - insert)
                            process.stdout.write('\u001b[1D');
                        break;
                    // Right arrow
                    case '\u001b[C':
                        if (mmessageed) break;
                        insert = (++insert > str.length) ? str.length : insert;
                        process.stdout.write('\u001b[' + (insert+message.length+1) + 'G');
                        break;
                    default:
                        if (buf.toString()) {
                        str = str + buf.toString();
                        str = str.replace(/\0/g, '');
                        insert = str.length;
                        process.stdout.write('\u001b[2K\u001b[0G'+ message + str);
                        process.stdout.write('\u001b[' + (insert+message.length+1) + 'G');
                        buf = new Buffer(3);
                        break;
                    }
                }
                continue;
            }

            // if it is not a control character seq, assume only one character is read
            character = buf[read-1];

            // catch a ^C and return null
            if (character == 3){
                process.stdout.write('^C\n');
                fs.closeSync(fd);

                if (this.conf.sigint) process.exit(130);

                process.stdin.setRawMode(wasRaw);

                return null;
            }

            if (character == CARRIAGE_RETURN) {
                fs.closeSync(fd);
                break;
            }

            if (character == 127 || (process.platform == 'win32' && character == 8)) { //backspace
                if (!insert) continue;
                str = str.slice(0, insert-1) + str.slice(insert);
                insert--;
                process.stdout.write('\u001b[2D');
            } else {
                if ((character < 32 ) || (character > 126))
                    continue;
                str = str.slice(0, insert) + String.fromCharCode(character) + str.slice(insert);
                insert++;
            };

            if (mmessageed) {
                process.stdout.write('\u001b[2K\u001b[0G' + message + Array(str.length+1).join(char));
            } else {
                process.stdout.write('\u001b[s');
                if (insert == str.length) {
                    process.stdout.write('\u001b[2K\u001b[0G'+ message + str);
                } else {
                    if (message) {
                        process.stdout.write('\u001b[2K\u001b[0G'+ message + str);
                    } else {
                        process.stdout.write('\u001b[2K\u001b[0G'+ str + '\u001b[' + (str.length - insert) + 'D');
                    }
                }
                process.stdout.write('\u001b[u');
                process.stdout.write('\u001b[1C');
            }
        }

        process.stdout.write('\n')
        process.stdin.setRawMode(wasRaw);

        return str || defMsg || '';
    }
}

let _ = null;

/**
 * promptify
 * Prompt a message to the user. The arguments are passed to the `sync` method.
 *
 * @name promptify
 * @function
 */
module.exports = function (...args) {
    if (!process.stdin.isTTY) {
        return;
    }
    _ = _ || new Promptify();
    return _.sync(...args)
};

module.exports.Promptify = Promptify;
