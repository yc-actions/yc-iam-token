import * as core from '@actions/core';
import {fromServiceAccountJsonFile} from './service-account-json';
import {IIAmCredentials} from '@yandex-cloud/nodejs-sdk/dist/types';
import {IamTokenService} from '@yandex-cloud/nodejs-sdk/dist/token-service/iam-token-service';

function getServiceAccountJson(): IIAmCredentials {
  const ycSaJsonCredentials = core.getInput('yc-sa-json-credentials');
  if (ycSaJsonCredentials.length !== 0) {
    core.setSecret(ycSaJsonCredentials);
    return fromServiceAccountJsonFile(JSON.parse(ycSaJsonCredentials));
  }

  const ycKeyId = core.getInput('yc-key-id', {required: true});
  const ycServiceAccountId = core.getInput('yc-service-account-id', {required: true});
  const ycPrivateKey = core.getInput('yc-private-key', {required: true});

  core.setSecret(ycServiceAccountId);
  core.setSecret(ycKeyId);
  core.setSecret(ycPrivateKey);

  return {
    accessKeyId: ycKeyId,
    serviceAccountId: ycServiceAccountId,
    privateKey: ycPrivateKey,
  };
}

async function run(): Promise<void> {
  try {
    const serviceAccountJson = getServiceAccountJson();

    core.info('Function inputs set');
    const tokenService = new IamTokenService(serviceAccountJson);

    const token = await tokenService.getToken();
    core.setSecret(token);
    core.setOutput('token', token);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
