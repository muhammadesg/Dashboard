import React, { useEffect, useState } from "react";
import axios from "axios";
import './accordion.css'

import AccordionItem from './AccordionItem/AccordionItem'

const Accordion = ({ accordions, lang }) => {

    const [openId, setId] = useState(1)
    
    const clickHandler = (id) => {
        if (id === openId) {
            setId(id)
        } else {
            setId(id)
        }
    }

    return (
        <>
            <ul className='accordion'>
                {accordions.map((faqItem) => (
                    <div key={faqItem.id}>
                        <AccordionItem
                        handler={clickHandler}
                        faq={faqItem}
                        open={openId}
                        lang={lang}
                    />
                    </div>
                ))}
            </ul>
        </>
    )
}

export default Accordion