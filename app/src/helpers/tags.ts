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

export const shortenCount = (count: number) => {
  const numLen = count.toString().length;
  if (numLen > 3 && numLen < 7) {
    return (count / 1000).toFixed(2) + "k";
  } else if (numLen > 6 && numLen < 10) {
    return (count / 1000000).toFixed(2) + "m";
  } else return count;
};

export const capitalize = (text: string) => {
	return text.charAt(0).toUpperCase() + text.slice(1);
};
