import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { useQuery } from 'react-query'
import Error from '../screens/Error'
import Loading from '../screens/Loading'
import { getImageData } from '../services/requests'

interface ImageProps {
    url: string
    height?: string | number
    width?: string | number
    extension?: string
    lazy?: boolean
    className?: string
    feedbackSrc?: Function
}
const Image = ({ url, height, width, extension, lazy, className, feedbackSrc }: ImageProps) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '0px 0px 1200px 0px',
    })

    // react query
    const { data, status } = useQuery(['results', url, extension], () => getImageData(url, extension), {
        enabled: lazy ? inView : true,
    })

    React.useEffect(() => {
        // send back the retrieved url to the parent
        if (feedbackSrc && status === 'success' && data) feedbackSrc(data.src)
    })

    return (
        <div ref={ref} id="image" className={className}>
            {status === 'loading' && <Loading />}
            {status === 'error' && <Error />}
            {status === 'success' &&
                data &&
                (data.src ? <img height={height} width={width} src={data.src} alt="" /> : <Error />)}
        </div>
    )
}
export default Image
