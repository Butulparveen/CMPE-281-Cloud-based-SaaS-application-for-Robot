import React, { Component } from 'react'

class LineChart extends Component {
    getMinX() {
        console.log("aaaaaa", this.props);
        const { data } = this.props
        const only_x = data.map(obj => obj.x)
        const min_x = Math.min.apply(null, only_x)
        return min_x
    }
    getMinY() {
        const { data } = this.props
        const only_y = data.map(obj => obj.y)
        const min_y = Math.min.apply(null, only_y)
        return min_y
    }
    getMaxX() {
        const { data } = this.props
        const only_x = data.map(obj => obj.x)
        const max_x = Math.max.apply(null, only_x)
        return max_x
    }
    getMaxY() {
        const { data } = this.props
        const only_y = data.map(obj => obj.y)
        const max_y = Math.max.apply(null, only_y)
        return max_y
    }
    getSvgX(x) {
        const { svgWidth } = this.props
        return (x / this.getMaxX()) * svgWidth
    }
    getSvgY(y) {
        const { svgHeight } = this.props
        return svgHeight - (y / this.getMaxY()) * svgHeight
    }

    makePath() {
        console.log("aa", this.props)
        const { data, color } = this.props
        let pathD = ` M  ${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)} `

        pathD += data.map((point, i) => {
            return `L ${this.getSvgX(point.x)} ${this.getSvgY(point.y)}  `
        })

        return (
            <path className="linechart_path" d={pathD} style={{ stroke: color }} />
        )
    }
    makeAxis() {
        const minX = this.getMinX()
        const maxX = this.getMaxX()
        const minY = this.getMinY()
        const maxY = this.getMaxY()
        console.log("aaaccc", minX, maxX, minY, maxY)
        return (
            <g className="linechart_axis">
                <line
                    x1={this.getSvgX(minX)}
                    y1={this.getSvgY(minY)}
                    x2={this.getSvgX(maxX)}
                    y2={this.getSvgY(minY)}
                />
                <line
                    x1={this.getSvgX(minX)}
                    y1={this.getSvgY(minY)}
                    x2={this.getSvgX(minX)}
                    y2={this.getSvgY(maxY)}
                />
            </g>
        )
    }
    render() {
        const { svgHeight, svgWidth } = this.props

        return (
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {this.makePath()}
                {this.makeAxis()}
            </svg>
        )
    }
}
LineChart.defaultProps = {
    data: [],
    color: '#ff4500',
    svgHeight: 500,
    svgWidth: 500,
}
export default LineChart