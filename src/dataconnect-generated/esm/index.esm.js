import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'project',
  location: 'us-east4'
};

export const createEducationalContentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateEducationalContent', inputVars);
}
createEducationalContentRef.operationName = 'CreateEducationalContent';

export function createEducationalContent(dcOrVars, vars) {
  return executeMutation(createEducationalContentRef(dcOrVars, vars));
}

export const listEducationalContentRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListEducationalContent');
}
listEducationalContentRef.operationName = 'ListEducationalContent';

export function listEducationalContent(dc) {
  return executeQuery(listEducationalContentRef(dc));
}

export const updatePodcastRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePodcast', inputVars);
}
updatePodcastRef.operationName = 'UpdatePodcast';

export function updatePodcast(dcOrVars, vars) {
  return executeMutation(updatePodcastRef(dcOrVars, vars));
}

export const listStoriesByTagRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListStoriesByTag', inputVars);
}
listStoriesByTagRef.operationName = 'ListStoriesByTag';

export function listStoriesByTag(dcOrVars, vars) {
  return executeQuery(listStoriesByTagRef(dcOrVars, vars));
}

