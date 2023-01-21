import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomTextArea } from '../../components/CustomTextArea/CustomTextArea';
import { CustomTextField } from '../../components/CustomTextField/CustomTextField'
import { UploadImg } from '../../components/UploadComponent/Upload'
import './style.scss';

export function AddTicket() {
  const history = useHistory()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [invoice, setInvoice] = useState<string>('')
  const [warranty, setWarranty] = useState<string>('')
  const [details, setDetails] = useState<string>('')
  const [helpTopic, setHelpTopic] = useState<string>('')
  const [warrantyImg, setWarrantyImg] = useState<File|null>(null)
  const [invoiceImg, setInvoiceImg] = useState<File|null>(null)

  const onCancel= () => {
    history.push('/')
  }

  const onSubmit = () => {
    const data = {
      name,
      email,
      phone,
      invoice,
      warranty,
      details,
      helpTopic,
      invoiceImg,
      warrantyImg
    }
    console.log(data)
  }

  const onReset = () => {
    setName('')
    setEmail('')
    setPhone('')
    setInvoice('')
    setWarranty('')
    setDetails('')
    setHelpTopic('')
    setInvoiceImg(null)
    setWarrantyImg(null)
  }

  return (
    <div className="Home AddTicket">
      <div className='Container'>
        <div className='CardHeader'>
          <h2>Rellene el Formulario para abrir un ticket nuevo</h2>
        </div>
        <div className='CardBody'>
            <FormControl
              onSubmit={onSubmit}
              onReset={onReset}
            >
              <div className='fieldRow'>
                <h3>
                    Nombre
                </h3>
                <p>
                    Nombre de la persona de contacto
                    para efectos de la garantia:
                </p>
                <CustomTextField
                    className={"ticketField"}
                    slug={"personName"}
                    type={"text"}
                    value={name}
                    onChange={(val) => setName(val.target.value)}
                />
              </div>
              <div className='fieldRow'>
              <h3>
                    Email
                </h3>
                <p>
                    Email de la persona de contacto
                    para efectos de la garantia:
                </p>
                <CustomTextField 
                    className={"ticketField"}
                    slug={"email"}
                    type={"email"}
                    autoComplete={"off"}
                    value={email}
                    onChange={(val) => setEmail(val.target.value)}
                />
              </div>
              <div className='fieldRow'>
              <h3>
                    Telefono
                </h3>
                <p>
                    Telefono de la persona de contacto
                    para efectos de la garantia:
                </p>
                <CustomTextField 
                    className={"ticketField"}
                    slug={"telefono"}
                    type={"text"}
                    value={phone}
                    onChange={(val) => setPhone(val.target.value)}
                />
              </div>
              <div className='fieldRow'>
                <h3>
                    Tema de Ayuda
                </h3>
                <p>
                    Elija una clasificacion de tipo de Ayuda
                    para que podamos ubicarnos mejor en el problema
                </p>
                <Select
                  labelId="help-topic"
                  value={helpTopic}
                  variant={"standard"}
                  className={"help-topic"}
                  MenuProps={{ disableScrollLock: true }}
                  onChange={(val) => setHelpTopic(val.target.value)}
                >
                  <MenuItem value={"B"}>B</MenuItem>
                  <MenuItem value={"BC"}>BC</MenuItem>
                  <MenuItem value={"BD"}>BD</MenuItem>
                </Select>
              </div>
              <div className='fieldRow'>
                <h3>
                    Nro de factura
                </h3>
                <CustomTextField 
                    className={"ticketField"}
                    slug={"invoiceNumber"}
                    type={"text"}
                    value={invoice}
                    onChange={(val) => setInvoice(val.target.value)}
                />
              </div>
              <div className='fieldRow'>
                <h3>
                    Nro de Garantia
                </h3>
                <CustomTextField 
                    className={"ticketField"}
                    slug={"WarrantyNumber"}
                    type={"text"}
                    value={warranty}
                    onChange={(val) => setWarranty(val.target.value)}
                />
              </div>
              <div className='fieldRow'>
                <h3>
                    Detalle de la falla
                </h3>
                <p>
                    Descubre la falla
                    e indique la cedula, rif y nombre que 
                    aparece en la factura, modelo del producto y 
                    estado del pais donde se encuentra.
                </p>
                <CustomTextArea 
                    slug={"details"}
                    withLabel={false}
                    value={details}
                    onChange={(val) => setDetails(val.target.value)}
                />
              </div>
              <div className='fieldRow'>
                <h3>
                    Factura y Certificado de garantia
                </h3>
                <div className='dropzones'>
                  <UploadImg
                    value={invoiceImg}
                    onChange={(img) => {setInvoiceImg(img)}}
                    fileName={" la Factura"} 
                    id={"factura"} 
                    className={"uploadComponent"}
                  />
                  <UploadImg
                    value={warrantyImg}
                    onChange={(img) => {setWarrantyImg(img)}}
                    fileName={" la Garantia"} 
                    id={"garantia"} 
                    className={"uploadComponent"}
                  />
                </div>
              </div>
              <div className='buttonRows'>
                <button onClick={onSubmit} className='themedButton'>
                    Enviar Ticket
                </button>
                <button onClick={onReset} type="reset" className='themedButton'>
                    Restablecer
                </button>
                <button onClick={onCancel} type="button" className='themedButton'>
                    Cancelar
                </button>
              </div>
            </FormControl>
        </div>
      </div>
    </div>
  );
}
