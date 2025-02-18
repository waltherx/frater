import { Eye, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SuspenseContent from "../../containers/SuspenseContent";
import { getAllEventos } from "../../services/evento-service";
import { EventoType } from "../../types/evento-type";
import { QUERY_KEY } from "../../utils/constant";
import { formattedDate } from "../../utils/date-format";
import TitleCard from "../common/components/Cards/TitleCard";
import Client from "./components/ClientView";
import CreateReservaModal from "./components/ModalReserva";
import TipoEvento from "./components/TipoEvento";

interface PropsSideButton {
  onClickBtn: () => void;
}

const TopSideButtons = ({ onClickBtn }: PropsSideButton) => {
  return (
    <>
      <div className="inline-block float-right">

        <button
          className="btn px-6 btn-sm normal-case btn-primary"
          onClick={() => {
            onClickBtn();
          }}
        >
          Agregar
        </button>
      </div>
    </>
  );
};

function Evento() {
  const queryClient = useQueryClient();
  const [isCreateReservaModalShown, setIsCreateReservaModalShown] = useState(false);

  const { isLoading, isError, data, error } = useQuery<EventoType[], Error>({
    queryKey: [QUERY_KEY.EVENTOS],
    queryFn: () => getAllEventos(),
    onSuccess() {
      console.log("ok..");
    },
    onError(error: Error) {
      const resMessage = error.message || error.toString();
      toast(resMessage, {
        type: "error",
        position: "bottom-right",
      });
    },
  });

  useEffect(() => {
    if (isCreateReservaModalShown === false) {
      queryClient.invalidateQueries(QUERY_KEY.EVENTOS);
    }
  }, [isCreateReservaModalShown])


  if (isLoading) {
    return <SuspenseContent />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <TitleCard
        title="Eventos"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons onClickBtn={
          () => setIsCreateReservaModalShown(true)
        } />}
      >

        {isCreateReservaModalShown && (
          <CreateReservaModal
            onClose={() => setIsCreateReservaModalShown(false)}
          />
        )}

        <div className="overflow-x-auto w-full">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200">
                <th className="w-2/12">Fecha</th>
                <th className="w-2/12">Findeseman</th>
                <th className="w-2/12">Fraterno</th>
                <th className="w-3/4">Descripcion</th>
                <th className="w-1/12">Estado</th>
                <th className="w-1/12">Tipo evento</th>
                <th className="w-1/12"></th>

              </tr>
            </thead>
            <tbody>
              {data?.map((evento, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="font-bold">
                          {formattedDate(evento.fecha)}
                        </div>
                      </div>
                    </td>
                    {/*<td>{formattedTime(evento.hora_inicio)}-{formattedTime(evento.hora_fin)}</td>*/}
                    <td>{evento.es_entresemana ? "si" : "no"}</td>
                    <td><Client id={evento.user ?? ""} /> </td>
                    <td >
                      <div className="w-3/4">
                        <span className="whitespace-break-spaces">
                          {evento.descripcion? 
                            evento.descripcion.length > 30 ? evento.descripcion.substring(0, 30) : evento.descripcion
                          :<div></div>}
                        </span>
                      </div>
                    </td>
                    <td>{evento.estado_reserva}</td>
                    <td>
                      <TipoEvento Id={evento.tipo_evento} />
                    </td>
                    <td>
                      <Link
                        to={`/moto/${evento.id}`}
                        className="btn btn-ghost btn-xs"
                        onClick={() => { }}
                      >
                        <Eye className="w-5" />
                      </Link>

                      <Link
                        to="/app/"
                        className="btn btn-ghost btn-xs"
                        onClick={() => { }}
                      >
                        <Trash className="w-5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}
export default Evento;
