import React, { useEffect, useState } from "react";
import useBitcoinApi from "../Hooks/useBitcoinApi";

export default function BitCoin() {
    const [chartName, setChartName] = useState<string | undefined>(undefined);
    const [USDRate, setUSDRate] =useState<string | undefined>(undefined);
    const [GBPRate, setGBPRate] = useState<string | undefined>(undefined);
    const [EURRate, setEURRate] = useState<string | undefined>(undefined);

    useEffect(() => {
        useBitcoinApi()
            .then(data => {
                setChartName(data.chartName);
                setUSDRate(data.bpi.USD.rate);
                setGBPRate(data.bpi.GBP.rate);
                setEURRate(data.bpi.EUR.rate);
            })
            .catch(error => {
                // Handle the error (e.g., show an error message)
                console.error("Error in BitCoin component:", error);
            });
    }, []);

    return (
        <div>
            <p>Chart Name: {chartName}</p>
            <div>
                <div className = "stockRate"><p>USD rate: {USDRate}</p></div>
                <div className = "stockRate"><p>GBP rate: {GBPRate}</p></div>
                <div className = "stockRate"><p>EUR rate: {EURRate}</p></div>
            </div>
            <div className = "barGraph">
                <span className="barUSD" style={{ height:`${USDRate}px`}}>
                {USDRate}
                </span>
                <span className="barGBP" style={{ height:`${GBPRate}px`}}>
                {GBPRate}
                </span>
                <span className="barEUR" style={{ height:`${EURRate}px`}}>
                {EURRate}
                </span>
            </div>
        </div>
        
    );
}