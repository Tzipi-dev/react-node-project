import { useDispatch } from "react-redux"
import { useGetAllLostsQuery } from "../redux/api/losts/apiLostSlice"
import { setAllLosts } from "../redux/slice/lostsSlice"
import { useEffect } from "react"

const AllLosts = () => {
  const dispatch = useDispatch()
  const { data: GetAllLostsQuery, isError, isLoading } = useGetAllLostsQuery()

  const fetchingData = async () => {
    try {
      await dispatch(setAllLosts(GetAllLostsQuery))
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    fetchingData();
    console.log(GetAllLostsQuery);
  },[])

  return (

    <div>
      {
        isLoading ? (<div>Loading...</div>) :
          isError ? (<div>{isError}</div>) :
            (
              <div>
                {
                  GetAllLostsQuery?.map(lost => (
                    <div key={lost._id?.toString()}>
                      <div>{lost.name}</div>
                      <div>{lost.categiry}</div>
                      <div>{lost.city}</div>

                    </div>
                  ))
                }
              </div>
            )

      }
    </div>
  )
}

export default AllLosts