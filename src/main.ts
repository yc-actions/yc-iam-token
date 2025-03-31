import {getInput, setSecret, info, setOutput, setFailed} from '@actions/core';
import {fromServiceAccountJsonFile} from './service-account-json';
import {IIAmCredentials} from '@yandex-cloud/nodejs-sdk/dist/types';
import {IamTokenService} from '@yandex-cloud/nodejs-sdk/dist/token-service/iam-token-service';

function getServiceAccountJson(): IIAmCredentials {
  const ycSaJsonCredentials = getInput('yc-sa-json-credentials');
  if (ycSaJsonCredentials.length !== 0) {
    setSecret(ycSaJsonCredentials);
    return fromServiceAccountJsonFile(JSON.parse(ycSaJsonCredentials));
  }

  const ycKeyId = getInput('yc-key-id', {required: true});
  const ycServiceAccountId = getInput('yc-service-account-id', {required: true});
  const ycPrivateKey = getInput('yc-private-key', {required: true});

  setSecret(ycServiceAccountId);
  setSecret(ycKeyId);
  setSecret(ycPrivateKey);

  return {
    accessKeyId: ycKeyId,
    serviceAccountId: ycServiceAccountId,
    privateKey: ycPrivateKey,
  };
}

async function run(): Promise<void> {
  try {
    const serviceAccountJson = getServiceAccountJson();

    info('Function inputs set');
    const tokenService = new IamTokenService(serviceAccountJson);

    const token = await tokenService.getToken();

    const maskToken = getInput('mask-token');
    if (maskToken === 'true') {
      setSecret(token);
    }

    setOutput('token', token);
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
