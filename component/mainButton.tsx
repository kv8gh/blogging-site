"use client"
import actions from "@/libs/utils/actions"
export default function MainButton(){
    return (
        <button onClick={actions} className="p-2 bg-yellow-500">
            Click Me!!
        </button>
    )
}