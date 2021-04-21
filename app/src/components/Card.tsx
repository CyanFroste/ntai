import * as React from 'react'
import { HiBookOpen, HiHeart } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { capitalize, trunicate } from '../services/common'
import Image from './Image'

interface CardProps {
    item: any
}

const Card = ({ item }: CardProps) => {
    return (
        <Link to={`/doujin/${item.id}`} className="card">
            <Image className="thumbnail" {...item.thumbnail} lazy={true} />
            <section className="summary">
                <div className="id">{item.id}</div>
                <div className="title">{trunicate(item.titles.pretty, 50)}</div>
                <div className="chapters">
                    <HiBookOpen />
                    {item.length}
                </div>
                <div className="favorites">
                    <HiHeart />
                    {item.favorites}
                </div>
                <div className="artist">
                    {capitalize(item.tags.all.find((t: any) => t.type === 'artist')?.name || 'Unknown Artist')}
                </div>
                <div className="language">
                    {item.tags.all
                        .filter((t: any) => t.type === 'language')
                        .map((t: any) => capitalize(t.name))
                        .join(' | ')}
                </div>
            </section>
        </Link>
    )
}

export default Card
