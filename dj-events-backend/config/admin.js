module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2cc15a41c92771e8a58d4dd85da2efe8'),
  },
});
