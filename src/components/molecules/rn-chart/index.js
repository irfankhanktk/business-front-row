import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import colors from '../../../services/colors';
import { mvs, width } from '../../../services/metrices';

const RNChart = ({
    style,
    children
}) => {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };

    return (
        <LineChart
            data={{
                labels: ["1", "5", "10", "15", "20", "25", '30'],
                datasets: [
                    {
                        data: [
                            0,
                            400,
                            0,
                            500,
                            0,
                            200,
                        ],
                        color: (opacity = 1) => `${colors.primary}`, // optional
                        strokeWidth: 3 // optional
                    }
                ]
            }}
            width={width} // from react-native
            height={mvs(225)}
            withVerticalLines={false}
            withDots={false}
            yAxisLabel="AED "
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: '#444',
                backgroundGradientFrom: colors.white,
                backgroundGradientTo: colors.white,
                // backgroundGradientFromOpacity: 0,
                // backgroundGradientToOpacity: 0.5,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(254, 164, 9,100)`,
                labelColor: (opacity = 1) => `rgba(131, 147, 165,${opacity})`,

            }}
            bezier
            style={{
                marginVertical: 8,
                // borderRadius: 16,
                // backgroundColor:'blue'
            }}
        />
    );
};
export default RNChart;