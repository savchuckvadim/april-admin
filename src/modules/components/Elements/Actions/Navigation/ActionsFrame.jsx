import style from './ActionsFrame.module.scss'

const ActionsFrame = (props) => {

    // props.align
    // props.color

    let alignItems = 'flex-end';
    let backgroundColor = ''
    if(props.align === 'left'){
        alignItems = 'flex-start';
        
    }

    if(props.color){
        backgroundColor = props.color
    }
    return (
        <div className={style.frame}
        style={{
           
            backgroundColor
        }}
        >

            <div className={props.isLong ? style.functionslong : style.functions}
            style={{
            justifyContent:alignItems,
            backgroundColor
        }}
            >
            {props.children}
            </div>
        </div>
    )

}

export default ActionsFrame