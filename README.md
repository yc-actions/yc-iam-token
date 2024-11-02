## GitHub Action issuing Yandex Cloud IAM Token

The action issues new Yandex Cloud IAM token and puts it in the output.

**Table of Contents**

<!-- toc -->

- [Usage](#usage)
- [Prerequisites](#prerequisites)
- [License Summary](#license-summary)

<!-- tocstop -->

## Usage

```yaml
- name: IAM Token
  id: issue-iam-token
  uses: yc-actions/yc-iam-token@v1
  with:
    yc-sa-json-credentials: ${{ secrets.YC_SA_JSON_CREDENTIALS }}
```

`yc-sa-json-credentials` should contain JSON with authorized key for Service Account. More info
in [Yandex Cloud IAM documentation](https://cloud.yandex.ru/docs/container-registry/operations/authentication#sa-json).

Alternative usage:

```yaml
- name: IAM Token
  id: issue-iam-token
  uses: yc-actions/yc-iam-token@v1
  with:
    yc-key-id: ${{ secrets.YC_KEY_ID }}
    yc-service-account-id: ${{ secrets.YC_SERVICE_ACCOUNT_ID }}
    yc-private-key: ${{ secrets.YC_PRIVATE_KEY }}
```

`yc-key-id`, `yc-service-account-id` and `yc-private-key` are `id`, `service_account_id` and `private_key` respectively
from Service Account json key.

### Action Inputs

| Name                     | Description                                                           | Default                                 |
|--------------------------|-----------------------------------------------------------------------|-----------------------------------------|
| `yc-sa-json-credentials` | Json containing authorized key for Service Account                    | `${{ secrets.YC_SA_JSON_CREDENTIALS }}` |
| `yc-key-id`              | "id" field from Service Account json key.                             | `${{ secrets.YC_KEY_ID }}`              |
| `yc-service-account-id`  | "service_account_id" field from Service Account json key.             | `${{ secrets.YC_SERVICE_ACCOUNT_ID }}`  |
| `yc-private-key`         | "private_key" field from Service Account json key.                    | `${{ secrets.YC_PRIVATE_KEY }}`         |
| `mask-token`             | Mask generated IAM token (use "false" for sharing token between jobs) | `true`                                  |

### Action Outputs

| Name    | Description         |
|---------|---------------------|
| `token` | Generated IAM token |

## Prerequisites

To perform this action, service account is required.

## License Summary

This code is made available under the MIT license.
