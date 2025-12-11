export const environment = {
  production: true,
  auth0: {
    domain: "dev-energycoop.uk.auth0.com",
    clientId: "xN3rhmATd9PPs0I2bwzpdef2IUhaEQQo",
    audience: "http://localhost:8080/",
    redirectUri: "https://user-dashboard-staging.windcoop.co.uk",
    scope: "openid profile email",
    state: "xyz"
  },
  api: {
    baseURL: "https://energy-coop-server-staging.172.236.22.158.sslip.io/api/v1",
    energyMixURL: "https://api.carbonintensity.org.uk"
  }
};
