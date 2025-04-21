import { useDispatch } from "react-redux"
import { useGetAllLostsQuery } from "../redux/api/losts/apiLostSlice"
import { setAllLosts } from "../redux/slice/lostsSlice"
import { useEffect } from "react"
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
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
                       <Card orientation="horizontal" variant="outlined" sx={{ width: 260 }}>
                <CardOverflow>
                  <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                      src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                      srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography component="div" textColor="success.plainColor" sx={{ fontWeight: 'md' }}>
                    <div>{lost.name}</div>
                    <div>{lost.city}</div>
                  </Typography>
                  <Typography level="body-sm">{lost.categiry}</Typography>
                </CardContent>
                <CardOverflow
                  variant="soft"
                  color="primary"
                  sx={{
                    px: 0.2,
                    writingMode: 'vertical-rl',
                    justifyContent: 'center',
                    fontSize: 'xs',
                    fontWeight: 'xl',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  Lost
                </CardOverflow>
              </Card>

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