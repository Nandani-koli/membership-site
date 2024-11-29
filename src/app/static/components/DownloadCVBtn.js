'use client'

// import style from '../page.module.css'
import style from '../../page.module.css'

import { useRouter } from "next/navigation"

export const DownloadCVBtn = () => {
    const router = useRouter();

    return (
        <>
         <button className={style.btn}  onClick={()=> {router.push("https://drive.google.com/file/d/1ceOdty7A6MzzL9ShFWKImAaEI3JemjvL/view?usp=sharing")}}>Download CV </button>
        </>
    )
}