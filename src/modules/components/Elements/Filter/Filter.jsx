import style from './Filter.module.scss'

const Filter = (props) => {

    let alignItems = 'flex-end';
    if(props.align === 'left'){
        alignItems = 'flex-start';
    }
    return (
        <div className={style.frame}
        style={{
            alignItems: alignItems
        }}
        >

            <div className={props.isLong ? style.functionslong : style.functions}
            
            >
            {props.children}
            </div>
        </div>
    )

}

export default Filter