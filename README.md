# Run project

## 1. Install depedencies

`npm i` or `yarn`

## 2. Configure enviroment

- `npx auth secret`
... will create AUTH_SECRET line in [.env.local](.env.local) with some data.

- Add providers api keys

## 2.1 **Twitter**

    AUTH_TWITTER_ID - client id
    AUTH_TWITTER_SECRET - client secret

## 2.2. **Discord**

Go to discord developer portal and [create application](https://discord.com/developers/applications)
Edit appearance to your taste if needed

Go to OAuth2 section, here you can find client_id and client_secret. Secret will reveal once created, then you have to reset it to see it again

    AUTH_DISCORD_ID - client id
    AUTH_DISCORD_SECRET - client secret
    
    






















