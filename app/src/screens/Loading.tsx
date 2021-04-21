interface LoadingProps {
    full?: boolean
}

const loadingScreenText = () => {
    const texts = [
        'Activating Anti-Bonk Force Fields',
        'Gathering Sauce',
        'Shutting down Horni Jails',
        'She said she was 18, Officer',
    ]
    return texts[Math.floor(Math.random() * texts.length)]
}

const Loading = ({ full }: LoadingProps) => {
    return (
        <div className={'loading ' + (full && 'fullscreen')}>
            <span className="text">ntai</span>
            {full && <p className="message">{loadingScreenText()}</p>}
        </div>
    )
}

export default Loading
