export const localStorage = window.localStorage;

export const setToken = (value) => {
    const localStorage = window.localStorage;
    const now = new Date();
    const TTL = 43200000; // default TTL = 12 hours = 43 200 000 milliseconds

	const item = {
		value: value,
		expiry: now.getTime() + TTL,
	};
	localStorage.setItem("token", JSON.stringify(item));
}

export const setRefreshToken = (value) => {
    const localStorage = window.localStorage;

	const item = {
		value: value,
	};
	
	localStorage.setItem("refresh-token", JSON.stringify(item));
}

export const getRefreshTokenFromLocalStorage = () => {
    const localStorage = window.localStorage;
    const itemStr = localStorage.getItem("refresh-token");

	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr);

	return item.value;
}

export const getTokenFromLocalStorage = () => {
    const localStorage = window.localStorage;
    const itemStr = localStorage.getItem("token");

	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	
	if (now.getTime() > item.expiry) {
		localStorage.removeItem("token");
		return null;
	};

	return item.value;
}
