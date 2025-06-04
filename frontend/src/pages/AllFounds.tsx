import { useDispatch } from "react-redux";
import { useGetAllFoundsQuery } from "../redux/api/founds/apiFoundSlice";
import { setAllFounds } from "../redux/slice/foundSlice";
import { useEffect, useState } from "react";

import { Link } from "react-router";
import {  mainContentStyle } from "../components/CSS-components";
import { Box,  Button, MenuItem, Menu, Modal, CircularProgress } from "@mui/material";

import {
  badgeStyle,
  cardStyle,
  cateforyBtn,
  containerOfFound,
  filterContainer,
  frameToCategoryBtn,
  iconStyle,
  resetByn,
  textRowStyle,
  titleStyle
} from "./CSS-pages";
import { MdLocationOn, MdLock } from "react-icons/md";
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
      <Button onClick={handleOpen}> הצג מציאות באמצעות מפה</Button>
      <Modal
        open={openM}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FoundsMap />
        </Box>
      </Modal>
      {isLoading ? (
        <CircularProgress color="error" />
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
                      {category.replace(/_/g, " ")}
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
                    <div style={cardStyle}>
                      <div style={badgeStyle}>Found</div>
                      <div style={titleStyle}>{found.name}</div>

                      <div style={textRowStyle}>
                        <MdLocationOn style={iconStyle} />
                        <span>{found.city}</span>
                      </div>

                      <div style={textRowStyle}>
                        <MdLock style={iconStyle} />
                        <span>{found.category.replace(/_/g, " ")}</span>
                      </div>
                    </div>
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
                      <div style={cardStyle}>
                        <div style={badgeStyle}>Found</div>
                        <div style={titleStyle}>{found.name}</div>

                        <div style={textRowStyle}>
                          <MdLocationOn style={iconStyle} />
                          <span>{found.city}</span>
                        </div>

                        <div style={textRowStyle}>
                          <MdLock style={iconStyle} />
                          <p>{found.category.replace(/_/g, " ")}</p>
                        </div>
                      </div>
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
