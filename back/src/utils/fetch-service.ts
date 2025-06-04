const request = async <T = unknown>(url: string, method: string): Promise<T> => {
  const headers = { 'Content-Type': 'application/json' };

  const response = await fetch(url, { method, headers });

  if (!response.ok) {
    const errorText = await response.json().catch(() => 'Unknown error');
    throw new Error(`Error ${response.status}: ${errorText.message || errorText}`);
  }

  return response.json();
};

export const apiService = {
  get: <T = unknown>(url: string): Promise<T> => request<T>(url, 'GET'),
};
