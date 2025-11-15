const DEFAULT_API_BASE_URL = "http://localhost:8000/api";

const normalizedBase = (() => {
  const raw = import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;
  return raw.replace(/\/+$/, "");
})();

const apiOrigin = normalizedBase.replace(/\/api$/, "");

export const API_BASE_URL = normalizedBase;

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const buildEndpointUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export async function fetchFromApi<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const mergedInit: RequestInit = {
    ...init,
    signal: init?.signal ?? controller.signal,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  };

  const response = await fetch(buildEndpointUrl(path), mergedInit);

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    // Ignore JSON parse errors; handle below.
  }

  if (!response.ok) {
    const errorMessage =
      (typeof payload === "object" &&
        payload !== null &&
        "message" in payload &&
        typeof (payload as { message: unknown }).message === "string"
        ? (payload as { message: string }).message
        : `Request to ${path} failed with status ${response.status}`) ?? "Request failed";
    throw new Error(errorMessage);
  }

  return payload as T;
}

export const buildAssetUrl = (assetPath?: string | null) => {
  if (!assetPath) {
    return "";
  }

  if (/^https?:\/\//i.test(assetPath)) {
    return assetPath;
  }

  const cleanedPath = assetPath.replace(/^\/+/, "");
  const withStoragePrefix = cleanedPath.startsWith("storage/") ? cleanedPath : `storage/${cleanedPath}`;

  return `${apiOrigin}/${withStoragePrefix}`;
};



