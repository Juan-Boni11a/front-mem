import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Modal,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { tableCellClasses } from "@mui/material/TableCell";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const HeaderLogo = styled("img")(({ theme }) => ({
  maxHeight: "5vh",
  textAlign: "center",
  [theme.breakpoints.only("xs")]: {
    maxHeight: "7vh",
  },
}));

export const HeaderTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.only("xs")]: {
    fontSize: 10,
  },
  [theme.breakpoints.only("sm")]: {
    fontSize: 16,
  },
  [theme.breakpoints.only("md")]: {
    fontSize: 12,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: 20,
  },
}));

export const ButtonStyled = styled(Button)(({ theme }) => ({
  "&:disabled": {
    color: theme.palette.primary.main,
    background: theme.palette.background.grey,
  },
  borderRadius: "50px",
  color: theme.palette.buttons.contrastText,
  "&:hover": {
    background: theme.palette.buttons.light,
  },
}));

export const ChangePasswordStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.buttons.contrastText,
  "&:hover": {
    color: theme.palette.buttons.light,
  },
}));

export const TitleStyled = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "1.7rem",
  padding: "0 1em",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.3rem",
  },
}));
export const SubtitleStyled = styled(Typography)(() => ({
  fontSize: "1.2rem",
  fontWeight: 600,
  padding: "0 1em",
}));
export const ParragraphStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  padding: "0 1em",
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
}));

export const BoxForParragraphStyled = styled(Box)(({ theme }) => ({
  fontWeight: 900,
  padding: "0 1em",
  margin: "1vh 0",
  boxShadow: "2px 2px 10px rgba(5,5,5,0.3)",
  borderRadius: "5px",
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
}));

export const ParragraphWithBoxStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  minHeight: "1rem",
  padding: "0 1em",
  margin: "1vh 0",
  boxShadow: "2px 2px 10px rgba(5,5,5,0.3)",
  borderRadius: "5px",
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
}));

export const TextStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  color: theme.palette.text.primary,
  padding: "0 1em",
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.9rem",
  },
}));
export const ListElementStyled = styled("li")(({ theme }) => ({
  color: theme.palette.buttons.light,
  fontSize: "0.8rem",
  [theme.breakpoints.only("xs")]: {
    fontSize: "0.7rem",
  },
}));

export const InputLabelColorStyled = styled(InputLabel)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));
export const InputLabelGreyStyled = styled(InputLabel)(({ theme }) => ({
  color: "#1b365d",
  fontWeight: 900,
}));

export const ModalHelperContainer = styled(Modal)(({ theme }) => ({
  margin: "10vh 0 ",
  height: "max-content",
  maxHeight: "80vh",
  overflowY: "auto",
}));

export const ModalContainer = styled(Modal)(({ theme }) => ({
  margin: "5vh 0 ",
  height: "90vh",
  maxHeight: "90vh",
}));

export const ModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "2rem",
  borderRadius: "10px",
  height: "3rem",
  margin: "auto",
  maxWidth: "90%",
  [theme.breakpoints.down("md")]: {
    maxWidth: "80%",
  },
}));

export const ModalInputBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "1rem",
  borderRadius: "10px",
  height: "100%",
  margin: "auto",
  [theme.breakpoints.down("lg")]: {
    maxWidth: "80%",
  },
  [theme.breakpoints.only("lg")]: {
    maxWidth: "50%",
  },
  [theme.breakpoints.only("xl")]: {
    maxWidth: "50%",
  },
}));
export const ModalTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: "1.5rem",
  fontWeight: 200,
  padding: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.2rem",
  },
}));

export const ModalTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.workspace,
  borderRadius: "5px",
  margin: "1rem",
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
  [theme.breakpoints.up("md")]: {
    width: "70%",
  },
}));

export const ModalDateTextfield = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.workspace,
  borderRadius: "5px",
  margin: "1rem",
  width: "33%",
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
  [theme.breakpoints.up("md")]: {
    width: "33%",
  },
}));

export const ModalFormControl = styled(FormControl)(({ theme }) => ({
  backgroundColor: theme.palette.background.workspace,
  borderRadius: "5px",
  margin: "1rem",
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
  [theme.breakpoints.up("md")]: {
    width: "70%",
  },
}));
export const ModalGridContainer = styled(Grid)(({ theme }) => ({
  width: "75%",
  alignItems: "center",
  margin: "1rem 12.5%",
  [theme.breakpoints.down("md")]: {
    margin: "1rem 0",
    width: "100%",
  },
}));
export const CheckboxContainer = styled(FormControl)(({ theme }) => ({
  margin: "1rem 0",
  padding: "2rem 0",
  height: "1rem",
  width: "75%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.grey,
    color: theme.palette.text.primary,
  },
  backgroundColor: theme.palette.background.workspace,
  color: theme.palette.text.grey,
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:nth-of-type(odd)": {
  },
  backgroundColor: theme.palette.background.default,
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const Input = styled("input")({
  display: "none",
});
