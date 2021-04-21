import * as React from 'react'
import { useQuery } from 'react-query'
import Card from '../components/Card'
import Controller from '../components/Controller'
import Paginator from '../components/Paginator'
import { useQueryParams } from '../hooks/query'
import Screen from '../layouts/Screen'
import { getDoujins } from '../services/requests'
import Error from './Error'
import Loading from './Loading'

const Doujins = () => {
    // query params
    const [keyword, tag, page, sort, tagName] = useQueryParams('k', 't', 'p', 's', 'tn')

    const { data, status } = useQuery(['doujins', keyword, tag, page, sort], () => getDoujins(keyword, tag, page, sort))

    return (
        <Screen title="ntai | doujins">
            {status === 'loading' && <Loading full={true} />}
            {status === 'error' && <Error full={true} />}
            {status === 'success' && data && (
                <main className="doujins">
                    <Controller page={page} sort={sort} keyword={keyword} tag={tag} tagName={tagName} />
                    <section className="view">
                        {data.doujins.map((item: any) => (
                            <Card key={item.id} item={item} />
                        ))}
                    </section>
                    <Paginator
                        page={page}
                        sort={sort}
                        keyword={keyword}
                        tag={tag}
                        tagName={tagName}
                        total={data.numPages}
                    />
                </main>
            )}
        </Screen>
    )
}

export default Doujins
