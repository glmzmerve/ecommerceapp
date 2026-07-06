import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../../api';
import {Box, Text, Image, Button} from '@chakra-ui/react'
import React from 'react'
import { useBasket } from '../../contexts/BasketContext';
import { useState } from 'react';
import moment from 'moment';
import LightGallery from "lightgallery/react";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

function ProductDetail() {
    const [selected, setSelected] = useState(0);
    const { product_id } = useParams();
const {addToBasket,items}=useBasket();
    const { data, isPending, error } = useQuery({
        queryKey: ['product', product_id],
        queryFn: () => fetchProduct(product_id),
    });

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error occurred</div>;
const findBasketItem=items.find((item) =>item._id === product_id);

   const images = (data?.photos ?? []).map((url) => ({
  original: url,
  thumbnail: url,
}));





    return (
    <div>
            <Button colorScheme={findBasketItem ? "pink" : "green"} 
            onClick={() => addToBasket(data,findBasketItem)}>
                { findBasketItem ? 'Remove from cart' : 'Add to cart'}
            </Button>
            <Text as="h2" fontSize="2xl" >
                {data?.title}
            </Text>
            <Text>{moment(data?.createdAt).format('MMMM Do YYYY')}</Text>

            <p>{data?.description}</p>
            

            <LightGallery
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
        >
            {data?.photos?.map((photo, index) => (
                <a href={photo} key={index}>
                    <img
                        src={photo}
                        alt={`product-${index}`}
                        style={{
                            width: "250px",
                            marginRight: "10px",
                            cursor: "pointer",
                        }}
                    />
                </a>
            ))}
        </LightGallery>


    </div>
  )
}

export default ProductDetail
