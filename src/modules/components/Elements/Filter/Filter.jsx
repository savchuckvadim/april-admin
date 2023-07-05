import style from './Filter.module.scss'

const Filter = ({align = false, name, isLong=false, color='', children}) => {

    let alignItems = 'flex-end';
    let bckgrndcolor = 'white'

    if(align === 'left'){
        alignItems = 'flex-start';
    }
    if(color != '' && color != false ){
        bckgrndcolor = color
    }
    return (
        <div className={style.frame}
        style={{
            backgroundColor: bckgrndcolor,
            alignItems: alignItems
        }}
        >

            <div className={isLong ? style.functionslong : style.functions}
            
            >
            {children}
            </div>
        </div>
    )

}

export default Filter