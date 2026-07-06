import { Box, Image, Text, Button } from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import moment from 'moment'
import React from 'react'
import { useBasket } from '../../contexts/BasketContext' 
function Card({ item }) {
    const {addToBasket,items}=useBasket();
    const findBasketItem=items.find((basket_item) => basket_item._id === item._id);
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
      
<Link to={`/product/${item._id}`}>
      <Image src={item.photos[0]} alt="Product" loading='lazy' />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
    {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
    </Box>

    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" >
      {item.title}
    </Box>

    <Box>
        ${item.price}
    </Box>
    </Box>
      </Link>
<Button colorScheme={findBasketItem ? "pink" : "green"} variant="solid" onClick={()=>addToBasket(item,findBasketItem)}>
  {findBasketItem ? "Remove from cart" : "Add to cart"}
</Button>
      </Box>
   
  )

 
}

export default Card
