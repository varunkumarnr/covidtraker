import React,{useState,useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line,Bar} from 'react-chartjs-2';
import styles from './Charts.module.css';
const Charts = ({data:{confirmed, recovered, deaths},country }) => {
    const [DailyData , setDailyData] = useState([]);
    useEffect(() => {
        const fetchAPI = async() => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);
    const lineChart =(
        DailyData[0]
        ?(
        <Line 
        data = {{
            labels:DailyData.map(({date})=>date),
            datasets: [{
                data: DailyData.map(({confirmed})=>confirmed),
                label:'Infected',
                borderColor:'#3333ff',
                fill:true,

            }, {
                
                data: DailyData.map(({deaths})=>deaths),
                label:'Deaths',
                borderColor:'red',
                backgroundColor:'rgba(255,0,0,0.5)',
                fill:true,
            }],
        }}
        />):null
    );
    const barChart = (
        confirmed
        ?(
            <Bar 
            data ={{
                labels:['infected','Recovered','Deaths'],
                datasets: [{
                    label:'people',
                     backgroundColor: ['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
                     data:[confirmed.value,recovered.value,deaths.value]
                }]

            }}
            options={{
                legend:{display:false},
                title:{display: true,text:`current state in ${country}`}
            }}
            />
        ):null
    );
    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}
export default Charts;