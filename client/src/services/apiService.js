
async function get(url) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function post(url, body) {
    const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

async function handleResponse(response) {
    try {
        const data = await response.json();

        if (!response.ok) {
            const error = data?.error?.message ?? "Response error"
            return Promise.reject(error);
        }

        return data;
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export default {
    get,
    post,
}