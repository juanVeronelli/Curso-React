import React, { useState } from "react";
import { Link } from "react-router-dom";
//icons
import TuneIcon from "@mui/icons-material/Tune";

import "./../ItemsListContainer.css";

//dependicies
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ItemsListMain = (props) => {
  const [anchorEl, setAnchorEl] = useState(null); // estado q guarda el elemento html
  const open = Boolean(anchorEl);

  const { category, products } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="main__title">
        <h3 className="items__title"> {category} collection </h3>
        <span className="items__count"> {products.length} products </span>
        <hr />
        {category !== "jewlery" && (
          <>
            <Button className="filter-btn" onClick={handleClick}>
              <TuneIcon />
              <span> Filter </span>
            </Button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
              <MenuItem onClick={handleClose}>
                <Link
                  to={{
                    pathname: `/categoryType/${category}`,
                    search: "?filter=jacket",
                  }}
                  className="menu__link"
                >
                  Jackets
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to={{
                    pathname: `/categoryType/${category}`,
                    search: "?filter=tshirt",
                  }}
                  className="menu__link"
                >
                  T-shirts
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to={{
                    pathname: `/categoryType/${category}`,
                    search: "?filter=pants",
                  }}
                  className="menu__link"
                >
                  Pants
                </Link>
              </MenuItem>
            </Menu>
          </>
        )}
        {category === "jewlery" && (
          <div className="filter-message">
          <span className="nofilter-message">
            In this category it is not possible to apply filters{" "}
          </span>
          </div>
        )}
        <hr />
      </div>
    </>
  );
};

export default ItemsListMain;
