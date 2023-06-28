import { useEffect, useState } from 'react';

import style from './Navigation.module.css';
import Button from '../../../../Elements/Button/Button';
import { NavLink } from 'react-router-dom';



const Navigation = (props) => {
    //props:
    //actions - array: names of filter button
    //navigate(int) - callback: function for filter
    //initialIndex
    //isColor
    //link = {
    // 'name':'Имя = имени action',
    // 'to'

    // } | null


    // let initial = props.initialIndex

    const active = 'blue';
    let color = 'grey';
    const textColor = 'rgba(244, 72, 72, 1)';

    props.color ? color = 'blue' : color = 'grey'
  
    const [activeIndex, setActiveIndex] = useState(props.initialIndex)


    useEffect(() => {
        if (activeIndex !== props.initialIndex) {
            setActiveIndex(props.initialIndex)
        }

    }, [props.initialIndex])




    const setCurrentFilter = (index) => {
        // if (props.actions.length > 1) {

        if (activeIndex !== index) {
            setActiveIndex(index)
            props.navigate(index);
        }

        // };
    };
    const onButtonClick = (index) => {
        setCurrentFilter(index)
    };


    return (
        <div className={style.wrapper}>

            {props.actions.map((action, index) => {

                let aColor = index === activeIndex ? active : color

                if (props.link && props.link.name === action) {

                    return <NavLink key={`link-${action}-${index}`} to={props.link.to} className={style.action}>
                        <Button
                            name={action}
                            color={aColor}
                            textColor={textColor}
                            border={7}
                            onClick={() => { setCurrentFilter(index) }}
                            disabled={false}
                        />
                    </NavLink>

                } else {
                    return <div key={action} className={style.action}>
                        {<Button
                            name={action}
                            color={aColor}
                            textColor={textColor}
                            border={7}
                            onClick={() => { setCurrentFilter(index) }}
                            disabled={false}
                        />}
                    </div>
                }

            }
            )}



        </div >
    );
};

export default Navigation;