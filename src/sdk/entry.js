const contentstack = require("contentstack")

const Stack = contentstack.Stack({
    api_key: process.env.REACT_APP_APIKEY,
    delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
    environment: process.env.REACT_APP_ENVIRONMENT,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getSpecificEntry(ctUid, entryUrl, locale) {
        return new Promise((resolve, reject) => {
            const blogQuery = Stack.ContentType(ctUid)
                .Query()
                .language(locale)
                .includeOwner()
                .toJSON()

            const data = blogQuery.where("uid", `${entryUrl}`).find()
            data.then(
                (result) => {
                    resolve(result[0])
                },
                (error) => {
                    reject(error)
                }
            )
        })
    },
}
