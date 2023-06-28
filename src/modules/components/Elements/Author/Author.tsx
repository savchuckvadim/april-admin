import style from './Author.module.scss'
import Moment from 'react-moment'
import Avatar from '../Avatar/Avatar'
import { UserType } from '../../../types/types'


type PropsType = {
    // userId: number
    size: number
    author: UserType
    date: string

}
const Author: React.FC<PropsType> = (props) => {

    // let profile = props.author.profile
    let profile = props.author

    let link = `../../profile/${props.author.id}`

    let fontSize = 14
    let iconSize = 48
    let dateLineHeight = '22px'
    if (props.size === 56) {
        fontSize = 16
        iconSize = 56
        dateLineHeight = '24px'

    }

    return (

        <div className={style.user__wrapper}>
            <div className={style.icon__wrapper}
                style={{
                    width: iconSize,
                    height: iconSize
                }}
            >

                <Avatar
                    size={iconSize}
                    link={link}
                    user={props.author}


                />
            </div>

            <div className={style.user__info}>
                <p className={style.name}
                    style={{
                        fontSize: fontSize
                    }}
                >
                    {profile.name + ' ' + profile.name}
                </p>
                <p className={style.date}
                    style={{
                        lineHeight: dateLineHeight
                    }}
                > {<Moment fromNow >{props.date}</Moment>}</p>
            </div>

        </div>
    )
}

export default Author