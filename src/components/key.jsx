import clsx from "clsx"
export default function Key(props){
    
    return(
        <button className={clsx('alph',)} onClick={()=>{props.oncl(props.letter)}}>{props.letter}</button>
    )
}