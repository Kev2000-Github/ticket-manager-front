import { MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CustomTextArea } from '../../components/CustomTextArea/CustomTextArea';
import { CustomTextField } from '../../components/CustomTextField/CustomTextField'
import { UploadImg } from '../../components/UploadComponent/Upload'
import { Navbar } from '../../components/Navbar/Navbar'
import Swal from 'sweetalert2'
import './style.scss';
import { getBase64, sendRequest } from '../../utils';
import { config } from '../../config';

interface helpTopic {
  id: number,
  name: string
}

export function AddTicket() {
  const history = useHistory()
  const [helpTopics, setHelpTopics] = useState<Array<helpTopic>>([])
  const [subject, setSubject] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [invoice, setInvoice] = useState<string>('')
  const [warranty, setWarranty] = useState<string>('')
  const [details, setDetails] = useState<string>('')
  const [helpTopic, setHelpTopic] = useState<string>('')
  const [warrantyImg, setWarrantyImg] = useState<File|null>(null)
  const [invoiceImg, setInvoiceImg] = useState<File|null>(null)

  useEffect(() => {
    getHelpTopic()
  }, [])

  const getHelpTopic = async () => {
    const link = `${config.BACK_URL}/helptopic`
    const helptopics = await sendRequest.GET(link)
    setHelpTopics(helptopics)
  }

  const onCancel= () => {
    history.push('/')
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!invoiceImg || !warrantyImg){
      const messageInvoice = invoiceImg? "":"se require imagen de la <b>Factura</b>"
      const messageWarranty = warrantyImg? "":"se requiere imagen de la <b>Garantia</b>"
      const message = [messageInvoice, messageWarranty].join('<br>')
      Swal.fire({
        icon: 'info',
        html: message,
        showCloseButton: true,
        showConfirmButton: true
      })
      return
    }
    const data = {
      subject,
      customer_name: name,
      customer_email: email,
      customer_phone_number: phone,
      invoice_number: invoice,
      warranty_number: warranty,
      detail: details,
      invoice_image: invoiceImg ? await getBase64(invoiceImg): null,
      warranty_certificate: warrantyImg ? await getBase64(warrantyImg): null,
      help_topic_id: helpTopic,
      department_id: 1,
      created_by_id: 1
    }
    Swal.fire({
      title: "Generando Ticket...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading(null)
        const link = `${config.BACK_URL}/ticket`
        await sendRequest.POST(link, data)
        Swal.fire({
          title: "Ticket Creado!",
          icon: 'success',
          showConfirmButton: true,
          timer: 2000,
          didClose: () => {
            clearData()
          }
        })
      }
    })
  }

  const clearData = () => {
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

  const onReset = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    clearData()
  }

  return (
    <div className='AddTicketBody'>
      <Navbar/>
      <div className="Home AddTicket">
        <div className='Container'>
          <div className='CardHeader'>
            <h2>Rellene el Formulario para abrir un ticket nuevo</h2>
          </div>
          <div className='CardBody'>
              <form
                onSubmit={onSubmit}
                onReset={onReset}
              >
                <div className='fieldRow'>
                  <h3>
                      Asunto
                  </h3>
                  <p>
                      Asunto del ticket:
                  </p>
                  <CustomTextField
                      required
                      className={"ticketField"}
                      slug={"subject"}
                      type={"text"}
                      value={subject}
                      onChange={(val) => setSubject(val.target.value)}
                  />
                </div>
                <div className='fieldRow'>
                  <h3>
                      Nombre
                  </h3>
                  <p>
                      Nombre de la persona de contacto
                      para efectos de la garantia:
                  </p>
                  <CustomTextField
                      required
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
                      required
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
                      required
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
                    required
                    labelId="help-topic"
                    value={helpTopic}
                    variant={"standard"}
                    className={"help-topic"}
                    MenuProps={{ disableScrollLock: true }}
                    onChange={(val) => setHelpTopic(val.target.value)}
                  >
                    {
                      helpTopics.map((currentHelp: helpTopic) => {
                        return (
                          <MenuItem
                            key={currentHelp.id}
                            value={currentHelp.id}
                          >
                            {currentHelp.name}
                          </MenuItem>
                        )
                      })
                    }
                  </Select>
                </div>
                <div className='fieldRow'>
                  <h3>
                      Nro de factura
                  </h3>
                  <CustomTextField
                      required 
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
                      required
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
                      required 
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
                  <button type='submit' className='themedButton'>
                      Enviar Ticket
                  </button>
                  <button type="reset" className='themedButton'>
                      Restablecer
                  </button>
                  <button onClick={onCancel} type="button" className='themedButton'>
                      Cancelar
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}
