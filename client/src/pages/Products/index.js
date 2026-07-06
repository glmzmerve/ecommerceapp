import { Grid,Box, Flex, Button } from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'
import React from 'react'
import Card from '../../components/Card'
import { fetchProductList } from '../../api'

function Products() {
  const { data,error,fetchNextPage,hasNextPage,isFetchingNextPage,status} = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => fetchProductList({ pageParam }),
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12
      if (!morePagesExist) return undefined
      return allGroups.length
    },
  })

  if (status === 'pending') return <div>Loading...</div>
  if (status === 'error') return <div>Error: {error.message}</div>

  const items = data?.pages?.flat() ?? []

  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
       
{data?.pages?.map((group, i) => (
  <React.Fragment key={i}>
    {group.map((item) => (
        <Box w="100%" key={item._id}>
      <Card key={item.id} item={item} />
      </Box>
    ))}
  </React.Fragment>
))}
      </Grid>


      <Flex mt="10" justifyContent="center">

        <button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
      </Flex>
      
      </div>
   
  )
}

export default Products
