import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useHistory, useLocation } from 'react-router-dom'

interface PaginatorProps {
    page: string | null
    sort: string | null
    keyword: string | null
    tag: string | null
    tagName: string | null
    total: string | number
}

const Paginator = ({ page, sort, keyword, tag, tagName, total }: PaginatorProps) => {
    const history = useHistory()
    const location = useLocation()

    // ! refactor
    const path = (num: string | number) => {
        const { pathname } = location
        let url = pathname + '?p=' + num
        if (keyword) url += '&k=' + keyword
        if (tag) url += '&t=' + tag + '&tn=' + tagName
        if (sort) url += '&s=' + sort
        return url
    }

    const gotoPage = (pg: number) => history.push(path(pg))

    const changePage = (type: string | number) => {
        const currentPage = parseInt(page || '1')
        if (type === 'prev' && currentPage !== 1) return gotoPage(currentPage - 1)
        if (type === 'next') return gotoPage(currentPage + 1)
    }

    return (
        <div className="paginator">
            <nav>
                <button className="prev" onClick={() => changePage('prev')}>
                    <HiChevronLeft />
                </button>
                <div className="page">
                    {page || 1} of {total}
                </div>
                <button className="next" onClick={() => changePage('next')}>
                    <HiChevronRight />
                </button>
            </nav>
        </div>
    )
}

export default Paginator
