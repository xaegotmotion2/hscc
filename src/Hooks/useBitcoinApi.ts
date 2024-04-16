interface Bitcoin {
    chartName: string,
    bpi: bpi,
    USD: USD,
    GBP: GBP,
    EUR: EUR,
    rate: number
}

export default function useBitcoinApi(): Promise<Bitcoin> {
    return fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json() as Promise<Bitcoin>;
        })
        .catch(error => {
            console.error("Error fetching Bitcoin data:", error);
            throw error;
        });
}