import React, { Suspense } from 'react';
import SearchCatalog from "@/component/Landing/ProductSearch"


const Searching = ()=>{
    return(
       <Suspense fallback={<div className="p-10 text-center">Loading search...</div>}>
            <SearchCatalog/>
       </Suspense>
    )
}

export default Searching