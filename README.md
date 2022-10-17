# status-cron-abhijithvijayan_in

Cron to refresh status page cache of status.abhijithvijayan.in

## Docs

### Set up deta.sh

> <https://docs.deta.sh/docs/cli/install>

### Deploy to Deta

```shell
deta new --node status-cron-abhijithvijayan_in
yarn install
yarn deploy
yarn set:cron # sets for 5 minutes interval
```

#### Note: For subsequent deployment run only

```shell
yarn deploy
```
