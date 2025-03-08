// Simple admin authentication
const ADMIN_CREDENTIALS_KEY = 'hhs_heart_admin_credentials';

interface AdminCredentials {
  password: string;
  lastLogin: string;
}

/**
 * Set admin password
 */
export const setAdminPassword = (password: string): void => {
  try {
    const credentials: AdminCredentials = {
      password: password,
      lastLogin: new Date().toISOString()
    };
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(credentials));
  } catch (error) {
    console.error('Error setting admin password:', error);
  }
};

/**
 * Verify admin password
 */
export const verifyAdminPassword = (password: string): boolean => {
  try {
    const credentialsJson = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    if (!credentialsJson) return false;
    
    const credentials: AdminCredentials = JSON.parse(credentialsJson);
    const isValid = credentials.password === password;
    
    // Update last login time if valid
    if (isValid) {
      credentials.lastLogin = new Date().toISOString();
      localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(credentials));
    }
    
    return isValid;
  } catch (error) {
    console.error('Error verifying admin password:', error);
    return false;
  }
};

/**
 * Check if admin is set up
 */
export const isAdminSetup = (): boolean => {
  try {
    const credentialsJson = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    return !!credentialsJson;
  } catch (error) {
    console.error('Error checking admin setup:', error);
    return false;
  }
};

/**
 * Clear admin credentials
 */
export const clearAdminCredentials = (): void => {
  try {
    localStorage.removeItem(ADMIN_CREDENTIALS_KEY);
  } catch (error) {
    console.error('Error clearing admin credentials:', error);
  }
}; 