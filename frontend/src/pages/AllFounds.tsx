import { useDispatch } from "react-redux"
import { useGetAllFoundsQuery } from "../redux/api/apiFoundSlice"
import { setAllFounds } from "../redux/slice/foundSlice";

import { useEffect } from "react";
import Card from '@mui/joy/Card';

import AspectRatio from '@mui/joy/AspectRatio';

import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import ButtomNav from "../components/ButtomNav";


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
    <>
    
    <div>
      {
        isLoading ? (<div>Loading...</div>) :
          isError ? (<div>{isError}</div>) :
            (
              <div>
                {
                  GetAllFoundsQuery?.map(found => (
                    <Card orientation="horizontal" variant="outlined" sx={{ width: 900, alignItems: "center" ,marginBottom:"2%"}}>
                      <CardOverflow>
                        <AspectRatio ratio="1" sx={{ width: 125 }}>
                          <img
                            src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
                            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                            loading="lazy"
                            alt=""
                          />
                        </AspectRatio>
                      </CardOverflow>
                      <CardContent>
                        <Typography textColor="success.plainColor" sx={{ fontWeight: 'md' }}>
                                {found.name}
                        </Typography>
                        <Typography level="body-sm">{found.city}</Typography>
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
                        found
                      </CardOverflow>
                    </Card>
                  ))
                }
              </div>
            )

      }


    </div>
    <ButtomNav/>
    </>

  )
}
export default AllFounds