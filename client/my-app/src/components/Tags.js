import React from 'react'

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {flavourOptions} from './dummy'

const animatedComponents = makeAnimated();
const Tags = (props) => {
    const tages=(e)=>{
        console.log(e)
    }
    return (
        <div>
            <Select
                isMulti
                name="colors"
                options={flavourOptions}
                closeMenuOnSelect={false}
                components={animatedComponents}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={tages}
                tages={props.play}
            />
        </div>

    )

}

export default Tags