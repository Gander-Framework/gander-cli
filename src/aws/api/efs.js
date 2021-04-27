const {
  EFSClient,
  CreateFileSystemCommand,
  DescribeFileSystemsCommand,
  CreateMountTargetCommand,
} = require('@aws-sdk/client-efs');

const client = require('./client.js');
const executeProcess = require('./executeSdkProcess.js');

const initializeClient = region => {
  return new EFSClient({
    region,
  });
};

const createFileSystem = ({ AvailabilityZoneName, CreationToken, Name }) => executeProcess({
  startMsg: 'Creating elastic file system',
  successMsg: 'Elastic file system (EFS) successfully created',
  client: client.efs,
  command: new CreateFileSystemCommand({
    AvailabilityZoneName,
    CreationToken,
    Encrypted: true,
    TagSpecifications: [{
      ResourceType: 'vpc',
      Tags: [{ Key: 'Name', Value: Name }],
    }],
  }),
});

const describeFileSystem = ({ FileSystemId }) => executeProcess({
  startMsg: 'Awaiting file system initialization',
  successMsg: 'File system initialized',
  client: client.efs,
  command: new DescribeFileSystemsCommand({
    FileSystemId,
  }),
});

const createMountTarget = ({ FileSystemId, SubnetId, SecurityGroups }) => executeProcess({
  startMsg: 'Configuring file system with VPC',
  successMsg: 'File system configured',
  client: client.efs,
  command: new CreateMountTargetCommand({
    FileSystemId,
    SubnetId,
    SecurityGroups,
  }),
});

module.exports = {
  initializeClient,
  createFileSystem,
  describeFileSystem,
  createMountTarget,
};
