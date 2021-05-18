import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export function UserPhotos({ user }) {

    const [isImgsOpen, setIsImgsOpen] = useState(false)
    const [imgs, setImgs] = useState(null)

    useEffect(() => {
        const imgsMat = user.posts.map(post => post.imgs)
        const allImgs = []
        imgsMat.map(arr => arr.map(img => allImgs.push(img)))
        setImgs(allImgs)

    }, [])

    return (
        <div>
            <button onClick={() => setIsImgsOpen(!isImgsOpen)}>{isImgsOpen ? 'close' : 'open'}</button>
            {imgs?.length > 0 &&
                <div className={isImgsOpen ? 'imgs-preview open' : 'imgs-preview close'} >
                    {imgs && imgs.map((img, idx) => {
                        return (
                            <img src={img} key={idx} />
                        )
                    })
                    }
                </div>}
        </div>
    )
}