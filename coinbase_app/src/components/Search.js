import React from 'react'

function Search({search, setSearch}) {

    const handleChangeSearch = event => {
        setSearch((event.target.value + "").toUpperCase());
    }

    return (
        <input placeholder='Search' value={search} onChange={handleChangeSearch}/>
    )
}

export default Search;