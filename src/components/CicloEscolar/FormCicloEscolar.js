import { Field, FieldArray, FormikProvider, useFormik } from "formik";
import { useState } from "react"
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import * as Yup from "yup";
import SimpleDate from "../DatePicker/SimpleDate";
import AsyncSelect from 'react-select/async';
import { FIELD_REQUIRED } from "../../constants/messages";

export default function FormCicloEscolar(){
    const [fecha, setFecha] = useState()
    const [colegio, setColegio] = useState(null)

    const formik = useFormik({
        initialValues: {
            colegioId: '',
            fechaInicio:'',
            fechaFin: '',
            fechaPagos:[{
                fechaLimite: '',
                interes: ''
            }],
        },
        validationSchema: Yup.object({
            colegioId: Yup.string().required(FIELD_REQUIRED),
            fechaInicio: Yup.string().required(FIELD_REQUIRED),
            fechaFin: Yup.string().required(FIELD_REQUIRED),
            fechaPagos: Yup.array().of(
                Yup.object().shape({
                    fechaLimite: Yup.string().required(FIELD_REQUIRED),
                    interes: Yup.string().required(FIELD_REQUIRED),
                })
            ),  
        }),
        onSubmit: (values) => {
            //validaciones antes de enviarlo
            console.log(values)
           
            //service here
            // try {
            //     async function savePartnerApi() {
            //         let response = await savePartner(values)
            //         if(response.state){
            //             toast.success("Actualizado correctamente");
            //             setReloadPartner(true)
            //             setShowForm(false)
            //         }else{
            //             toast.error(ERROR_SERVER);
            //         }
            //     }
            //     savePartnerApi()
            // }catch(error) {
            //     toast.error(ERROR_SERVER); 
            // }
        }
    })
    const fetchColegiosOptions = async (inputValue) => {  
        if (!inputValue?.length || inputValue.length < 3) return [];       
    };
    const handleChange = value => {
        setColegio(value);
    }

    return(
        <Form
            className="needs-validation"
            id="tooltipForm"
            onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
                return false;
            }}
        >
            <Row>
                <Col xs="12" md="4">
                    <Label htmlFor="razonSocialId" className="mb-0">Colegio</Label>
                    <AsyncSelect 
                        classNamePrefix="select2-selection"
                        placeholder="Buscar"
                        cacheOptions 
                        defaultOptions 
                        loadOptions={fetchColegiosOptions} 
                        value={colegio}
                        onChange={handleChange}
                        isClearable
                    />                   
                </Col>
                <Col xs="12" md="4">
                    <Label className="mb-0">Fecha inicio a Fecha fin</Label>
                    <SimpleDate 
                        date={fecha}
                        setDate={value=>setFecha(value)}
                        options={{
                            mode: "range"
                        }}
                        placeholder="dd-MM-YYYY a dd-MM-YYYY"
                    />
                </Col>                                     
            </Row>
            <Row>
                <Col>
                    <FormikProvider value={formik}>
                    <FieldArray
                        name="fechaPagos"
                        render={arrayHelper=>(
                            <div className="border bg-light p-2 mt-2">
                                {
                                    (formik.values.fechaPagos && formik.values.fechaPagos.length > 0) &&
                                    formik.values.fechaPagos.map((item, index) => (
                                        <div key={index} className="mb-2">
                                            <Row>
                                                <Col xs="12" md="3">
                                                    {index === 0 && <Label className="mb-0">Fecha Límite:</Label>}
                                                    <Field
                                                        className={`form-control ${formik.errors?.fechaPagos?.length > 0 && formik.errors.fechaPagos[index]?.informacionPersonal?.nombre ? 'is-invalid' : ''}`}
                                                        name={`fechaPagos.${index}.fechaLimite`} 
                                                    />
                                                </Col>
                                                <Col xs="12" md="3">
                                                    {index === 0 && <Label className="mb-0">Interés:</Label>}
                                                    <Field
                                                        className={`form-control`}
                                                        name={`fechaPagos.${index}.interes`} 
                                                    />
                                                </Col>  
                                                {index > 0 && 
                                                <Col xs="12" md="1" className="d-flex align-items-center">
                                                    {index===0 && <Label className="mb-0 opacity-0 d-block">O</Label>}
                                                    <Button color="danger" size="sm" onClick={() => arrayHelper.remove(index)}>Eliminar</Button>
                                                </Col>}                                             
                                            </Row>
                                        </div>
                                    ))
                                }
                                <Button type="button" color="link" className="btn btn-link" onClick={() => arrayHelper.push({
                                    fechaPagos: {
                                        fechaLimite: '',
                                        interes: '',
                                    },
                                })}>
                                    <i className="mdi mdi-notebook-plus-outline me-1"></i>
                                    Agregar
                                </Button>
                            </div>
                        )}
                    />
                    </FormikProvider>
                </Col>
            </Row>
            <hr />
                <div className="d-flex justify-content-end">
                    <Button
                        color="success"
                        className="btn btn-success"
                        type="submit"
                    >
                        {
                            formik.values.id ? 'Actualizar' : 'Guardar'
                        }                    
                    </Button>
                    {formik.values.id && <Button
                        color="link"
                        type="button"
                        className="text-danger"
                        onClick={() => {}}  
                    >
                        Cancelar                    
                    </Button>}
                </div>
        </Form>
        
    )
}