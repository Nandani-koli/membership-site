'use client'

// import style from '../page.module.css'
import style from '../../page.module.css'

import { useRouter } from "next/navigation"

export const DownloadCVBtn = () => {
    const router = useRouter();

    return (
        <>
         <button className={style.btn}  onClick={()=> {router.push("https://drive.google.com/file/d/1nxn1qVIQ0d2Xe-SJzFvRG_z-HSkdGvVG/view?usp=sharing")}}>Download CV </button>
        </>
    )
}