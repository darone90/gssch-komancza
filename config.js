module.exports = {
    db: "mongodb+srv://admin:gsschkomancza12345@gssch.sozsr.mongodb.net/GSSCH?retryWrites=true&w=majority",
    keySession: ['key example'],
    maxAgeSession: 1000*60*60*3,
    algorithm: 'aes-192-cbc',
    password: 'password example',
    iterations: 24,
    salt: 'salt example'
}