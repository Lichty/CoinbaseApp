import React from 'react'

function Products({currencies, products, search}) {

    const style = {
        border:'1px solid black'
    }

    return (
        <>
        {products.map(
            (products) => 
                (
                    (search===null 
                    || products.search_key.includes(search)
                ) 
                && products.trading_disabled===false 
                && products.quote_currency!=='EUR')?
                    (
                        <div style={style}>
                            <p key={products.id}>{products.display_name}</p>
                        </div>
                    )
                :
                    null)
        }
        </>
    )
}

export default Products;