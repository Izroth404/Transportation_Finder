import { appParams } from '@/lib/app-params';

const STORAGE_KEYS = {
  users: 'transportation_finder_users',
  passes: 'transportation_finder_passes',
  accessToken: 'transportation_finder_access_token',
  otp: 'transportation_finder_otp'
};

const getStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage;
};

const readJson = (key, fallback = []) => {
  const storage = getStorage();
  if (!storage) return fallback;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  const storage = getStorage();
  if (!storage) return value;
  storage.setItem(key, JSON.stringify(value));
  return value;
};

const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `pass-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getUsers = () => readJson(STORAGE_KEYS.users, {});
const setUsers = (users) => writeJson(STORAGE_KEYS.users, users);

const getOtpMap = () => readJson(STORAGE_KEYS.otp, {});
const setOtpMap = (otpMap) => writeJson(STORAGE_KEYS.otp, otpMap);

const getToken = () => getStorage()?.getItem(STORAGE_KEYS.accessToken) || appParams.token || null;
const setToken = (token) => {
  const storage = getStorage();
  if (!storage) return;
  if (token) {
    storage.setItem(STORAGE_KEYS.accessToken, token);
    storage.setItem('token', token);
    return;
  }
  storage.removeItem(STORAGE_KEYS.accessToken);
  storage.removeItem('token');
};

const normalizeUser = (user) => ({
  id: user.id || generateId(),
  email: user.email,
  role: user.role || 'user',
  createdAt: user.createdAt || new Date().toISOString(),
  ...(user.password ? { password: user.password } : {})
});

const auth = {
  register: async ({ email, password }) => {
    const trimmedEmail = String(email || '').trim().toLowerCase();
    if (!trimmedEmail || !password) {
      throw new Error('Email and password are required.');
    }

    const users = getUsers();
    if (users[trimmedEmail]) {
      throw new Error('An account with this email already exists.');
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const otpMap = getOtpMap();
    otpMap[trimmedEmail] = code;
    setOtpMap(otpMap);

    return { ok: true, email: trimmedEmail, otpCode: code };
  },
  verifyOtp: async ({ email, otpCode }) => {
    const trimmedEmail = String(email || '').trim().toLowerCase();
    const otpMap = getOtpMap();
    const code = otpMap[trimmedEmail];
    if (!code || String(code) !== String(otpCode)) {
      throw new Error('Invalid verification code.');
    }

    const users = getUsers();
    if (!users[trimmedEmail]) {
      users[trimmedEmail] = normalizeUser({
        id: generateId(),
        email: trimmedEmail,
        role: 'user',
        createdAt: new Date().toISOString(),
        password: 'local-user'
      });
      setUsers(users);
    }

    delete otpMap[trimmedEmail];
    setOtpMap(otpMap);

    const token = `local-token-${trimmedEmail}`;
    setToken(token);
    return { access_token: token, user: users[trimmedEmail] };
  },
  resendOtp: async (email) => {
    const trimmedEmail = String(email || '').trim().toLowerCase();
    if (!trimmedEmail) {
      throw new Error('Email is required.');
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const otpMap = getOtpMap();
    otpMap[trimmedEmail] = code;
    setOtpMap(otpMap);
    return { ok: true, otpCode: code };
  },
  loginWithProvider: (provider, returnTo = '/') => {
    setToken(`provider-token-${provider}`);
    window.location.href = returnTo || '/';
  },
  resetPasswordRequest: async (email) => {
    const trimmedEmail = String(email || '').trim().toLowerCase();
    if (!trimmedEmail) {
      throw new Error('Email is required.');
    }
    return { ok: true, email: trimmedEmail };
  },
  resetPassword: async ({ resetToken, newPassword }) => {
    if (!resetToken || !newPassword) {
      throw new Error('Reset token and new password are required.');
    }
    return { ok: true };
  },
  me: async () => {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }

    const users = getUsers();
    const email = Object.keys(users).find((candidate) => candidate && token.includes(candidate));
    if (!email || !users[email]) {
      return { id: 'local-demo-user', email: 'demo@example.com', role: 'user' };
    }

    return users[email];
  },
  logout: (redirect = '/login') => {
    setToken(null);
    if (redirect && typeof window !== 'undefined') {
      window.location.href = redirect;
    }
  },
  setToken,
  getToken
};

const BusPassEntity = {
  create: async (form) => {
    const pass = {
      id: generateId(),
      ...form,
      createdAt: new Date().toISOString()
    };

    const storedPasses = readJson(STORAGE_KEYS.passes, []);
    storedPasses.push(pass);
    writeJson(STORAGE_KEYS.passes, storedPasses);
    return pass;
  },
  get: async (id) => {
    const storedPasses = readJson(STORAGE_KEYS.passes, []);
    return storedPasses.find((pass) => pass.id === id) || null;
  }
};

export const base44 = {
  auth,
  entities: {
    BusPass: BusPassEntity
  }
};

export default base44;
