import React from "react"
import style  from "./ListRooms.module.scss"

const ListRooms = (props: any) => {
    return (
        <div className={style.container}>
            <div className={style.list}>
                {
                    props.listRooms.map( (el: any) => {
                        return props.renderRoom 
                            ? props.renderRoom(el) 
                            : <div>{el}</div>
                        })
                }
            </div>
    </div>
    )
}

export default ListRooms