const apiBaseUrl = 'https://localhost:7091'
export const endpoints = {
    createTenant: () => `${apiBaseUrl}/api/create`,
    createTracker: () => `${apiBaseUrl}/api/trackingGroup/create/1`
}