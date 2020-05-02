// useEffect = hook
import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';


const Chart = () => {
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        console.log(dailyData);
        fetchAPI();
    });

    // Constants for 2 charts:
    // const barChart;
    const lineChart = (
        dailyData.length
            ? (
                <Line
                data={{
                    // map returns an array of all the dates
                    labels: dailyData.map(({ date }) => date),
                    // most important part are the datasets
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }],
                }}
            />) : null
    );
    
    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Chart;