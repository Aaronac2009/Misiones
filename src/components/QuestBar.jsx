import QuestSelect from "./QuestSelect"

function QuestBar({misiones, onCargarMision, filtro}){
    return(
        <div className="quest-bar">
            {filtro === "todo" ?
                misiones.map(mision => <QuestSelect mision={mision} onCargarMision={onCargarMision}></QuestSelect>):
                misiones.filter(mision => mision.estado === filtro).map(mision => <QuestSelect mision={mision} onCargarMision={onCargarMision}></QuestSelect>)}
        </div>
    )
}

export default QuestBar