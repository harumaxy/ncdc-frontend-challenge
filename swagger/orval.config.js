module.exports = {
  backend: {
    output: {
      mode: 'tags-split',
      target: 'src/swagger.ts',
      schemas: 'src/model',
      client: 'react-query',
      httpClient: "fetch",
      baseUrl: "http://localhost:3000",
      mock: true,
    },
    input: {
      target: './swagger.yaml',
    },
  },
};