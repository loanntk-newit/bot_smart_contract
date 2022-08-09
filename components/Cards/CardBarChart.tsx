import React from 'react'
import Chart from 'chart.js/auto'

export default function CardBarChart() {
  React.useEffect(() => {
    let config: any = {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: '#ed64a6',
            borderColor: '#ed64a6',
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: '#4c51bf',
            borderColor: '#4c51bf',
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Orders Chart',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: 'rgba(0,0,0,.4)',
          },
          align: 'end',
          position: 'bottom',
        },
      },
    }
    const barChartEl: any = document.getElementById('bar-chart')
    if (barChartEl) {
      let ctx = barChartEl.getContext('2d')
      new Chart(ctx, config)
    }
  }, [])
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-slate-400 mb-1 text-xs font-semibold">Performance</h6>
              <h2 className="text-slate-700 text-xl font-semibold">Total orders</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  )
}
