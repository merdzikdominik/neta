import React, { useEffect } from "react"


const AdminModule: React.FC = () => {

    useEffect(() => {

        const { cookie } = document

        console.log(cookie)
    }, [])

    return <>Admin Module</>
}

export default AdminModule