// eslint-disable-next-line unicorn/filename-case
const _awsInfo = {
  iam: {
    groupName: '',
    userName: '',
  },
  vpcSecurityGroup: {
    name: '',
    description: '',
  },
  vpc: {
    id: '',
    name: '',
    cidrBlock: '',
  },
  subnet: {
    id: '',
    name: '',
    cidrBlock: '',
    availZone: '',
  },
  internetGateway: {
    id: '',
    name: '',
  },
  routeTable: {
    id: '',
    name: '',
    associationId: '',
  },
  efsSecurityGroup: {
    id: '',
    name: '',
  },
  efs: {
    id: '',
    name: '',
  },
}

const awsStore = {
  // create setter methods
  // do something to make default values possible
}

Object.freeze(awsStore)
module.exports = awsStore
