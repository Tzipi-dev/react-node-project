import { useDispatch } from "react-redux"
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice"
import { setAllFounds } from "../redux/slice/foundSlice";

import { useEffect } from "react";


const AllFounds = () => {
  const dispatch = useDispatch()
  const { data: GetAllFoundsQuery, isError, isLoading } = useGetAllFoundsQuery();
  useEffect(() => {
    fetchingData()
    console.log(GetAllFoundsQuery);
  }, [])
  
  const fetchingData = async () => {
    try {
      await dispatch(setAllFounds(GetAllFoundsQuery))
    }
    catch (error) {
      console.error(error)
    }
  }



  return (
    <div>
      {
        isLoading ? (<div>Loading...</div>) :
          isError ? (<div>{isError}</div>) :
            (
              <div>
                {
                  GetAllFoundsQuery?.map(found => (
                    <div key={found._id?.toString()}>
                      <div>{found.name}</div>
                      <div>{found.categiry}</div>
                      <div>{found.city}</div>

                    </div>
                  ))
                }
              </div>
            )

      }


    </div>
  )
}
export default AllFounds