<p align="center">
  <img src="logo_color.png" width="500" height="200" />
</p>

<h1 align="center">Gander: Open source solution for deploying isolated, ephemeral apps based on your pull requests</h1>
<h2 align="center">All you need is an AWS account and a GitHub repo to get started</h2>

Gander automates the provisioning, state, and teardown of your review apps while allowing you maintain full control over your source code and self-hosted infrastructure. Currently, we only support AWS as a cloud provider and Postgres as a database.

To learn more, please read our extensive [case study](http://gander-framework.github.io).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/fleet-cli.svg)](https://npmjs.org/package/gander-cli)
[![Downloads/week](https://img.shields.io/npm/dw/fleet-cli.svg)](https://npmjs.org/package/gander-cli)
[![License](https://img.shields.io/npm/l/fleet-cli.svg)](https://github.com/gander-framework/gander-cli/blob/master/package.json)

---

# Table of Contents

<!-- toc -->

- [Table of Contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installsetup)
- [Commands](#commands)
<!-- tocstop -->

# Prerequisites

<!--prerequisites-->

- AWS Account
- AWS CLI Configured with your AWS Account
- Node + NPM
- Application Repository
<!--prerequisitesstop-->

# Installation and Setup

<!--installsetup-->

- Run the command `npm install -g gander-cli` to globally install Gander on your machine

- Before initializing Gander with any applications, you must run `gander setup`, which will provision and configure all of the necessary infrastructure you need to begin deploying review apps. See [Commands](#commands) for more information about this command.

```sh-session
$ npm install -g gander-cli
$ gander setup
running setup...
$ gander (-v|--version|version)
gander-cli/0.0.1 darwin-x64 node-v14.15.1
$ gander --help [COMMAND]
...
```

<!--installsetupstop-->

# Commands

<!-- commands -->

- [`gander help [COMMAND]`](#gander-help-command)
- [`gander init`](#gander-init)
- [`gander setup`](#gander-setup)

## `gander help [COMMAND]`

display help for gander

```
USAGE
  $ gander help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `gander init`

Initialize a Gander App in your project repository

```
USAGE
  $ gander init
```

_See code: [src/commands/init.js](https://github.com/gander-framework/gander-cli/blob/v0.0.1/src/commands/init.js)_

## `gander setup`

Create an AWS VPC for your review apps to live

```
USAGE
  $ gander setup
```

_See code: [src/commands/setup.js](https://github.com/gander-framework/gander-cli/blob/v0.0.1/src/commands/setup.js)_

<!-- commandsstop -->
