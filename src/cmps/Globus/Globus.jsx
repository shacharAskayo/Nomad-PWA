import { useEffect, useRef } from "react"
import planeImg from '../../assets/imgs/plane.png'
import { canvasService } from "./canvasService";


export function Globus({location}) {
    const canvas = useRef()
    const plane = useRef()


    useEffect(() => {
        canvasService.setCanvas(canvas.current,plane.current,location)
    }, [])
    return (
        <div className="globus-container " style={{justifySelf:'center'}}>
            <div className="row">
                <div className="col-md-12" id="globeParent">
                    <canvas ref={canvas} width="370px" height="370px"></canvas>
                        <div style={{ display: "none" }}>
                        <img ref={plane} src={planeImg} alt="" />
                    </div>

                </div>

            </div>

        </div>

    )
}