export const group = (tags: any[]) => {
	const grouped: { [key: string]: any } = { list: [] };
	for (const tag of tags) {
		if (!grouped.hasOwnProperty(tag.type)) {
			grouped[tag.type] = [];
			grouped.list.push(tag.type);
		}
		grouped[tag.type].push(tag);
	}
	grouped.list.sort((a: string, b: string) => a.localeCompare(b));
	return grouped;
};

export const capitalize = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};
