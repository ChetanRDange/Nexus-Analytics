const API_BASE_URL =
  import.meta.env.VITE_API_URL ;

export default async function apiFetch(
  endpoint,
  method = "GET",
  body = null,
  options = {},
  token = localStorage.getItem("authtoken")
) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  const isFormData = body instanceof FormData;

  const headers = {
    ...(!isFormData && { 'Content-Type': 'application/json' }), // Only set JSON content type if not FormData
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options,
  };
  if (isFormData) {
    delete headers['Content-Type'];
  }

  const config = {
    method,
    headers,
    signal: controller.signal,
    ...(body && { 
      body: isFormData ? body : JSON.stringify(body) 
    }),
  };

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/admin${endpoint}`,
      config
    );
    clearTimeout(timeoutId);

    const contentType = response.headers.get("Content-Type");
    const data = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      switch (response.status) {
        case 401:
          window.location.href = "/";
          break;

        default:
          throw new Error(data.message || "Something went wrong!");
          break;
      }
    }
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error("API Fetch Error:", error);
    throw { message: error.message, status: error.status || "Network Error" };
  }
}
