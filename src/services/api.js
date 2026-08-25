const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const def_fetch = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  // Set headers if not uploading FormData
  const headers = options.body instanceof FormData 
    ? {} 
    : { 'Content-Type': 'application/json', ...options.headers };
    
  const response = await fetch(url, {
    ...options,
    headers
  });
  
  if (!response.ok) {
    let errorMsg = `API Error: ${response.status} ${response.statusText}`;
    try {
      const errData = await response.json();
      errorMsg = errData.detail || errorMsg;
    } catch {
      // Ignored
    }
    throw new Error(errorMsg);
  }
  
  return response.json();
}

export const analyzeDevice = async (formData) => {
  return def_fetch('/ai/analyze', {
    method: 'POST',
    body: formData
  });
};

export const createListing = async (listingData) => {
  return def_fetch('/listings', {
    method: 'POST',
    body: JSON.stringify(listingData)
  });
};

export const getListings = async (status = '') => {
  const query = status ? `?status=${status}` : '';
  return def_fetch(`/listings${query}`);
};

export const getSellerListings = async (sellerId) => {
  return def_fetch(`/listings/seller/${sellerId}`);
};

export const getAvailableListings = async () => {
  return def_fetch('/listings/available');
};

export const getAcceptedListings = async (recyclerId) => {
  return def_fetch(`/listings/accepted/${recyclerId}`);
};

export const acceptListing = async (listingId, recyclerId) => {
  return def_fetch(`/listings/${listingId}/accept`, {
    method: 'PUT',
    body: JSON.stringify({ recyclerId })
  });
};

export const updateListingStatus = async (listingId, status) => {
  return def_fetch(`/listings/${listingId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
};

export const recordRecoveredMaterials = async (listingId, materials) => {
  return def_fetch(`/listings/${listingId}/recover-materials`, {
    method: 'POST',
    body: JSON.stringify({ materials })
  });
};

export const cancelListing = async (listingId) => {
  return def_fetch(`/listings/${listingId}/cancel`, {
    method: 'PUT'
  });
};

export const schedulePickup = async (pickupData) => {
  return def_fetch('/pickups', {
    method: 'POST',
    body: JSON.stringify(pickupData)
  });
};

export const getPickupByListing = async (listingId) => {
  return def_fetch(`/pickups/listing/${listingId}`);
};

export const createTransaction = async (txnData) => {
  return def_fetch('/transactions', {
    method: 'POST',
    body: JSON.stringify(txnData)
  });
};

export const getTransactions = async (role, userId) => {
  if (role === 'admin') {
    return def_fetch('/transactions');
  } else if (role === 'seller') {
    return def_fetch(`/transactions/seller/${userId}`);
  } else if (role === 'recycler') {
    return def_fetch(`/transactions/recycler/${userId}`);
  }
  return [];
};

export const completeTransaction = async (txnId) => {
  return def_fetch(`/transactions/${txnId}/complete`, {
    method: 'PUT'
  });
};

export const getRecyclerAnalytics = async (recyclerId) => {
  return def_fetch(`/analytics/recycler/${recyclerId}`);
};

export const getCorporateAnalytics = async (corporateId) => {
  return def_fetch(`/analytics/corporate/${corporateId}`);
};

export const getSellerAnalytics = async (sellerId) => {
  return def_fetch(`/analytics/seller/${sellerId}`);
};

export const getAdminAnalytics = async () => {
  return def_fetch('/analytics/admin');
};

export const bulkUploadListings = async (file, corporateId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('corporateId', corporateId);
  return def_fetch('/listings/bulk-upload', {
    method: 'POST',
    body: formData
  });
};

export const getRecyclers = async () => {
  return def_fetch('/users/recyclers');
};

export const verifyRecycler = async (recyclerId, status) => {
  return def_fetch(`/users/recyclers/${recyclerId}/verify`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
};

export const getUsers = async () => {
  return def_fetch('/users');
};

export const getProfile = async (userId) => {
  return def_fetch(`/users/profile/${userId}`);
};

export const updateProfile = async (userId, profileData) => {
  return def_fetch(`/users/profile/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
};
