const apiBaseUrl = 'https://localhost:7091'
export const endpoints = {
    createTenant: () => `${apiBaseUrl}/api/create`,
    loadTenants: () => `${apiBaseUrl}/api/tenants`,
    getTenantUsers: (tenantId) =>` ${apiBaseUrl}/api/users/${tenantId}`,
    getTenantName: (tenantId) => `${apiBaseUrl}/api/tenant/${tenantId}`,
    updateTenantName: (tenantId) => `${apiBaseUrl}/api/edit/${tenantId}`,
    getCurrentTenantData: (tenantId) => `${apiBaseUrl}/api/users/${tenantId}`,
    resetTenantName: (tenantId) => `${apiBaseUrl}/api/reset/${tenantId}`,
    inviteUser: (tenantId) => `${apiBaseUrl}/api/create/${tenantId}`,
    removeUser: (userId) => `${apiBaseUrl}/api/delete/${userId}`,

    loadTrackers: () => `${apiBaseUrl}/api/trackersList`,
    createTracker: () => `${apiBaseUrl}/api/trackingGroup/create`,
    createTrackingItem: (tenantId, trackingGroupId) => `${apiBaseUrl}/api/trackingItems/create/${tenantId}/${trackingGroupId}`,
    createTrackingGroupRecord: (trackingGroupId) => `${apiBaseUrl}/api/create/trackingGroupsRecords/${trackingGroupId}`,
    getTrackingGroupRecords: (trackingGroupId) => `${apiBaseUrl}/api/trackingGroupRecords/${trackingGroupId}`,
    getTrackingGroup: (trackingGroupId) => `${apiBaseUrl}/api/trackers/${trackingGroupId}`,
    updateTrackerName: (trackingGroupId) => `${apiBaseUrl}/api/trackingGroup/edit/${trackingGroupId}`,
    updateTrackerLabel: (trackingGroupId) => `${apiBaseUrl}/api/trackingGroup/edit/label/${trackingGroupId}`,
    getTrackingGroupTrackingItems: (trackingGroupId) => `${apiBaseUrl}/api/getTrackingItemByTrackingGroupId/${trackingGroupId}`,
    getTrackingItemById: (trackingItemId) => `${apiBaseUrl}/api/getTrackingItem/${trackingItemId}`,
    resetName: (trackingGroupId) => `${apiBaseUrl}/api/reset/tracker/${trackingGroupId}`,
    editTracker: (trackerId) => `${apiBaseUrl}/api/editTracker/${trackerId}`,
    getAllRecords: (trackingGroupId) => `${apiBaseUrl}/api/trackingGroupsRecordsUnique/${trackingGroupId}`,
    getAllTrackingItems: (trackingGroupId) => `${apiBaseUrl}/api/trackingItems/${trackingGroupId}`,

    createComment: (trackingItemValueId) => `${apiBaseUrl}/api/create/comments/${trackingItemValueId}`,
    loadComments: (trackingItemValueId) => `${apiBaseUrl}/api/comments/${trackingItemValueId}`,

    getUserName: (userId) => `${apiBaseUrl}/user/getName/${userId}`,
}