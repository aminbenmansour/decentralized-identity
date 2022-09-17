# decentralized-identity

Decentralized Identifiers (DIDs), a new [web standard](https://www.w3.org/TR/did-core/) is a type of globally unique identifier (URI) that does not require a centralized registration authority because **control of the identifier can be proved using cryptography**.

*DIDs are the atomic building block of decentralized digital trust infrastructure.* - Book: *Self-Sovereign Identity* Chapter 8: *Decentralized Identifiers*

A DID is a digital control point !

Unlike the most commonly used identifiers and proof of identity(e-mails, phone numbers, domain names) that we use nowadays in order to express ourselves and communicate, we own the control point of our identity.

Currently used methods are owned and controlled by a third-party authority. They reside in some server at some serrvice provider somewhere, by contrast, thanks to decentralization, the DID control point is always with you.

The "cryptographic triangle" behind standard DIDs

> insert figure here

The private key is the control key behinf the identifier (it could be multiple private keys in cases in multisig wallets)

> inser wait a minute meme, private and public key cryptography is old

Key rotation, is one of the fundemental recommendation of a good security is do NOT keep using the same public-private key pair for a long period of time, DIDs never needs to change even when keys do change

So, DIDs provide a single continuous identity rergardless of key pair that keeps changing.