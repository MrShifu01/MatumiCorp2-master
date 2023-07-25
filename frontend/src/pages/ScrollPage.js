import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

const posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
    { id: 4, title: 'Post 4' },
    { id: 5, title: 'Post 5' },
    { id: 6, title: 'Post 6' },
]

// Mock Fetch
const fetchPost = async (page) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return posts.slice((page - 1) * 2, page * 2)
}

const ScrollPage = () => {
    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['query'],
        async ({ pageParam = 1 }) => {
            const response = await fetchPost(pageParam)
            return response
        },
        {
            getNextPageParam: (_, pages) => {
                return pages.length + 1
            },
            initialData: {
                pages: [posts.slice(0,2)],
                pageParams: [1],
            },

        }
    )


       



  return (
    <div>
        Posts:
        {data?.pages.map((page, i) => (
            <div key={i}>
                {page.map((post) => (
                    <div key={post.id}>{post.title}</div>
                ))}
            </div>
        ))}
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage
                ? 'Loading more...'
                : (data?.pages.length ?? 0) < 3
                ? 'Load More'
                : 'Nothing more to load'}
        </button>
    </div>
  )
}

export default ScrollPage