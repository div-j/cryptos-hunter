import React, { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import { CoinList } from "../config/api";
import {
  Container,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useNavigate } from "react-router-dom";
import { numberWithComma } from "./Carousel";
import axios from 'axios'

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    fontFamily: "montserrat",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();
  const classes = useStyles();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  async function fetchCoins() {
    setLoading(true);
    try {
      // let response = await fetch(CoinList(currency));
      // const data = await response.json();
      let {data} = await axios.get(CoinList(currency)) 
      setCoins(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  //testing
  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "montserrat" }}
        >
          Crytocurrency price by market cap
        </Typography>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          label="Search for crypto currency ..."
          variant="outlined"
          style={{ width: "100%", marginBottom: 18 }}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "montsarret",
                    }}
                    key={head}
                    align={head === "coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => {
                          navigate(`/coins/${row.id}`);
                        }}
                        className={classes.row}
                        key={row.name}
                        //   align='right'
                      >
                        <TableCell
                          component={"th"}
                          scope="row"
                          style={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={row.image}
                            alt={row?.name}
                            height={50}
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            className={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: "22",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <div style={{ color: "darkgrey" }}>
                              {row.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {numberWithComma(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h}%
                        </TableCell>
                        <TableCell align="right">
                          {numberWithComma(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          classes={{ ul: classes.pagination }}
          style={{
            padding: 20,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_,value)=>{setPage(value)
        window.scroll(0,450)

          }
        }
        />
      </Container>
    </ThemeProvider>
  );
}
