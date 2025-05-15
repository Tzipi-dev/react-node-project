import { useDispatch } from "react-redux";
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice";
import { setAllFounds } from "../redux/slice/foundSlice";
import { useEffect, useState } from "react";
import Typography from '@mui/joy/Typography';
import { Link } from "react-router";
import { foundTitle, items, mainContentStyle } from "../components/CSS-components";
import { Box, Chip, Button, MenuItem, Menu, Modal } from "@mui/material";
import { FaMapMarkedAlt, FaShoppingBag } from "react-icons/fa";
import {
  cateforyBtn,
  containerOfFound,
  filterContainer,
  frameToCategoryBtn,
  resetByn
} from "./CSS-pages";
import { Category } from "../interfaces/models";
import FoundsMap from "./FoundsMap";
const AllFounds = () => {
  const dispatch = useDispatch();
  const { data: GetAllFoundsQuery, isError, isLoading } = useGetAllFoundsQuery();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchingData();
    console.log(GetAllFoundsQuery);
  }, []);
  const fetchingData = async () => {
    try {
      await dispatch(setAllFounds(GetAllFoundsQuery));
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    console.log(category);
    handleClose();
  };
  const resetHandling = () => {
    setSelectedCategory(null);
  };
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [openM, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose2 = () => setOpen(false);
  return (
    <div style={mainContentStyle}>
     
      <Button onClick={handleOpen}> Google Map הצג מציאות באמצעות </Button>
      <Modal
        open={openM}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FoundsMap/>
        </Box>
      </Modal>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>{isError}</div>
      ) : (
        <>
          <div style={filterContainer}>
            <div style={frameToCategoryBtn}>
              <Button onClick={handleClick} style={cateforyBtn}>
                {selectedCategory || "בחר קטגוריה"}
              </Button>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {Object.values(Category)
                  .filter((val) => isNaN(Number(val)))
                  .map((category) => (
                    <MenuItem key={category} onClick={() => handleSelectCategory(category)}>
                      {category}
                    </MenuItem>
                  ))}
              </Menu>



            </div>

            <Button sx={resetByn} onClick={resetHandling}>
              אפס סינון
            </Button>
          </div>

          {selectedCategory == null ? (
            <div style={containerOfFound}>
              {GetAllFoundsQuery?.map((found) => (
                <div key={found._id?.toString()}>
                  <Link to={`/Founds/${found._id?.toString()}`}>
                    <Box sx={items}>
                      <Chip label="Found" size="small" sx={foundTitle} />
                      <Typography mt={1} mb={1}>{found.name}</Typography>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{found.city}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{found.category}</Typography>
                      </Box>
                    </Box>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div style={containerOfFound}>
              {GetAllFoundsQuery
                ?.filter((found) => found.category === selectedCategory)
                .map((found) => (
                  <div key={found._id?.toString()}>
                    <Link to={`/Founds/${found._id?.toString()}`}>
                      <Box sx={items}>
                        <Chip label="Found" size="small" sx={foundTitle} />
                        <Typography mt={1} mb={1}>{found.name}</Typography>
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                          <Typography>{found.city}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                          <Typography>{found.category}</Typography>
                        </Box>
                      </Box>
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllFounds;
