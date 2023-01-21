import { TicketAdd } from '../../components/SVG/TicketAdd';
import { TicketSearch } from '../../components/SVG/TicketSearch';
import { CustomTextField } from '../../components/CustomTextField/CustomTextField'
import './style.scss';
import { useHistory } from 'react-router-dom';

export function HomePage() {
  const history = useHistory()

  const goNewTicket = () => {
    history.push('/ticket')
  }

  return (
    <div className="Home">
      <div className='Container'>
        <div className='CardHeader'>
          <h2>Ticket Manager 2.0</h2>
        </div>
        <div className='CardBody'>
          <div className='LeftCard'>
            <div className='image'>
                <TicketAdd/>
            </div>
            <h3>
              Abrir un Ticket nuevo
            </h3>
            <p>
              Por favor, facilita el mayor numero de detalles
              posibles. Si deseas actualizar una peticion ya ralizada
              utiliza el formulario a la derecha.
            </p>
            <button onClick={goNewTicket} className='themedButton'>Abrir Ticket Nuevo</button>
          </div>
          <div className='RightCard'>
            <div className='image'>
                <TicketSearch/>
            </div>
            <h3>
              Comprobar estado de los Tickets
            </h3>
            <p>
              Proporcionamos los archivos y el historial de todas 
              tus solicitudes de soporte completo con respuestas.
            </p>
            <form name="ticket-form" action="">
              <CustomTextField 
                label={"Email"}
                slug={"email"}
                type={"email"}
                autoComplete={"off"}
              />
              <CustomTextField 
                label={"Ticket ID"}
                slug={"ticketId"}
              />
            </form>
            <button className='themedButton'>Ver Estado</button>
          </div>
        </div>
      </div>
    </div>
  );
}
