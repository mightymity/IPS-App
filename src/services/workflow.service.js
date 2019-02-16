import axios from 'axios'

const domainName = "http://178.128.214.101:8002"

const localhost = "http://127.0.0.1:8000"

export const workflowService = {
  getAllServices,
  getAllMethodsByServiceId,
  sendWorkflowData,
  getWorkflowByAppName
};

function getAllServices() {
  return axios.get(domainName + '/all_services/')
}

function getAllMethodsByServiceId(serviceId) {
  return axios.post(domainName + '/get_all_methods/', { serviceId })
}

// Send both form and bpmn json together
function sendWorkflowData(appName, appDescription, workflowData) {
  return axios.post(localhost + '/create_workflow/', { appName, appDescription, workflowData })
}

function getWorkflowByAppName(appName) {
  return axios.post(domainName + '/get_workflow/', appName)
}
