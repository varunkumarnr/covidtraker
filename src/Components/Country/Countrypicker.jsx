import React,{useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import {fetchcountries} from '../../api';
import styles from './Countrypicker.module.css'
const Countrypicker = ({handleCountryChange}) => {
    const [fetchedCountries, setfetchedCountries] = useState([]);
    useEffect(()=> {
        const fetchAPI = async() =>{
            setfetchedCountries(await fetchcountries());
        }
        fetchAPI();
    },[setfetchedCountries]);
    console.log(fetchedCountries);
    return(
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country) => <option key value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
        
    )
}
export default Countrypicker;