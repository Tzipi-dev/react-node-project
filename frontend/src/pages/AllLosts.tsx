import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import Typography from '@mui/joy/Typography';
import { Link } from "react-router";
import {   items, lostTitle, mainContentStyle } from "../components/CSS-components";
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
import { useGetAllLostsQuery } from "../redux/api/losts/apiLostSlice";
import { setAllLosts } from "../redux/slice/lostsSlice";
import LostsMap from "./LostsMap";

const AllLosts = () => {
  const dispatch = useDispatch();
  const { data: GetAllLostsQuery, isError, isLoading } = useGetAllLostsQuery();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchingData();
    console.log(GetAllLostsQuery);
  }, []);

  const fetchingData = async () => {
    try {
      await dispatch(setAllLosts(GetAllLostsQuery));
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
          <LostsMap/>
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
              {GetAllLostsQuery?.map((lost) => (
                <div key={lost._id?.toString()}>
                  <Link to={`/Losts/${lost._id?.toString()}`}>
                    <Box sx={items}>
                      <Chip label="Lost" size="small" sx={lostTitle} />
                      <Typography mt={1} mb={1}>{lost.name}</Typography>
                      <Box display="flex" alignItems="center" mb={0.5}>
                        <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{lost.city}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                        <Typography>{lost.category}</Typography>
                      </Box>
                    </Box>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div style={containerOfFound}>
              {GetAllLostsQuery
                ?.filter((lost) => lost.category === selectedCategory)
                .map((lost) => (
                  <div key={lost._id?.toString()}>
                    <Link to={`/Losts/${lost._id?.toString()}`}>
                      <Box sx={items}>
                        <Chip label="Lost" size="small" sx={lostTitle} />
                        <Typography mt={1} mb={1}>{lost.name}</Typography>
                        <Box display="flex" alignItems="center" mb={0.5}>
                          <FaMapMarkedAlt style={{ marginRight: 8, color: 'grey' }} />
                          <Typography>{lost.city}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <FaShoppingBag style={{ marginRight: 8, color: 'grey' }} />
                          <Typography>{lost.category}</Typography>
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

export default AllLosts;
