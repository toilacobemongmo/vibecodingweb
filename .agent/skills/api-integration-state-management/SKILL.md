---
name: api-integration-state-management
description: >-
  Use this skill when setting up API clients (Axios, Fetch), integrating REST/GraphQL APIs, configuring TanStack Query (React Query) for data fetching/caching/mutations, or managing global state with Zustand.
---

# API Integration & State Management Skill

This skill provides standardized patterns for building resilient, type-safe API communication and scalable state management.

---

## 1. Type-Safe API Client (`src/lib/api-client.ts`)

```ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request Interceptor: Attach Auth Token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors & Token Refresh
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle session expiry / redirect to login
      localStorage.removeItem("auth_token");
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
    return Promise.reject(error.response?.data || error.message);
  }
);
```

---

## 2. TanStack Query Hook Pattern

### Fetching Data (`useQuery`)
```ts
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { User } from "@/types/user";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  detail: (id: string) => [...userKeys.all, "detail", id] as const,
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => apiClient.get<User>(`/users/${userId}`),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
  });
};
```

### Mutating Data with Optimistic Updates (`useMutation`)
```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { userKeys } from "./useUser";

interface UpdateUserProfileInput {
  userId: string;
  name: string;
}

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, ...payload }: UpdateUserProfileInput) =>
      apiClient.patch(`/users/${userId}`, payload),
    onSuccess: (_, { userId }) => {
      // Invalidate cache to refetch updated data
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
    },
  });
};
```

---

## 3. Global State Management with Zustand (`src/stores/useAuthStore.ts`)

```ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserProfile {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserProfile, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        localStorage.setItem("auth_token", token);
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        localStorage.removeItem("auth_token");
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

---

## 4. Best Practices Checklist
- [ ] Separate Server State (TanStack Query) from Client/UI State (Zustand/URL).
- [ ] Always structure query keys systematically with key factories (`userKeys.all`, `userKeys.detail(id)`).
- [ ] Implement query cancellation and error boundaries for network resilience.
- [ ] Secure sensitive tokens in memory or httpOnly cookies where feasible.
