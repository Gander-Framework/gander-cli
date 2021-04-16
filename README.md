fleet-cli
=========

framework to create full-stack review apps on AWS

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/fleet-cli.svg)](https://npmjs.org/package/fleet-cli)
[![Downloads/week](https://img.shields.io/npm/dw/fleet-cli.svg)](https://npmjs.org/package/fleet-cli)
[![License](https://img.shields.io/npm/l/fleet-cli.svg)](https://github.com/Mush-Framework/fleet-cli/blob/master/package.json)

# Notes for Fleet creators

- To run a command you're building, type `./bin/run COMMAND`.
- This framework recommends using the library `inquirer` for prompting and collecting answers from the user.

Structure of app:
|-- src: 
|   |---- aws
|         |---- api: js functions to call andrew's scripts
|         |---- scripts: andrew scripts to actually make api calls
|   |---- commands: the main function that is invoked upon typing `fleet BLAH`
|   |---- util
|         |---- prompts: functions that display questions to user and collects answers

---

# Table of Contents 
<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g fleet-cli
$ fleet COMMAND
running command...
$ fleet (-v|--version|version)
fleet-cli/0.0.0 darwin-x64 node-v14.15.1
$ fleet --help [COMMAND]
USAGE
  $ fleet COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`fleet setup`](#fleet-setup)
* [`fleet help [COMMAND]`](#fleet-help-command)

## `fleet setup`

Creates the last AWS infrastructure and resources such as:
- IAM credentials
- Security groups
- VPC, subnet and internet gateway
- Routes
- EFS 

After this command, your AWS account will be ready to house clusters of review apps.

```
USAGE
  $ fleet setup

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/Mush-Framework/fleet-cli/blob/v0.0.0/src/commands/hello.js)_

## `fleet help [COMMAND]`

display help for fleet

```
USAGE
  $ fleet help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
