# DFINITY Guestbook

A retro 90's style Web3.0 guestbook built on [DFINITY](https://dfinity.org/).

## Requirements

Install the beta version of the DFINITY Canister SDK

```
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)" 
```

## Usage 

Install dependencies: 

```
yarn
```

Start the backend: 

```
dfx start --background
dfx canister create --all
dfx build
dfx canister install --all
```

Start the frontend: 

```
yarn dev
```

## References

* [ic-starter-templates](https://github.com/MioQuispe/ic-starter-templates)
* [Journey](https://github.com/hansl/journey)
* [superheros](https://github.com/enzoh/superheroes)
* [github-guestbook](https://github.com/victoriadrake/github-guestbook)

## License

MIT
