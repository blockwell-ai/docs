---
title: Callbacks

---
# Callbacks

Some endpoints allow specifying callbacks that get called when the action completes.
Most notably all actions that create Ethereum transactions.

Callbacks are always expected as full URLs, either `http` or `https`, and as an array.
If only one callback is desired, simply provide it as a single-item array.

Callbacks are always `POST` request with a JSON payload. The URL specified will be
called verbatim, without any changes to the request path or query string.

The callback will be attempted 4 times, or until a 2xx response is given, with an
increasing delay between attempts.

## Callback data

Callback-enabled endpoints can optionally be called with a `callbackData` body
parameter, which will be added to the actual callback request. This can be used to
identify specific callbacks, or pass data around.

There are certain restrictions on this data to avoid security concerns:

* `callbackData` itself has to be an object.
* Keys in the object can only be alphanumeric.
* Values can only be a string, number, boolean or array. No objects.
* Arrays can only contain strings or numbers.
* The size is limited to 5 kB.

Note that you shouldn't blindly trust the contents of `callbackData` without ensuring
that the transaction is actually legitimate. If an attacker knows the callback URL
of your application, they can have API Miner make callbacks to your server as well.

## Callback security

Callback payloads are signed using public-key cryptography, with the signature given
in the `Apiminer-Signature` header of the request.

The format for the header is as follows (white-space added for clarity):

```http request
Apiminer-Signature: keyid=<key-id>;
                    algorithm=SHA256;
                    signature=<signature>
```

The signature is made with the entire POST body of the request. The signing algorithm
depends on the key being used, but would typically be RSA. The hash algorithm is
specified in the header, currently SHA-256. The signature itself is hex-encoded.

The callback body contains two fields that can be used to improve security further.

*Timestamp* contains the millisecond timestamp for when API Miner initiated the
callback network request. This can be used to verify the timing of the callback
isn't off.

*Owner* contains the ID of the user account that triggered the callback. Use this
to ensure that it was really your application that made the original request.

In addition, feel free to add your own signing schemes to the `callbackData` fields
to ensure they are not tampered with.

### Public keys

The public keys can be [retrieved from the API](#operation/PublicKey), but it's not
recommended to do this automatically in production applications. The default key
should be fetched manually.

In all but the most extreme circumstances, the default key will continue to work,
and ample warning will be given before expiration.

## Callback examples

Callbacks can have slightly different data depending on what they were created from,
but they all have the same basic format:

```json
{
    "timestamp": 1532552777448,
    "owner": "",
    "payload": { },
    "callbackData": { }
}
```

- `timestamp` is just the timestamp when API Miner initiated the callback request.
Since it is signed data, it can be used as additional verification.
- `owner` is the ID of the account that initiated the work leading to the callback.
- `payload` is the actual data of the event, typically a
[transaction](#operation/TransactionById).
- `callbackData` contains the data given to API Miner in the original API call that
initiated the action.

#### Token transfer succeeded

```json
{
    "timestamp": 1532552777448,
    "owner": "4b17b28b-2409-54b6-bf43-f36fe8bced4e",
    "payload": {
        "id": "8c9a4558-93cb-4d6a-821c-77ea1ca9adad",
        "status": "completed",
        "created": "2018-06-08T19:04:14.216Z",
        "submitted": "2018-06-08T19:04:14.980Z",
        "ended": "2018-06-08T19:04:29.050Z",
        "transactionHash": "0xe1eabd59aea1857bc5eb52d42415b76cfe539e9d650903d85accd3cd9c3d36c0"
    }
}
```

#### Token transfer failed

```json
{
    "timestamp": 1532552777448,
    "owner": "4b17b28b-2409-54b6-bf43-f36fe8bced4e",
    "payload": {
        "id": "8c9a4558-93cb-4d6a-821c-77ea1ca9adad",
        "status": "error",
        "created": "2018-06-08T19:04:14.216Z",
        "submitted": "2018-06-08T19:04:14.980Z",
        "ended": "2018-06-08T19:04:29.050Z",
        "error": "Transaction ran out of gas. Please provide more gas",
        "transactionHash": "0xe1eabd59aea1857bc5eb52d42415b76cfe539e9d650903d85accd3cd9c3d36c0"
    }
}
```

#### Token transfer succeeded with user ID in callback data

```json
{
    "timestamp": 1532552777448,
    "owner": "4b17b28b-2409-54b6-bf43-f36fe8bced4e",
    "payload": {
        "id": "8c9a4558-93cb-4d6a-821c-77ea1ca9adad",
        "status": "completed",
        "created": "2018-06-08T19:04:14.216Z",
        "submitted": "2018-06-08T19:04:14.980Z",
        "ended": "2018-06-08T19:04:29.050Z",
        "transactionHash": "0xe1eabd59aea1857bc5eb52d42415b76cfe539e9d650903d85accd3cd9c3d36c0"
    },
    "callbackData": {
        "userId": 123
    }
}
```

#### Contract deployment succeeded

```json
{
    "timestamp": 1532552777448,
    "owner": "4b17b28b-2409-54b6-bf43-f36fe8bced4e",
    "payload": {
        "id": "8c9a4558-93cb-4d6a-821c-77ea1ca9adad",
        "status": "completed",
        "created": "2018-06-08T19:04:14.216Z",
        "submitted": "2018-06-08T19:04:14.980Z",
        "ended": "2018-06-08T19:04:29.050Z",
        "transactionHash": "0xe1eabd59aea1857bc5eb52d42415b76cfe539e9d650903d85accd3cd9c3d36c0",
        "contract": {
            "id": "6ab34922-0561-48b7-9e11-ce1581e100f2",
            "address": "0x418f8020b48731ffd2a99afe0aa5e7d66ca263d8"
        }
    }
}
```