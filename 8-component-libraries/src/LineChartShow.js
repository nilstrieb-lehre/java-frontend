import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import data from "./data.json";
import {Col} from "react-bootstrap";

const LineChartShow = () =>
    (<>
        <h1>Charts</h1>
        <Col>
            <h2>Line Chart</h2>
            <LineChart
                width={500}
                height={300}
                data={data.line}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="xValue"/>
                <Line type="monotone" dataKey="yValue"/>
            </LineChart>
        </Col>
    </>)

export default LineChartShow;