const BASE_URL = "https://665f0fce1e9017dc16f2a728.mockapi.io/api";

/**
 * 
 * @param {RequestInfo} url 
 * @param {RequestInit} opts 
 */

export const fetchApi = (url, opts) => {
    // fetch: Là hàm để gọi api mặc định của trình duyệt.
    return fetch(`${BASE_URL}/${url}`, {
      ...opts,
      headers: {
        "content-type": "application/json",
        ...opts.headers,
      },
    });
};