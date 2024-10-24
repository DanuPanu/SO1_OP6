import { Box, Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {differenceInMinutes} from 'date-fns'
import {differenceInHours} from 'date-fns'

interface Props{
    tehtavat : Tehtava[],
    tunnit : any
    minuutit : any
    setTehtavat : (arg0 : Tehtava[]) => void;
}

const Aloitus : React.FC<Props> = ({tehtavat, tunnit, minuutit, setTehtavat}) : React.ReactElement => {

    return (
      <>
        <Typography variant="h3" sx={{textAlign : "center"}}>Liikuntapäiväkirja</Typography>
        <Box>
            <List>
                {tehtavat.map( (tehtava : Tehtava, idx : number) => {
                    return (
                        <ListItem key={idx}>
                            <ListItemText primary={tehtava.nimi} secondary={<Typography>{differenceInHours(tehtava.lopetus!, tehtava.aloitus!)} tuntia ja 
                            {differenceInMinutes(tehtava.lopetus!, tehtava.aloitus!) - differenceInHours(tehtava.lopetus!, tehtava.aloitus!) * 60} minuuttia</Typography>}/>
                        </ListItem>
                    )
                    })}
            </List>

            <Typography variant="h6" sx={{textAlign : "center"}}
            >Aktiivista aikaa yhteensä {tunnit} tuntia ja {minuutit} minuuttia</Typography>

            <Button sx={{padding : "10px", width : "100%"}}
                variant="contained"
                component={Link}
                to="/uusijuttu"
            >Lisää tehtävä</Button>
        </Box>
      </>
    );
  }
  
  export default Aloitus;
  