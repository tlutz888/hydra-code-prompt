# Running the example API

## Install Node.js

If your system does not yet have Node.js installed, install it using one of the
packages on the [Node.js downloads page](https://nodejs.org/en/download/) or
the package manager of your choice (e.g. `brew install node` on macOS). Then,
change directories to where this repository is checked out and proceed with the
following steps.

## Install packages

```
npm install
```

## Generate seed data

```
npm run seed
```

This must be done prior to starting the server, but it only needs to be done
once; generated data is saved to disk in the `data` folder and can be used by
the server process indefinitely afterwards.

Note that changes made to saved state via server interactions are not saved
back to the seed files. Each time the server is started, it will only have the
original seed data.

Randomization of seed data is controlled by the `RANDOM_SEED` environment
variable set in `.env`; re-running `npm run seed` with the same `RANDOM_SEED`
value will generate the same output data.

## Start server

```
npm run dev
```

The API server will start up by default on port 3000, as specified by the
`PORT` environment variable in `.env`; this may be changed if another service
is using that port number.

## REST Reference Guide

You can find a reference describing the various endpoints available in the
`instructions/service-details.md` file.
