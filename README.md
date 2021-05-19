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

### Can my application use Gander?

Your application is supported by Gander if it:

- Uses Postgres for storage
- Can be built into an image using [Cloud Native Buildpacks](https://buildpacks.io/)
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

Initialize Gander in your project repository. This command must be run from the root directory of your repository.
It will ask for the following information:

- Your application's name
  - This will become the name of the ECs cluster we create for your app. It must consist of alphanumeric characters and dashes (`-`)
- The language your app is written in
  - This will determine the [builder](https://buildpacks.io/docs/concepts/components/builder/) that Gander will specify to carry out your application image builds.
- The directory containing your application entrypoint
  - This will be utilized by the specified CNBP builder to detect the language of your project
  - For example, if your app is built with Node.js, this is the directory containing your `package.json` file. For a Ruby project, this will be the directory containing your `Gemfile`
- The path to your database setup file
  - This file will be used by Gander to prepare your Postgres database for interaction with your application. It must be a raw `.sql` file containing your database schema and any data you wish to seed your review apps with.
- Your domain
  - This should be the domain you created a wildcard CNAME record for during the setup process. This domain's wildcard CNAME record should point at the application load balancer that was provisioned for you during `gander setup`.
  - You will access your review apps through this domain with URLs of this shape: `$APPNAME-$PR.gander.$YOUR-DOMAIN.com`

`gander init` will populate your repository with customized workflow files for building, updating, and tearing down review apps.

```
USAGE
  $ gander init
```

_See code: [src/commands/init.js](https://github.com/gander-framework/gander-cli/blob/v0.0.1/src/commands/init.js)_

## `gander setup`

This command provisions underlying support infrastructure to house future Gander review applications.
This includes the following:

- Non-default VPC
- Internet Gateway
- Route Table
- Application Load Balancer
- Public Subnets
- Elastic File System + Mount Target
- Security Groups
- `ganderTaskExecution` IAM Role
- `ganderTaskExecution` IAM Policy
- Restricted Gander IAM User

See `/templates/cloudformation/gander.yml` for a complete list of resources provisioned.

```
USAGE
  $ gander setup
```

_See code: [src/commands/setup.js](https://github.com/gander-framework/gander-cli/blob/v0.0.1/src/commands/setup.js)_

<!-- commandsstop -->
