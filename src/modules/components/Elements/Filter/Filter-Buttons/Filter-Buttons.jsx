import { useEffect, useState } from 'react';

import style from './Filter-Buttons.module.css';
import Button from '../../../Elements/Button/Button';
import { NavLink } from 'react-router-dom';



const FilterButtons = (props) => {
    //props:
    //actions - array: names of filter button
    //filter(int) - callback: function for filter
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
    const [one, setOneColor] = useState(color);
    const [two, setTwoColor] = useState(color);
    const [three, setThreeColor] = useState(color);



    let colors = [one, two, three];

    let actions = props.actions.map((action, index) => {
        if (props.actions.length === 1) {
            return { 'name': action, 'color': active }
        }
        return { 'name': action, 'color': colors[index] }

    });

    // if (initial + 1 === 1) {
    //     setOneColor(active);
    //     setTwoColor(color);
    //     setThreeColor(color);
    // } else if (initial + 1 === 2) {
    //     setOneColor(color);
    //     setTwoColor(active);
    //     setThreeColor(color);
    // } else if (initial + 1 === 3) {
    //     setOneColor(color);
    //     setTwoColor(color);
    //     setThreeColor(active);
    // }
    const setCurrentFilter = (index) => {
        if (props.actions.length > 1) {
            if (index + 1 === 1) {
                setOneColor(active);
                setTwoColor(color);
                setThreeColor(color);
            } else if (index + 1 === 2) {
                setOneColor(color);
                setTwoColor(active);
                setThreeColor(color);
            } else if (index + 1 === 3) {
                setOneColor(color);
                setTwoColor(color);
                setThreeColor(active);
            }

            props.filter(index);
        };
    };
    const onButtonClick = (index) => {
        setCurrentFilter(index)
    };


    useEffect(() => {
        if (typeof props.initialIndex === 'number' && !isNaN(props.initialIndex)) {
            setCurrentFilter(props.initialIndex)
        }

    }, [])

    return (
        <div className={style.wrapper}>

            {actions.map((action, index) => {

                if (props.link && props.link.name === action.name) {

                    return <NavLink key={`link-${action.name}-${index}`} to={props.link.to} className={style.action}>
                        <Button
                            name={action.name}
                            color={action.color}
                            textColor={textColor}
                            border={7}
                            onClick={() => { onButtonClick(index) }}
                            disabled={false}
                        />
                    </NavLink>
                        
                } else {
        return <div key={action.name} className={style.action}>
            {<Button
                name={action.name}
                color={action.color}
                textColor={textColor}
                border={7}
                onClick={() => { onButtonClick(index) }}
                disabled={false}
            />}
        </div>
                }

            }
            )}



        </div >
    );
};

export default FilterButtons;