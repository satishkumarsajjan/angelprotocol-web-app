import Loader from "components/Loader/Loader";
import React, { FC } from "react";
import {
  Legend,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useGetHistoricPrices from "./useGetHistoricPrices";
import {
  getPriceGraphData,
  getPriceTicks,
  tickDateFormatter,
  tickPriceFormatter,
} from "./utils";

type LegendLabelProps = {
  explanation?: string;
};

const LegendLabel: FC<LegendLabelProps> = ({ explanation, children }) => {
  return (
    <span className="text-black font-medium">
      {children}
      {!!explanation && (
        <span className="text-gray-500 text-sm ml-1">{explanation}</span>
      )}
    </span>
  );
};

const legendFormatter = (value: string, _: any, index: number) => {
  return (
    <LegendLabel explanation={index === 1 ? "(without new buyers)" : undefined}>
      {value}
    </LegendLabel>
  );
};

export default function PriceGraph() {
  const { auctionDates, isLoading, predictedPriceData, tokenSaleData } =
    useGetHistoricPrices();

  const priceGraphCombinedData = getPriceGraphData(
    tokenSaleData.priceData,
    predictedPriceData
  );
  const priceTicks = getPriceTicks(priceGraphCombinedData);

  const dateAxisDomain = [
    auctionDates[0],
    auctionDates[auctionDates.length - 1] + 2e7,
  ];

  const priceAxisDomain = [0, priceTicks[priceTicks.length - 1]];

  return (
    <>
      {isLoading && (
        <Loader
          gapClass="gap-4"
          widthClass="w-4"
          bgColorClass="bg-angel-grey"
        />
      )}
      {!isLoading && (
        <ResponsiveContainer
          width="90%"
          aspect={2}
          className="flex justify-center content-center m-5"
        >
          <LineChart
            width={500}
            height={400}
            margin={{ top: 50, left: 70 }}
            data={priceGraphCombinedData}
          >
            <Tooltip />
            <XAxis
              tickLine={false}
              tickFormatter={tickDateFormatter}
              dataKey="date"
              allowDuplicatedCategory={false}
              type="number"
              ticks={auctionDates}
              domain={dateAxisDomain}
              dy={15}
              height={60}
            />
            <YAxis
              axisLine={false}
              type="number"
              ticks={priceTicks}
              domain={priceAxisDomain}
              dx={-15}
              tickFormatter={tickPriceFormatter}
            />
            <Line
              type="monotone"
              strokeWidth={3}
              dataKey="price"
              stroke="#901ef2"
              name={`${tokenSaleData.tokenName} price`}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="predictedPrice"
              stroke="#ffa6f7"
              dot={false}
              name={`${tokenSaleData.tokenName} predicted price`}
              isAnimationActive={false}
            />
            {predictedPriceData && predictedPriceData[0] && (
              <ReferenceDot
                r={4}
                x={predictedPriceData[0].date}
                y={predictedPriceData[0].price}
                stroke="#901ef2"
              />
            )}
            <Legend iconType="circle" formatter={legendFormatter} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
