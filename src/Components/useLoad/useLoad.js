import {useEffect, useState} from "react";

const useLoad = () => {
    const [isLoad, setLoad] = useState(true);

    useEffect(() => {
        setTimeout(()=>{
            setLoad(false);
        }, 4000)
      
        return() => clearTimeout();
      }, [])
    
    return isLoad;
}

export default useLoad;