import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component, ClassAttributes } from "react";
import './index.css';

const formattedSeconds = (sec: number): string =>
    Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2);

interface StopwatchProps extends ClassAttributes<Stopwatch> {
    initialSeconds: number;
}

interface StopwatchState {
    secondsElapsed: number,
    lastClearedIncrementer: number | undefined,
    laps: number []
}
class Stopwatch extends Component<StopwatchProps, StopwatchState> {
    incrementer: number | undefined
    constructor(props: StopwatchProps) {
        super(props);
        this.state = {
            secondsElapsed: props.initialSeconds,
            lastClearedIncrementer: undefined,
            laps: []
        }
        //
        // bind event handlers
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleStopClick = this.handleStopClick.bind(this);
        this.handleLabClick = this.handleLabClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    handleStartClick(): void {
        this.incrementer = window.setInterval(() =>
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1,
            }), 1000);
    }
    handleStopClick(): void {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer,
        });
    }
    handleResetClick(): void {
        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0,
            laps: []
        });
    }
    handleLabClick(): void {
        const { laps, secondsElapsed } = this.state;
        const newLaps = laps.concat([secondsElapsed])
        this.setState({
            laps: newLaps
        });
    }
    handleDeleteClick(index: number): void {
        const newLaps = this.state.laps.concat();
        newLaps.splice(index, 1);
        this.setState({
            laps: newLaps
        });
    }
    componentWillUnmount(): void {
        clearInterval(this.incrementer);
    }
    render(): React.ReactNode  {
        const {
            secondsElapsed, lastClearedIncrementer, laps
        } = this.state;
        return (
            <div className="stopwatch">
                <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
                {(secondsElapsed === 0 || this.incrementer === lastClearedIncrementer
                        ? <button type="button" className="start-btn"
                                  onClick={this.handleStartClick}>start</button>
                        : <button type="button" className="stop-btn"
                                  onClick={this.handleStopClick}>stop</button>
                )}
                {(secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer
                        ? <button type="button" className="lap-btn" onClick={this.handleLabClick}>lap</button>
                        : null
                )}
                {(secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer
                        ? <button type="button" className="reset-btn" onClick={this.handleResetClick}>reset</button>
                        : null
                )}
                <ul className="stopwatch-laps">
                    { laps && laps.map((lap: number, i: number) =>
                        <Lap key={i} index={i+1} lap={lap} onDelete={this.handleDeleteClick} />) }
                </ul>
            </div>
        );
    }
}

type LapProps = {
    index: number,
    lap: number,
    onDelete: (index: number) => void
}

const Lap: React.FC<LapProps> = ({ index, lap, onDelete }: LapProps) => (
    <li className="stopwatch-lap">
        <strong>{index}</strong>/ {formattedSeconds(lap)} <button
        onClick={() => onDelete(index - 1)} > X </button>
    </li>
);

ReactDOM.render(
    <Stopwatch initialSeconds={0} />,
    document.getElementById("content"),
);

