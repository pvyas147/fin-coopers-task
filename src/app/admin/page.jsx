"use client";
import {getItemLocalStorage} from "../../Utils/browserServices"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Admin = () => {
    const token = getItemLocalStorage("admin_token")
    const router = useRouter()
    useEffect(() => {
        if (!token) router.push("/admin/login")
        else router.push("/admin/dashboard")
    }, [])

    return (
        <></>
    )

}

export default Admin