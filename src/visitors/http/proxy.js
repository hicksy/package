module.exports = function proxy ({ inv }, template) {

  let staging = inv.proxy.staging

  if (!staging) {
    throw SyntaxError(`@proxy missing 'staging' setting`)
  }

  // Overwrite the default route to point at the configured http endpoint
  template.Resources.HTTP.Properties.DefinitionBody.paths['/$default'] = {
    'x-amazon-apigateway-any-method': {
      isDefaultRoute: true,
      'x-amazon-apigateway-integration': {
        payloadFormatVersion: '1.0',
        type: 'http_proxy',
        httpMethod: 'ANY',
        uri: staging,
        connectionType: 'INTERNET',
        timeoutInMillis: 30000
      }
    }
  }

  return template
}
