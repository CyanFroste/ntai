import axios from 'axios'

export const base64Encode = async (url: string, ext: string) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    return {
        src: `data:image/${ext};base64,${Buffer.from(response.data).toString(
            'base64'
        )}`,
    }
}
