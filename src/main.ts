import * as core from '@actions/core';
import {fromServiceAccountJsonFile} from './service-account-json';
import {IamTokenService} from '@yandex-cloud/nodejs-sdk/dist/token-service/iam-token-service';

async function run(): Promise<void> {
  try {
    const ycSaJsonCredentials = core.getInput('yc-sa-json-credentials', {
      required: true,
    });
    core.setSecret(ycSaJsonCredentials);

    const serviceAccountJson = fromServiceAccountJsonFile(JSON.parse(ycSaJsonCredentials));

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
