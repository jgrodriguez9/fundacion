import classNames from "classnames";
import { useEffect } from "react";
import { useState } from "react";
import { Card, CardBody, Collapse } from "reactstrap";

export default function CardBasic({title, children, openAccordion=false, setOpenAccordion}){
    const [accordionSearch, setAccordionSearch] = useState(openAccordion);

    useEffect(() => {
        if(openAccordion){
            setAccordionSearch(openAccordion)
            setOpenAccordion(false)
        }        
    },[openAccordion])

    return (
        <Card>
            <CardBody className="p-0">
                <div className="accordion">
                    <div className="accordion-item">
                        {title && 
                        <h2 className="accordion-header">
                            <button
                            className={classNames(
                                "accordion-button",
                                "fw-medium",
                                { collapsed: !accordionSearch }
                            )}
                            type="button"
                            onClick={()=>setAccordionSearch(!accordionSearch)}
                            style={{ cursor: "pointer" }}
                            >
                            {title}
                            </button>
                        </h2>}

                        <Collapse isOpen={accordionSearch} className="accordion-collapse">
                            <div className="accordion-body">
                                {children}
                            </div>
                        </Collapse>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}