const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'project',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createEducationalContentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateEducationalContent', inputVars);
}
createEducationalContentRef.operationName = 'CreateEducationalContent';
exports.createEducationalContentRef = createEducationalContentRef;

exports.createEducationalContent = function createEducationalContent(dcOrVars, vars) {
  return executeMutation(createEducationalContentRef(dcOrVars, vars));
};

const listEducationalContentRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListEducationalContent');
}
listEducationalContentRef.operationName = 'ListEducationalContent';
exports.listEducationalContentRef = listEducationalContentRef;

exports.listEducationalContent = function listEducationalContent(dc) {
  return executeQuery(listEducationalContentRef(dc));
};

const updatePodcastRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePodcast', inputVars);
}
updatePodcastRef.operationName = 'UpdatePodcast';
exports.updatePodcastRef = updatePodcastRef;

exports.updatePodcast = function updatePodcast(dcOrVars, vars) {
  return executeMutation(updatePodcastRef(dcOrVars, vars));
};

const listStoriesByTagRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListStoriesByTag', inputVars);
}
listStoriesByTagRef.operationName = 'ListStoriesByTag';
exports.listStoriesByTagRef = listStoriesByTagRef;

exports.listStoriesByTag = function listStoriesByTag(dcOrVars, vars) {
  return executeQuery(listStoriesByTagRef(dcOrVars, vars));
};
