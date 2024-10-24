import { Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {fi} from 'date-fns/locale'
import {differenceInHours, differenceInMinutes, isFuture} from 'date-fns'



interface Props{
    tehtavat : Tehtava[]
    minuutit : number
    paivitaMinuutit : (Minuutit : any, Tunnit : any) => void
    setTehtavat : (arg0 : Tehtava[]) => void;
}

interface Homma extends Tehtava{}

const UusiJuttu : React.FC<Props> = ({tehtavat, paivitaMinuutit, setTehtavat}) : React.ReactElement => {

    const [pvmAika, setPvmAika] = useState<Date>(new Date());
    const [pvmAika2, setPvmAika2] = useState<Date>(new Date());

    const navigate : NavigateFunction = useNavigate();

    const uusiTehtavaRef : React.MutableRefObject<HTMLInputElement | undefined> = useRef<HTMLInputElement>();

    const lisaaTehtava = (e : React.FormEvent) : void => {
        e.preventDefault();

        let apuTehtava : Tehtava = {
            nimi : uusiTehtavaRef.current!.value || "Nimetön",
            aloitus : pvmAika,
            lopetus : pvmAika2,
            tehty : false,
        }

        let hommat : Homma = {};
    
        if (!laji.current.nimi){
          hommat = {...hommat, nimi : "Anna lisää infoa"}
        }
        if (isFuture(pvmAika) || isFuture(pvmAika2)){
            hommat = {...hommat, aika1 : "Tarkista aika"}
        }
        if (Object.entries(hommat).length > 0){
            setVirheIlmoitukset({...hommat});
        }else{
            paivitaMinuutit(differenceInMinutes(pvmAika2, pvmAika) - differenceInHours(pvmAika2, pvmAika) * 60, differenceInHours(pvmAika2, pvmAika))
            setTehtavat([...tehtavat, apuTehtava])
            navigate("/")
        }
    }

    const syoteKasittelija = (e : React.ChangeEvent<HTMLInputElement>) : void =>{
        laji.current[e.target.name] = e.target.value;
      }

    const laji : Tehtava = useRef<Tehtava>({})
    const [virheIlmoitukset, setVirheIlmoitukset] = useState<Homma>({});

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
        <Typography variant="h3" sx={{textAlign : "center", margin : "10px"}}>Lisää uusi tehtävä</Typography>
        <Box sx={{display : "flex", flexDirection : "column", alignItems : "center"}}>
           
            <TextField sx={{width : "75%", margin : "10px"}}
                inputRef={uusiTehtavaRef}
                name="nimi"
                placeholder="Laji..."
                onChange={syoteKasittelija}
                error={Boolean(virheIlmoitukset.nimi)}
                helperText={virheIlmoitukset.nimi}
            ></TextField>

            <DateTimePicker sx={{width : "75%", margin : "10px"}}
                label="Aloitus aika"
                disableFuture
                slotProps={{textField:{helperText:'Varmista, että aika ei ole tulevaisuudessa'}}}
                value={pvmAika}
                onChange={(uusiPvm : Date | null) => setPvmAika(uusiPvm!)}
                //renderInput={(params : any) => <TextField {...params}/>}
            />

            <DateTimePicker sx={{width : "75%", margin : "10px"}}
                label="Lopetus aika"
                disableFuture
                slotProps={{textField:{helperText:'Varmista, että aika ei ole tulevaisuudessa'}}}
                value={pvmAika2}
                onChange={(uusiPvm : Date | null) => setPvmAika2(uusiPvm!)}
            />

            <Button sx={{margin : "10px", width : "50%", padding : "10px"}}
            variant="contained"
            onClick={lisaaTehtava}
            >Lisää</Button>

            <Button sx={{width : "50%", padding : "10px"}}
            variant="contained"
            component={Link}
            to="/"
            >Peruuta</Button>
            
        </Box>
      </LocalizationProvider>
    );
  }
  
  export default UusiJuttu;
  