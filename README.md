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
`yc-sa-json-credentials` should contain JSON with authorized key for Service Account. More info in [Yandex Cloud IAM documentation](https://cloud.yandex.ru/docs/container-registry/operations/authentication#sa-json).

Alternative usage:



See [action.yml](action.yml) for the full documentation for this action's inputs and outputs.

## Prerequisites

To perform this action, service account is required.

## License Summary

This code is made available under the MIT license.
