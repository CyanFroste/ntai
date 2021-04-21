interface ErrorProps {
    full?: boolean
    message?: string
}

const Error = ({ full, message = 'Something went wrong' }: ErrorProps) => {
    return (
        <div className={'error ' + (full && 'fullscreen')}>
            <span className="text">error</span>
            {full && <p className="message">{message}</p>}
        </div>
    )
}

export default Error
