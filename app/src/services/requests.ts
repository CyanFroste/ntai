// doujins
export const getDoujins = async (
    keyword: string | null,
    tag: string | number | null,
    page: number | string | null,
    sort: string | null
) => {
    try {
        let url = `/api/doujins?keyword=${keyword || '*'}&page=${page || 1}&sort=${sort}`
        if (tag) url = `/api/doujins/tag/${tag}?page=${page || 1}&sort=${sort}`
        const res = await fetch(url)
        return res.json()
    } catch (err) {
        console.error(err)
    }
}

// doujin
export const getDoujin = async (id: string | number) => {
    try {
        const res = await fetch(`/api/doujin/${id}`)
        return res.json()
    } catch (err) {
        console.error(err)
    }
}

// related doujin
export const getRelatedDoujins = async (id: string | number) => {
    try {
        const res = await fetch(`/api/doujins/related/${id}`)
        return res.json()
    } catch (err) {
        console.error(err)
    }
}

export const getImageData = async (url: string, ext: string | undefined) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url,
                ext,
            }),
        }
        const res = await fetch('/api/image', options)
        return res.json()
    } catch (err) {
        console.error(err)
    }
}
