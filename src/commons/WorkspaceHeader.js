import React from "react";

import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { SubtitleStyled } from "../utils/StyledComponents";

function WorkspaceHeader(props) {
  const { title, showSearch, searchFilter, setSearchFilter, onSearch } = props;
  return (
    <Grid container>
      <Grid item xs={12} sx={{ marginBottom: "1rem" }}>
        <SubtitleStyled sx={{ textAlign: "left" }}>
          {title.toUpperCase()}
        </SubtitleStyled>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "right" }}>
        {showSearch ? (
          <Paper
            component="form"
            sx={{
              width: { xs: "70%", md: "50%" },
              border: "solid",
              borderRadius: "500px",
              display: "flex",
              float: "right",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar"
              label="Buscar"
              value={searchFilter}
              onChange={(e) => {
                setSearchFilter(e.target.value);
              }}
            />

            <IconButton
              onClick={
                onSearch
                  ? () => {
                      onSearch();
                    }
                  : () => {}
              }
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default WorkspaceHeader;
