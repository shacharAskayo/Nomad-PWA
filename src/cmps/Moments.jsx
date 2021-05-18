import { Moment } from "./Moment";

export function Moments({ moments }) {
    return (
        <div className="moments-container">
            {moments?.map(moment => <Moment key={Math.random(20000)} moment={moment} />)}
        </div>
    )
}