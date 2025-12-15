//========== Login Types ===========
export interface loginFormValues {
  email: string;
  password: string;
}

//========== Auth Context Types ===========
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

//========== API Response Types ===========
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
