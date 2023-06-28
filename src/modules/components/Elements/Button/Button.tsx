import style from './Button.module.scss'


export type ColorType = 'white' | 'blue' | 'grey'
export type DisabledType = boolean

type ButtonType = {
    color: ColorType
    border: 3 | 12 | 16 | 18
    name: string
    disabled?: boolean
    onClick: (() => void) | undefined
    onSubmit?: (() => void) | undefined
}
export enum ButtonColorsEnum {
    blue = 'blue',
    grey = 'grey',
    white = 'white'
}
const Button: React.FC<ButtonType> = (props) => {
    let background = 'white'
    let color = 'black'
    if (props.color === ButtonColorsEnum.grey) {
        background = 'rgb(244, 244, 244)'
    } else if (props.color === ButtonColorsEnum.blue) {
        background = 'rgb(83, 125, 240)'
        color = 'white'
    }
    
    return (
        <button
            style={{
                borderRadius: props.border,
                backgroundColor: background,
                color: color
            }}
            type='submit'
            name={'whiteButton'}
            onClick={props.onClick}
            onSubmit={props.onSubmit}
            disabled={props.disabled}
            className={style.button} >
            <p
                className={style.button__name}>
                {props.name}
            </p>
        </button>
    )
}

export default Button