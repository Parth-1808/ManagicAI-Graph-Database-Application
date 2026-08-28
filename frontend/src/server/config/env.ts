/**
 * Server Environment Configuration & Validation
 */
export const SERVER_CONFIG = {
  cognodb: {
    uri: process.env.COGNODB_URI || 'bolt+s://db-62c8531c.bravo.databases.cognodb.com',
    user: process.env.COGNODB_USER || 'cognodb',
    password: process.env.COGNODB_PASSWORD || 'af829ec1c54011534c1aab45a9dbcd3f',
    apiKey: process.env.COGNODB_API_KEY || 'cdb_784dabb1_9341b23b1fdcbfd7d85cbf76d0f60afb',
    maxConnectionPoolSize: 25,
    connectionTimeout: 10000,
    maxRetries: 3,
    retryDelayMs: 400,
  },
  app: {
    environment: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
  },
};
