// search
export const search = async (
	_key: any,
	keyword: string | null,
	page: number | string | null,
	sort: string | null
) => {
	try {
		const res = await fetch(
			`/api/doujins/search?keyword=${keyword || "*"}&page=${
				page || 1
			}&sort=${sort}`
		);
		return res.json();
	} catch (err) {
		console.error(err);
	}
};

// doujin
export const doujin = async (_key: any, id: string | number) => {
	try {
		const res = await fetch(`/api/doujin/${id}`);
		return res.json();
	} catch (err) {
		console.error(err);
	}
};

// doujin by tag
export const searchByTag = async (
	_key: any,
	id: string | number,
	page: number | string | null
) => {
	try {
		const res = await fetch(`/api/doujins/tag/${id}?page=${page || 1}`);
		return res.json();
	} catch (err) {
		console.error(err);
	}
};

// related doujin
export const related = async (_key: any, id: string | number) => {
	try {
		const res = await fetch(`/api/doujins/related/${id}`);
		return res.json();
	} catch (err) {
		console.error(err);
	}
};

export const image = async (_key: any, url: string, ext: string) => {
	try {
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				url,
				ext,
			}),
		};
		const res = await fetch("/api/image", options);
		return res.json();
	} catch (err) {
		console.error(err);
	}
};
